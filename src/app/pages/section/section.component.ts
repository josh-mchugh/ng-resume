import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { DimensionService } from '@shared/service/dimension.service';
import { SectionModel } from '@shared/state/layout.state';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent {
  @Input() section!: SectionModel;

  public constructor(
    private readonly elementRef: ElementRef,
    private dimensionService: DimensionService,
  ) {}

  public handleTrackBy(index: number): number {
    return index;
  }

  public onResize(event: ResizeObserverEntry): void {
    const dimension = this.dimensionService.createDimension(event.target);
    console.log('dimension: ' + JSON.stringify(dimension));
  }
}
