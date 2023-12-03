import { Component, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { LayoutStateModel } from '@shared/state/layout.state';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent {
  @HostBinding('style.width') attrStyleWidth = '100%';

  layout$: Observable<LayoutStateModel>;

  constructor(private store: Store) {
    this.layout$ = this.store.select((state) => state.layout);
  }

  public handleTrackBy(index: number): number {
    return index;
  }
}
