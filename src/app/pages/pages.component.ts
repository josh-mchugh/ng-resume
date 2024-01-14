import { Component, HostBinding } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngxs/store';
import { LayoutState, LayoutNode } from '@shared/state/layout.state';
import { DisplayState, Page } from '@shared/state/display.state';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent {
  @HostBinding('style.width') attrStyleWidth = '100%';

  layoutNodes$: Observable<LayoutNode[]>;
  pages$: Observable<Page[]>;

  constructor(private store: Store) {
    this.layoutNodes$ = this.store.select(LayoutState.rootNodes());
    this.pages$ = this.store.select(DisplayState.getPages());
  }

  public handleTrackBy(index: number): number {
    return index;
  }
}
