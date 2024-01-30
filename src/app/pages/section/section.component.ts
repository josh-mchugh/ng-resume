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
import { combineLatest, map, mergeMap, Observable, of, tap } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { DimensionService } from '@shared/service/dimension.service';
import { DisplayService } from '@shared/service/display.service';
import { Display } from '@shared/state/display.actions';
import {
  LayoutState,
  LayoutNode,
  NodeDataType,
} from '@shared/state/layout.state';
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

  // layout id
  @Input() layoutId!: string;

  // parent section id
  @Input() parentId!: string;

  // Resume Id for retieving resume data
  @Input() resumeId!: string;

  // layout node
  layoutNode$!: Observable<LayoutNode>;

  // child sections for sections type container
  childSections$!: Observable<Section[]>;

  // List of ids child resume content
  childResumeIds$!: Observable<string[]>;

  // HTML content for section which renders content
  htmlContent$!: Observable<SafeHtml>;

  // section class from layout data
  rootClass = '';

  // section content class from layout data
  contentClass = '';

  public constructor(
    private dimensionService: DimensionService,
    private displayService: DisplayService,
    private domSanitizer: DomSanitizer,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.layoutNode$ = this.store
      .select(LayoutState.layoutNode(this.layoutId))
      .pipe(
        tap((layoutNode) => {
          this.rootClass = layoutNode.classes.root;
          this.contentClass = layoutNode.classes.content;
        }),
        shareReplay(1),
      );
    this.htmlContent$ = this.layoutNode$.pipe(
      mergeMap((layoutNode) => this.handleRenderContentType(layoutNode)),
    );
    this.childResumeIds$ = this.layoutNode$.pipe(
      mergeMap((layoutNode) => this.getChildResumeIds(layoutNode)),
    );
    this.childSections$ = this.layoutNode$.pipe(
      mergeMap((layoutNode) => this.getChildLayoutNodes(layoutNode)),
    );
  }

  private handleRenderContentType(
    layoutNode: LayoutNode,
  ): Observable<SafeHtml> {
    switch (layoutNode.dataType) {
      case NodeDataType.DYNAMIC:
        return this.renderHTMLWithSelectors(layoutNode);
      case NodeDataType.STATIC:
        return this.renderHTMLWithoutSelectors(layoutNode);
      default:
        throw Error(`Unknown layout data type: ${layoutNode.dataType}`);
    }
  }

  private renderHTMLWithSelectors(
    layoutNode: LayoutNode,
  ): Observable<SafeHtml> {
    const observables = layoutNode.selectors.map((selector) =>
      this.store
        .select(ResumeState.selectorValue(selector.type, this.resumeId))
        .pipe(map((value) => [selector.key, value])),
    );
    return combineLatest(observables).pipe(
      map((values) => {
        const template = Mustache.render(
          layoutNode.template,
          Object.fromEntries(values),
        );
        return this.domSanitizer.bypassSecurityTrustHtml(template);
      }),
    );
  }

  private renderHTMLWithoutSelectors(
    layoutNode: LayoutNode,
  ): Observable<SafeHtml> {
    const template = Mustache.render(layoutNode.template, {});
    const safeHtml = this.domSanitizer.bypassSecurityTrustHtml(template);
    return of(safeHtml);
  }

  private getChildResumeIds(layoutNode: LayoutNode): Observable<string[]> {
    return this.store.select(
      ResumeState.selectorValue(layoutNode.selectors[0].type, this.resumeId),
    );
  }

  private getChildLayoutNodes(layoutNode: LayoutNode): Observable<Section[]> {
    // get child sections for this section
    return this.store.select(DisplayState.childSections(this.id)).pipe(
      tap((sections) => {
        if (!sections.length) {
          this.store
            .select(LayoutState.childNodes(layoutNode.id))
            .pipe(
              map((nodes) =>
                this.displayService.createSections(nodes, this.id),
              ),
            )
            .subscribe((sections) =>
              this.store.dispatch(new Display.SectionAddAll(sections)),
            );
        }
      }),
    );
  }

  @HostBinding('class')
  get hostClass(): string {
    return `section  ${this.rootClass}`;
  }

  getContentClass(): string {
    return `section__content ${this.contentClass}`;
  }

  public handleTrackBy(index: number): number {
    return index;
  }

  public onResize(event: ResizeObserverEntry): void {
    const dimension = this.dimensionService.createDimension(event.target);
    this.store.dispatch(new Display.SectionUpdate(this.id, dimension));
  }
}
