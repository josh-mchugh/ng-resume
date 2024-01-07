import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import Mustache from 'mustache';
import { combineLatest, Observable, of, map } from 'rxjs';
import { DimensionService } from '@shared/service/dimension.service';
import { DisplayStructure } from '@shared/state/display-structure.actions';
import {
  LayoutState,
  LayoutNode,
  NodeType,
} from '@shared/state/layout.state';
import { ResumeState } from '@shared/state/resume.state';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  // section data model for component
  @Input() layoutNode!: LayoutNode;

  // TODO comment description
  childLayoutNodes$!: Observable<LayoutNode[]>;

  // TODO comment description
  childContentLength$!: Observable<number[]>;

  // htmlContent for SectionType.Content
  htmlContent$!: Observable<SafeHtml>;

  // TODO index id
  @Input() index!: number[];

  // TODO parent index id
  @Input() parentIndex!: number[];

  // TODO comment description
  @Input() contentIndex!: number;

  //TODO comment description
  @Input() position!: number;

  public constructor(
    private dimensionService: DimensionService,
    private domSanitizer: DomSanitizer,
    private store: Store,
  ) {}

  ngOnInit() {
    this.store.dispatch(
      new DisplayStructure.AddCoordinate(
        this.index.toString(),
        this.parentIndex.toString(),
      ),
    );

    if (NodeType.CONTENT === this.layoutNode.type) {
      this.htmlContent$ = this.layoutNode.selectors.length
        ? this.renderHTMLWithSelectors()
        : this.renderHTMLWithoutSelectors();
    }
    if (
      [NodeType.CONTAINER, NodeType.STRUCTURAL].includes(
        this.layoutNode.type,
      )
    ) {
      this.childLayoutNodes$ = this.getChildLayoutNodes();
    }
    if (NodeType.DYNAMIC_CONTAINER === this.layoutNode.type) {
      this.childContentLength$ = this.getChildContentLength();
      this.childLayoutNodes$ = this.getChildLayoutNodes();
    }
  }

  private renderHTMLWithSelectors(): Observable<SafeHtml> {
    const observables = this.layoutNode.selectors.map((selector) =>
      this.store
        .select(
          ResumeState.selectorValue(selector.type, [
            this.contentIndex,
            this.position,
          ]),
        )
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

  private getChildContentLength(): Observable<number[]> {
    return this.store.select(
      ResumeState.selectorValue(this.layoutNode.selectors[0].type, [
        this.contentIndex,
      ]),
    );
  }

  private getChildLayoutNodes(): Observable<LayoutNode[]> {
    return this.store.select(LayoutState.childNodes(this.layoutNode.id));
  }

  @HostBinding('attr.id')
  get id(): string {
    return this.layoutNode.id;
  }

  @HostBinding('attr.index')
  get attrIndex(): string {
    return this.index.toString();
  }

  @HostBinding('attr.parentId')
  get parentId(): string {
    return this.layoutNode.parentId;
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
    this.store.dispatch(
      new DisplayStructure.UpdateCoordinate(this.index.toString(), dimension),
    );
  }
}
