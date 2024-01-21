import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import Mustache from 'mustache';
import { combineLatest, Observable, of, map, tap } from 'rxjs';
import { DimensionService } from '@shared/service/dimension.service';
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
})
export class SectionComponent implements OnInit {
  // section id
  @Input() id!: string;

  // parent section id
  @Input() parentId!: string;

  // Resume Id for retieving resume data
  @Input() resumeId!: string;

  layoutNode$!: Observable<LayoutNode>;

  childSections$!: Observable<Section[]>;

  // List of child layout nodes for current section
  childLayoutNodes$!: Observable<LayoutNode[]>;

  // List of ids child resume content
  childResumeIds$!: Observable<string[]>;

  // HTML content for section which renders content
  htmlContent$!: Observable<SafeHtml>;

  rootClass = '';

  contentClass = '';

  public constructor(
    private dimensionService: DimensionService,
    private domSanitizer: DomSanitizer,
    private store: Store,
  ) {}

  ngOnInit() {
    // Set the LayoutNode observable
    this.store.select(DisplayState.section(this.id)).subscribe((section) => {
      this.layoutNode$ = this.store.select(
        LayoutState.layoutNode(section.layoutNodeId),
      );
    });
    this.layoutNode$.subscribe((layoutNode) => {
      this.rootClass = layoutNode.classes.root;
      this.contentClass = layoutNode.classes.content;
      this.handleLayoutNode(layoutNode);
    });
  }

  private handleLayoutNode(layoutNode: LayoutNode): void {
    switch (layoutNode.type) {
      case NodeType.CONTENT:
        this.handleRenderContentType(layoutNode);
        break;
      case NodeType.CONTAINER:
        this.handleRenderContainerType(layoutNode);
        break;
      default:
        throw Error(`Unknown layout node type: ${layoutNode.type}`);
    }
  }

  private handleRenderContentType(layoutNode: LayoutNode): void {
    switch (layoutNode.dataType) {
      case NodeDataType.DYNAMIC:
        this.htmlContent$ = this.renderHTMLWithSelectors(layoutNode);
        break;
      case NodeDataType.STATIC:
        this.htmlContent$ = this.renderHTMLWithoutSelectors(layoutNode);
        break;
      default:
        throw Error(`Unknown layout data type: ${layoutNode.dataType}`);
    }
  }

  private handleRenderContainerType(layoutNode: LayoutNode): void {
    switch (layoutNode.dataType) {
      case NodeDataType.DYNAMIC:
        this.childResumeIds$ = this.getChildResumeIds(layoutNode);
        this.getChildLayoutNodes(layoutNode);
        break;
      case NodeDataType.STATIC:
        this.getChildLayoutNodes(layoutNode);
        break;
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

  private getChildLayoutNodes(layoutNode: LayoutNode): void {
    // get child sections for this section
    this.childSections$ = this.store
      .select(DisplayState.childSections(this.id))
      .pipe(
        tap((sections) => {
          if (!sections.length) {
            this.store
              .select(LayoutState.childNodes(layoutNode.id))
              .pipe(
                map((nodes) =>
                  nodes.map((node) => {
                    return {
                      id: Math.random().toString(),
                      parentId: this.id,
                      layoutNodeId: node.id,
                      pageId: '0',
                    };
                  }),
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
