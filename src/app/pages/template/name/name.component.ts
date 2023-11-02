import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { DimensionService } from '@shared/service/dimension.service';
import { SectionModel } from '@shared/state/layout.state';
import { Layout } from '@shared/state/layout.actions';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss'],
})
export class NameComponent {
  @Input() rowIndex!: number;
  @Input() columnIndex!: number;
  @Input() sectionIndex!: number;
  @Input() sections!: Array<SectionModel>;

  name$: Observable<string>;
  title$: Observable<string>;

  constructor(
    private store: Store,
    private dimensionService: DimensionService,
  ) {
    this.name$ = this.store.select((state) => state.resume.name);
    this.title$ = this.store.select((state) => state.resume.title);
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
