import { Component, HostBinding, Input } from '@angular/core';
import { DimensionService } from '@shared/service/dimension.service';
import { SectionModel } from '@shared/state/layout.state';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent {
  @Input() section!: SectionModel;

  public constructor(private dimensionService: DimensionService) {}

  @HostBinding('class')
  get hostClass(): string {
    return this.section ? 'section ' + this.section.classes.root : 'section';
  }

  getContentClass(): string {
    return this.section
      ? 'section__content ' + this.section.classes.content
      : 'section__content';
  }

  getChildren(): SectionModel[] {
    return this.section ? this.section.children : [];
  }

  public handleTrackBy(index: number): number {
    return index;
  }

  public onResize(event: ResizeObserverEntry): void {
    const dimension = this.dimensionService.createDimension(event.target);
    console.log('dimension: ' + JSON.stringify(dimension));
  }
}
