import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { DimensionService } from '@shared/service/dimension.service';
import { Layout } from '@shared/state/layout.actions';
import { SegmentModel } from '@shared/state/layout.state';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  @Input() rowIndex!: number;
  @Input() columnIndex!: number;
  @Input() sectionIndex!: number;
  @Input() segments!: Array<SegmentModel>;

  summary$: Observable<string>;

  constructor(
    private store: Store,
    private dimensionService: DimensionService,
  ) {
    this.summary$ = this.store.select((state) => state.resume.summary);
  }

  public handleTrackBy(index: number): number {
    return index;
  }

  public onResize(index: number, event: ResizeObserverEntry): void {
    const dimension = this.dimensionService.createDimension(event.target);
    const action = new Layout.DimensionSegmentUpdate(
      this.rowIndex,
      this.columnIndex,
      this.sectionIndex,
      index,
      dimension,
    );
    this.store.dispatch(action);
  }
}
