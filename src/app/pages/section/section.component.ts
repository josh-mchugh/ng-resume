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
import { DimensionService } from '@shared/service/dimension.service';
import { Display } from '@shared/state/display.actions';
import { LayoutState, LayoutNode } from '@shared/state/layout.state';
import { NodeType, NodeDataType } from '@shared/state/layout.interface';
import { ResumeState } from '@shared/state/resume.state';
import { DisplayState, Section } from '@shared/state/display.state';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionComponent implements OnInit {
  // section id
  @Input() id!: string;

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
    this.section$ = this.store.select(DisplayState.section(this.id));
    // Observable for section LayoutNode
    this.layoutNode$ = this.section$.pipe(
      mergeMap((section) =>
        this.store.select(LayoutState.layoutNode(section.layoutNodeId)).pipe(
          // Side effect for classes for @HostBinding cannot use Observables
          tap((layoutNode) => (this.rootClass = layoutNode.classes.root)),
        ),
      ),
    );
    // Observable for layout HTML content
    this.htmlContent$ = this.layoutNode$.pipe(
      filter((layoutNode) => NodeType.CONTENT === layoutNode.type),
      combineLatestWith(this.section$),
      mergeMap(([layoutNode, section]) =>
        iif(
          () => NodeDataType.DYNAMIC === layoutNode.dataType,
          this.renderDynamicHTML(layoutNode, section),
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

  private renderDynamicHTML(
    layoutNode: LayoutNode,
    section: Section,
  ): Observable<SafeHtml> {
    const observables$ = layoutNode.selectors.map((selector) =>
      this.store
        .select(ResumeState.selectorValue(selector.type, section.resumeId))
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
    return this.store.select(DisplayState.childSections(this.id));
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

  public handleTrackBy(index: number): number {
    return index;
  }

  public onResize(event: ResizeObserverEntry): void {
    const dimension = this.dimensionService.createDimension(event.target);
    this.store.dispatch(new Display.SectionUpdate(this.id, dimension));
  }
}
