import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import Mustache from 'mustache';
import { combineLatest, Observable, of, map } from 'rxjs';
import { DimensionService } from '@shared/service/dimension.service';
import { DisplayStructure } from '@shared/state/display-structure.actions';
import { SectionModel } from '@shared/state/layout.state';
import { ResumeState } from '@shared/state/resume.state';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  // Components current index in list for coordinates
  @Input() coordIndex!: number[];

  // Parent's coordinates in section tree
  @Input() parentCoord!: number[];

  // section data model for component
  @Input() section!: SectionModel;

  // child length for SectionType.List
  contentListLength$!: Observable<number[]>;

  // htmlContent for SectionType.Content
  htmlContent$!: Observable<SafeHtml>;

  // Components coordinates in section tree
  coord: number[] = [];

  public constructor(
    private dimensionService: DimensionService,
    private domSanitizer: DomSanitizer,
    private store: Store,
  ) {}

  ngOnInit() {
    // Set section coordinates
    if (this.parentCoord && this.parentCoord.length) {
      this.coord = [...this.parentCoord, ...this.coordIndex];
    } else {
      this.coord = [...this.coordIndex];
    }
    this.store.dispatch(
      new DisplayStructure.AddCoordinate(
        this.coord.toString(),
        this.parentCoord.toString(),
      ),
    );

    // Build observables for template rendering
    if (this.section.template) {
      this.htmlContent$ = this.section.selectors.length
        ? this.renderHTMLWithSelectors()
        : this.renderHTMLWithoutSelectors();
    } else if (this.section.children.length && this.section.selectors.length) {
      this.contentListLength$ = this.buildChildListLengthObservable();
    }
  }

  private renderHTMLWithSelectors(): Observable<SafeHtml> {
    const observables = this.section.selectors.map((selector) =>
      this.store
        .select(ResumeState.selectorValue(selector.type, this.coord))
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

  private buildChildListLengthObservable(): Observable<number[]> {
    return this.store.select(
      ResumeState.selectorValue(this.section.selectors[0].type, this.coord),
    );
  }

  @HostBinding('class')
  get hostClass(): string {
    return `section  ${this.section.classes.root}`;
  }

  getContentClass(): string {
    return `section__content ${this.section.classes.content}`;
  }

  public handleTrackBy(index: number): number {
    return index;
  }

  public onResize(event: ResizeObserverEntry): void {
    const dimension = this.dimensionService.createDimension(event.target);
    this.store.dispatch(
      new DisplayStructure.UpdateCoordinate(this.coord.toString(), dimension),
    );
  }
}
