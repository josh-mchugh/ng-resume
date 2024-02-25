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
  LayoutNode
} from '@shared/state/layout.state';
import {
  NodeType,
  NodeDataType,
} from '@shared/state/layout.interface';
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
    this.section$ = this.store
      .select(DisplayState.section(this.id))
      .pipe(shareReplay(1));
    // Observable for section LayoutNode
    this.layoutNode$ = this.section$.pipe(
      mergeMap((section) =>
        this.store.select(LayoutState.layoutNode(section.layoutNodeId)).pipe(
          // Side effect for classes for @HostBinding cannot use Observables
          tap((layoutNode) => (this.rootClass = layoutNode.classes.root)),
          shareReplay(1),
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
    // Observable for child resume ids for dynamic containers
    this.childResumeIds$ = this.layoutNode$.pipe(
      filter(
        (layoutNode) =>
          NodeType.CONTAINER === layoutNode.type &&
          NodeDataType.DYNAMIC === layoutNode.dataType,
      ),
      combineLatestWith(this.section$),
      mergeMap(([layoutNode, section]) =>
        this.getChildResumeIds(layoutNode, section),
      ),
    );
    // Subscribe to create static child sections on initial load
    this.layoutNode$
      .pipe(
        filter(
          (layoutNode) =>
            NodeType.CONTAINER === layoutNode.type &&
            NodeDataType.STATIC === layoutNode.dataType,
        ),
        combineLatestWith(this.section$),
        mergeMap(([layoutNode, section]) =>
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
    // Subscribe to create dynamic child sections on initial load
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

  private getChildResumeIds(
    layoutNode: LayoutNode,
    section: Section,
  ): Observable<string[]> {
    return this.store.select(
      ResumeState.selectorValue(layoutNode.selectors[0].type, section.resumeId),
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
