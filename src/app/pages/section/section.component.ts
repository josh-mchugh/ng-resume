import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DimensionService } from '@shared/service/dimension.service';
import { Store } from '@ngxs/store';
import { SectionModel, SectionType } from '@shared/state/layout.state';
import { ResumeState, SelectorType } from '@shared/state/resume.state';
import { combineLatest, Observable, of, map } from 'rxjs';
import Mustache from 'mustache';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  @Input() section!: SectionModel;
  @Input() rootClass!: string;
  @Input() contentClass!: string;

  // htmlContent for SectionType.Content
  htmlContent$!: Observable<SafeHtml>;

  // child length for SectionType.List
  contentListLength$!: Observable<number[]>;

  // Components current index in list for coordinates
  @Input() coordIndex!: number;

  // Parent's coordinates in section tree
  @Input() parentCoord!: number[];

  // Components coordinates in section tree
  coord: number[] = [];

  public constructor(
    private store: Store,
    private dimensionService: DimensionService,
    private domSanitizer: DomSanitizer,
  ) {
    if (this.section && this.section.selectors) {
      console.log('section constructor');
    }
  }

  ngOnInit() {
    //Set componets coordinates
    if (this.parentCoord && this.parentCoord.length) {
      this.coord = [...this.parentCoord, this.coordIndex];
    } else {
      this.coord = [this.coordIndex];
    }

    if (this.section && this.section.type === SectionType.CONTENT) {
      if (
        this.section.selectors &&
        this.section.selectors.length &&
        !this.section.selectors.find(
          (selector) => selector.type === SelectorType.NONE,
        )
      ) {
        const observables = this.section.selectors.map((selector) =>
          this.store
            .select(ResumeState.selectorValue(selector.type, this.coord))
            .pipe(map((value) => [selector.key, value])),
        );
        this.htmlContent$ = combineLatest(observables).pipe(
          map((values) => {
            const template = Mustache.render(
              this.section.template as string,
              Object.fromEntries(values),
            );
            return this.domSanitizer.bypassSecurityTrustHtml(template);
          }),
        );
      } else if (this.section?.template) {
        const template = Mustache.render(this.section.template as string, {});
        const safeHtml = this.domSanitizer.bypassSecurityTrustHtml(template);
        this.htmlContent$ = of(safeHtml);
      }
    } else if (this.section && this.section.type === SectionType.LIST) {
      if (this.section.selectors) {
        this.contentListLength$ = this.store.select(
          ResumeState.selectorValue(this.section.selectors[0].type, this.coord),
        );
      }
    }
  }

  @HostBinding('class')
  get hostClass(): string {
    const blockClass = 'section';
    if (this.section) {
      return `${blockClass}  ${this.section.classes.root}`;
    }
    if (this.rootClass) {
      return `${blockClass} ${this.rootClass}`;
    }
    return blockClass;
  }

  getContentClass(): string {
    const blockClass = 'section__content';
    if (this.section) {
      return `${blockClass} ${this.section.classes.content}`;
    }
    if (this.contentClass) {
      return `${blockClass}  ${this.contentClass}`;
    }
    return blockClass;
  }

  getChildren(): SectionModel[] {
    return this.section ? this.section.children : [];
  }

  public handleTrackBy(index: number): number {
    return index;
  }

  // Commenting our function body and disabling rule on unused var in parameter.
  // Will come back later to this function and build it out.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onResize(event: ResizeObserverEntry): void {
    const dimension = this.dimensionService.createDimension(event.target);
    console.log(
      'coord: ' +
        JSON.stringify(this.coord) +
        ', dimension: ' +
        JSON.stringify(dimension),
    );
  }
}
