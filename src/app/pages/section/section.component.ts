import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import Mustache from 'mustache';
import {
  combineLatest,
  combineLatestWith,
  filter,
  iif,
  map,
  mergeMap,
  Observable,
  of,
  tap,
} from 'rxjs';
import { DimensionService } from '@display/dimension.service';
import { Display } from '@display/display.actions';
import { DisplayState, Section } from '@display/display.state';
import { LayoutState, LayoutNode } from '@layout/layout.state';
import { NodeType, NodeDataType } from '@layout/layout.interface';
import { ResumeState } from '@resume/resume.state';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionComponent implements OnInit {
  // section id
  @Input() section!: Section;

  section$!: Observable<Section>;

  // layout node
  layoutNode$!: Observable<LayoutNode>;

  // child sections for sections type container
  childSections$!: Observable<Section[]>;

  // HTML content for section which renders content
  htmlContent$!: Observable<SafeHtml>;

  // section class from layout data
  rootClass = '';

  public constructor(
    private dimensionService: DimensionService,
    private domSanitizer: DomSanitizer,
    private store: Store,
  ) {}

  ngOnInit(): void {
    // Observable for layout HTML content
    this.layoutNode$ = this.store
      .select(LayoutState.layoutNode(this.section.layoutNodeId))
      .pipe(
        // Side effect for classes for @HostBinding cannot use Observables
        tap((layoutNode) => (this.rootClass = layoutNode.classes.root)),
      );
    this.htmlContent$ = this.layoutNode$.pipe(
      filter((layoutNode) => NodeType.CONTENT === layoutNode.type),
      mergeMap((layoutNode) =>
        iif(
          () => NodeDataType.DYNAMIC === layoutNode.dataType,
          this.renderDynamicHTML(layoutNode),
          this.renderStaticHTML(layoutNode),
        ),
      ),
    );
    // Obervable for child sections for containers
    this.childSections$ = this.layoutNode$.pipe(
      filter((layoutNode) => NodeType.CONTAINER === layoutNode.type),
      mergeMap(() => this.getChildSections()),
    );
  }

  private renderDynamicHTML(layoutNode: LayoutNode): Observable<SafeHtml> {
    const observables$ = layoutNode.selectors.map((selector) =>
      this.store
        .select(ResumeState.selectorValue(selector.type, this.section.resumeGroupId))
        .pipe(map((value) => [selector.key, value])),
    );
    return combineLatest(observables$).pipe(
      map((values) => {
        const template = Mustache.render(
          layoutNode.template,
          Object.fromEntries(values),
        );
        return this.domSanitizer.bypassSecurityTrustHtml(template);
      }),
    );
  }

  private renderStaticHTML(layoutNode: LayoutNode): Observable<SafeHtml> {
    const template = Mustache.render(layoutNode.template, {});
    const safeHtml = this.domSanitizer.bypassSecurityTrustHtml(template);
    return of(safeHtml);
  }

  private getChildSections(): Observable<Section[]> {
    return this.store.select(DisplayState.childSections(this.section.id));
  }

  @HostBinding('class')
  get hostClass(): string {
    return `section  ${this.rootClass}`;
  }

  getContentClass(): Observable<string> {
    return of('section__content').pipe(
      combineLatestWith(this.layoutNode$),
      map(
        ([baseClass, layoutNode]) =>
          `${baseClass} ${layoutNode.classes.content}`,
      ),
    );
  }

  public handleTrackBy(index: number, section: Section): string {
    return section.id;
  }

  public onResize(event: ResizeObserverEntry): void {
    const dimension = this.dimensionService.createDimension(event.target);
    this.store.dispatch(
      new Display.SectionDimensionUpdate(this.section.id, dimension),
    );
  }
}
