import { Component, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { Coordinate } from '@shared/state/display-structure.state';
import { LayoutStateModel } from '@shared/state/layout.state';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent {
  @HostBinding('style.width') attrStyleWidth = '100%';

  coordinates$: Observable<Coordinate[]>;
  layout$: Observable<LayoutStateModel>;

  constructor(private store: Store) {
    this.layout$ = this.store.select((state) => state.layout);
    this.coordinates$ = this.store.select((state) => state.displayStructure.coordinates);
  }

  public handleTrackBy(index: number): number {
    return index;
  }
}
