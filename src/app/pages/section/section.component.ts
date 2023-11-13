import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
} from '@angular/core';
import { DimensionService } from '@shared/service/dimension.service';
import { SectionModel } from '@shared/state/layout.state';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements AfterViewInit, OnDestroy {
  @Input() section!: SectionModel;
  private observer: ResizeObserver | null = null;

  public constructor(
    private readonly elementRef: ElementRef,
    private readonly ngZone: NgZone,
    private dimensionService: DimensionService,
  ) {}

  public handleTrackBy(index: number): number {
    return index;
  }

  ngAfterViewInit() {
    if (!this.observer) {
      this.observer = new ResizeObserver((resizes) => {
        for (const resize of resizes) {
          this.ngZone.run(() => {
            this.onResize(resize);
          });
        }
      });
    }
    this.observer.observe(this.elementRef.nativeElement, {
      box: 'border-box',
    });
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.unobserve(this.elementRef.nativeElement);
    }
  }

  public onResize(event: ResizeObserverEntry): void {
    const dimension = this.dimensionService.createDimension(event.target);
    console.log('dimension: ' + JSON.stringify(dimension));
  }
}
