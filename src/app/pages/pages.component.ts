import { Component, HostBinding } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngxs/store';
import { LayoutState, LayoutNode } from '@shared/state/layout.state';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent {
  @HostBinding('style.width') attrStyleWidth = '100%';

  coordinates$: Observable<number[]>;
  layoutNodes$: Observable<LayoutNode[]>;

  constructor(private store: Store) {
    this.layoutNodes$ = this.store.select(LayoutState.rootNodes());
    this.coordinates$ = of([0]);
  }

  public handleTrackBy(index: number): number {
    return index;
  }
}
