import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnDestroy,
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
  shareReplay,
  take,
  tap,
} from 'rxjs';
import { DimensionService } from '@shared/service/dimension.service';
import {
  DisplayService,
  DisplayRequest,
} from '@shared/service/display.service';
import { Display } from '@shared/state/display.actions';
import {
  LayoutState,
  LayoutNode,
  NodeType,
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
export class SectionComponent implements OnInit, OnDestroy {
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

  public constructor(
    private dimensionService: DimensionService,
    private displayService: DisplayService,
    private domSanitizer: DomSanitizer,
    private store: Store,
  ) {}

  ngOnInit(): void {
    // Observable for section LayoutNode
    this.layoutNode$ = this.store
      .select(LayoutState.layoutNode(this.layoutId))
      .pipe(
        // Side effect for classes for @HostBinding cannot use Observables
        tap((layoutNode) => (this.rootClass = layoutNode.classes.root)),
        shareReplay(1),
      );
    // Observable for layout HTML content
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
    // Observable for child resume ids for dynamic containers
    this.childResumeIds$ = this.layoutNode$.pipe(
      filter(
        (layoutNode) =>
          NodeType.CONTAINER === layoutNode.type &&
          NodeDataType.DYNAMIC === layoutNode.dataType,
      ),
      mergeMap((layoutNode) => this.getChildResumeIds(layoutNode)),
    );
    // Subscription to create child sections if they do not match layout nodes children length
    this.layoutNode$
      .pipe(
        filter(
          (layoutNode) =>
            NodeType.CONTAINER === layoutNode.type &&
            NodeDataType.STATIC === layoutNode.dataType,
        ),
        mergeMap((layoutNode) =>
          this.store.select(LayoutState.childNodes(layoutNode.id)),
        ),
        combineLatestWith(
          this.store.select(DisplayState.childSections(this.id)),
        ),
        filter(
          ([layoutNodes, sections]) => sections.length < layoutNodes.length,
        ),
        map(([layoutNodes]) => {
          const request = new DisplayRequest.CreateStaticSections(
            layoutNodes,
            this.id,
          );
          return this.displayService.createStaticSections(request);
        }),
        take(1),
      )
      .subscribe((sections) =>
        this.store.dispatch(new Display.SectionAddAll(sections)),
      );
    // Dynamic sections
    this.layoutNode$
      .pipe(
        filter(
          (layoutNode) =>
            NodeType.CONTAINER === layoutNode.type &&
            NodeDataType.DYNAMIC === layoutNode.dataType,
        ),
        mergeMap((layoutNode) =>
          this.store.select(LayoutState.childNodes(layoutNode.id)),
        ),
        combineLatestWith(
          this.store.select(DisplayState.childSections(this.id)),
          this.childResumeIds$,
        ),
        filter(
          ([layoutNodes, sections, resumeIds]) =>
            sections.length < layoutNodes.length * resumeIds.length,
        ),
        map(([layoutNodes, sections, resumeIds]) => {
          const request = new DisplayRequest.CreateDynamicSections(
            layoutNodes,
            this.id,
            resumeIds,
          );
          return this.displayService.createDynamicSections(request);
        }),
        take(1),
      )
      .subscribe((sections) =>
        this.store.dispatch(new Display.SectionAddAll(sections)),
      );
  }

  ngOnDestroy() {
    this.store.dispatch(new Display.SectionDelete(this.id));
  }

  private renderDynamicHTML(layoutNode: LayoutNode): Observable<SafeHtml> {
    const observables$ = layoutNode.selectors.map((selector) =>
      this.store
        .select(ResumeState.selectorValue(selector.type, this.resumeId))
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

  private getChildResumeIds(layoutNode: LayoutNode): Observable<string[]> {
    return this.store.select(
      ResumeState.selectorValue(layoutNode.selectors[0].type, this.resumeId),
    );
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
