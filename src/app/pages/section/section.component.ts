import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import Mustache from 'mustache';
import { combineLatest, Observable, of, map } from 'rxjs';
import { DimensionService } from '@shared/service/dimension.service';
import { Section } from '@shared/state/section.actions';
import {
  LayoutState,
  LayoutNode,
  NodeType,
  NodeDataType,
} from '@shared/state/layout.state';
import { ResumeState } from '@shared/state/resume.state';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  // Layout node object for current section
  @Input() layoutNode!: LayoutNode;

  // Resume Id for retieving resume data
  @Input() resumeId!: string;

  // Page Id for associating section to page
  @Input() pageId!: string;

  // coordinate for current section
  @Input() index!: number[];

  // coordinate for parent section
  @Input() parentIndex!: number[];

  // List of child layout nodes for current section
  childLayoutNodes$!: Observable<LayoutNode[]>;

  // List of ids child resume content
  childResumeIds$!: Observable<string[]>;

  // HTML content for section which renders content
  htmlContent$!: Observable<SafeHtml>;

  public constructor(
    private dimensionService: DimensionService,
    private domSanitizer: DomSanitizer,
    private store: Store,
  ) {}

  ngOnInit() {
    this.store.dispatch(
      new Section.Add(
        this.index.toString(),
        this.parentIndex.toString(),
        this.layoutNode.id,
        this.pageId,
      ),
    );

    switch (this.layoutNode.type) {
      case NodeType.CONTENT:
        this.handleRenderContentType();
        break;
      case NodeType.CONTAINER:
        this.handleRenderContainerType();
        break;
      default:
        throw Error(`Unknown layout node type: ${this.layoutNode.type}`);
    }
  }

  private handleRenderContentType(): void {
    switch (this.layoutNode.dataType) {
      case NodeDataType.DYNAMIC:
        this.htmlContent$ = this.renderHTMLWithSelectors();
        break;
      case NodeDataType.STATIC:
        this.htmlContent$ = this.renderHTMLWithoutSelectors();
        break;
      default:
        throw Error(`Unknown layout data type: ${this.layoutNode.dataType}`);
    }
  }

  private handleRenderContainerType(): void {
    switch (this.layoutNode.dataType) {
      case NodeDataType.DYNAMIC:
        this.childResumeIds$ = this.getChildResumeIds();
        this.childLayoutNodes$ = this.getChildLayoutNodes();
        break;
      case NodeDataType.STATIC:
        this.childLayoutNodes$ = this.getChildLayoutNodes();
        break;
      default:
        throw Error(`Unknown layout data type: ${this.layoutNode.dataType}`);
    }
  }

  private renderHTMLWithSelectors(): Observable<SafeHtml> {
    const observables = this.layoutNode.selectors.map((selector) =>
      this.store
        .select(ResumeState.selectorValue(selector.type, this.resumeId))
        .pipe(map((value) => [selector.key, value])),
    );
    return combineLatest(observables).pipe(
      map((values) => {
        const template = Mustache.render(
          this.layoutNode.template,
          Object.fromEntries(values),
        );
        return this.domSanitizer.bypassSecurityTrustHtml(template);
      }),
    );
  }

  private renderHTMLWithoutSelectors(): Observable<SafeHtml> {
    const template = Mustache.render(this.layoutNode.template, {});
    const safeHtml = this.domSanitizer.bypassSecurityTrustHtml(template);
    return of(safeHtml);
  }

  private getChildResumeIds(): Observable<string[]> {
    return this.store.select(
      ResumeState.selectorValue(
        this.layoutNode.selectors[0].type,
        this.resumeId,
      ),
    );
  }

  private getChildLayoutNodes(): Observable<LayoutNode[]> {
    return this.store.select(LayoutState.childNodes(this.layoutNode.id));
  }

  @HostBinding('attr.index')
  get attrIndex(): string {
    return this.index.toString();
  }

  @HostBinding('attr.parent-index')
  get parentId(): string {
    return this.parentIndex.toString();
  }

  @HostBinding('class')
  get hostClass(): string {
    return `section  ${this.layoutNode.classes.root}`;
  }

  getContentClass(): string {
    return `section__content ${this.layoutNode.classes.content}`;
  }

  createIndex(...args: number[]): number[] {
    return [...this.index, ...args];
  }

  public handleTrackBy(index: number): number {
    return index;
  }

  public onResize(event: ResizeObserverEntry): void {
    const dimension = this.dimensionService.createDimension(event.target);
    this.store.dispatch(new Section.Update(this.index.toString(), dimension));
  }
}
