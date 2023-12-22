import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { DimensionService } from '@shared/service/dimension.service';
import { Store } from '@ngxs/store';
import { SectionModel } from '@shared/state/layout.state';
import { ResumeState } from '@shared/state/resume.state';
import { Observable, of, map } from 'rxjs';
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
  selector$!: Observable<string>;
  htmlContent$!: Observable<string>;

  public constructor(
    private store: Store,
    private dimensionService: DimensionService,
  ) {
    if (this.section && this.section.selector) {
      console.log('section constructor');
    }
  }

  ngOnInit() {
    console.log('section on init');
    if (this.section && (this.section.selector || this.section.template)) {
      if (this.section.selector) {
        this.htmlContent$ = this.store
          .select(ResumeState.selectorValue(this.section.selector))
          .pipe(
            map((value) => {
              const entries = [[this.section.selector, value]];
              console.log(entries);
              return Mustache.render(
                this.section.template as string,
                Object.fromEntries(entries),
              );
            }),
          );
      } else if (this.section.template) {
        console.log('rendering template without selector');
        const template = Mustache.render(this.section.template as string, {});
        console.log(template);
        this.htmlContent$ = of(template);
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
    //const dimension = this.dimensionService.createDimension(event.target);
    //console.log('dimension: ' + JSON.stringify(dimension));
  }
}
