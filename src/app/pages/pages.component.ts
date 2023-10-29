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
    console.log(`Row[${rowIndex}] resized: ${new Date()}`);
    const dimension = this.dimensionService.createDimension(event.target);
    this.store.dispatch(new Layout.DimensionRowUpdate(rowIndex, dimension));
  }

  public handleColumnTrackBy(index: number): number {
    return index;
  }

  public onColumnResize(columnIndex: number, event: ResizeObserverEntry): void {
    console.log(`Column[${columnIndex}] resized: ${new Date()}`);
  }

  public handleSectionTrackBy(index: number): number {
    return index;
  }

  public onSectionResize(
    sectionIndex: number,
    event: ResizeObserverEntry,
  ): void {
    console.log(`Section[${sectionIndex}] resized: ${new Date()}`);
  }
}
