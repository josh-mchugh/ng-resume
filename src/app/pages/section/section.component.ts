import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import Mustache from 'mustache';
import { combineLatest, Observable, of, map } from 'rxjs';
import { DimensionService } from '@shared/service/dimension.service';
import { DisplayStructure } from '@shared/state/display-structure.actions';
import { LayoutState, SectionModel } from '@shared/state/layout.state';
import { ResumeState } from '@shared/state/resume.state';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  // section data model for component
  @Input() section!: SectionModel;

  // TODO comment description
  childSections$!: Observable<SectionModel[]>;

  // TODO comment description
  contentLength$!: Observable<number[]>;

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

    // Build observables for template rendering
    if (this.section.template) {
      this.htmlContent$ = this.section.selectors.length
        ? this.renderHTMLWithSelectors()
        : this.renderHTMLWithoutSelectors();
    }
    if (!this.section.template && !this.section.selectors.length) {
      this.childSections$ = this.buildChildSections();
    }
    if (!this.section.template && this.section.selectors.length) {
      this.contentLength$ = this.buildContentLength();
      this.childSections$ = this.buildChildSections();
    }
  }

  private renderHTMLWithSelectors(): Observable<SafeHtml> {
    const observables = this.section.selectors.map((selector) =>
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
          this.section.template,
          Object.fromEntries(values),
        );
        return this.domSanitizer.bypassSecurityTrustHtml(template);
      }),
    );
  }

  private renderHTMLWithoutSelectors(): Observable<SafeHtml> {
    const template = Mustache.render(this.section.template, {});
    const safeHtml = this.domSanitizer.bypassSecurityTrustHtml(template);
    return of(safeHtml);
  }

  private buildContentLength(): Observable<number[]> {
    return this.store.select(
      ResumeState.selectorValue(this.section.selectors[0].type, [
        this.contentIndex,
      ]),
    );
  }

  private buildChildSections(): Observable<SectionModel[]> {
    return this.store.select(LayoutState.childSections(this.section.id));
  }

  @HostBinding('attr.id')
  get id(): string {
    return this.section.id;
  }

  @HostBinding('attr.index')
  get attrIndex(): string {
    return this.index.toString();
  }

  @HostBinding('attr.parentId')
  get parentId(): string {
    return this.section.parentId;
  }

  @HostBinding('class')
  get hostClass(): string {
    return `section  ${this.section.classes.root}`;
  }

  getContentClass(): string {
    return `section__content ${this.section.classes.content}`;
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
