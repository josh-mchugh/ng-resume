import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import { combineLatest, Observable, of, map } from 'rxjs';
import { DimensionService } from '@shared/service/dimension.service';
import { SectionModel } from '@shared/state/layout.state';
import { ResumeState } from '@shared/state/resume.state';

import Mustache from 'mustache';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  // Components current index in list for coordinates
  @Input() coordIndex!: number;

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
    //Set componets coordinates
    if (this.parentCoord && this.parentCoord.length) {
      this.coord = [...this.parentCoord, this.coordIndex];
    } else {
      this.coord = [this.coordIndex];
    }

    if (this.section.template) {
      if (this.section.selectors.length) {
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
      } else {
        const template = Mustache.render(this.section.template as string, {});
        const safeHtml = this.domSanitizer.bypassSecurityTrustHtml(template);
        this.htmlContent$ = of(safeHtml);
      }
    } else if (this.section.children.length) {
      if (this.section.selectors.length) {
        this.contentListLength$ = this.store.select(
          ResumeState.selectorValue(this.section.selectors[0].type, this.coord),
        );
      }
    }
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
    console.log(
      'coord: ' +
        JSON.stringify(this.coord) +
        ', dimension: ' +
        JSON.stringify(dimension),
    );
  }
}
