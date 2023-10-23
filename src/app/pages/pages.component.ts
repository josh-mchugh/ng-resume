import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { LayoutModel } from './../shared/state/layout.state';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent {
  layout$: Observable<LayoutModel>;

  constructor(private store: Store) {
    this.layout$ = this.store.select((state) => state.layout);
  }
}
