import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { LayoutStateModel } from '@shared/state/layout.state';
import { Layout } from '@shared/state/layout.actions';
import { DimensionService } from '@shared/service/dimension.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent {
  layout$: Observable<LayoutStateModel>;

  constructor(
    private store: Store,
    private dimensionService: DimensionService,
  ) {
    this.layout$ = this.store.select((state) => state.layout);
  }

  public handleRowTrackBy(index: number): number {
    return index;
  }

  public onRowResize(rowIndex: number, event: ResizeObserverEntry): void {
    const dimension = this.dimensionService.createDimension(event.target);
    this.store.dispatch(new Layout.DimensionRowUpdate(rowIndex, dimension));
  }

  public handleColumnTrackBy(index: number): number {
    return index;
  }

  public onColumnResize(
    rowIndex: number,
    columnIndex: number,
    event: ResizeObserverEntry,
  ): void {
    const dimension = this.dimensionService.createDimension(event.target);
    this.store.dispatch(
      new Layout.DimensionColumnUpdate(rowIndex, columnIndex, dimension),
    );
  }

  public handleSectionTrackBy(index: number): number {
    return index;
  }

  public onSectionResize(
    rowIndex: number,
    columnIndex: number,
    sectionIndex: number,
    event: ResizeObserverEntry,
  ): void {
    const dimension = this.dimensionService.createDimension(event.target);
    this.store.dispatch(
      new Layout.DimensionSectionUpdate(
        rowIndex,
        columnIndex,
        sectionIndex,
        dimension,
      ),
    );
  }
}
