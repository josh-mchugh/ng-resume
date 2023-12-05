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
    return 'section ' + this.section.classes.root;
  }

  public handleTrackBy(index: number): number {
    return index;
  }

  public onResize(event: ResizeObserverEntry): void {
    const dimension = this.dimensionService.createDimension(event.target);
    console.log('dimension: ' + JSON.stringify(dimension));
  }
}
