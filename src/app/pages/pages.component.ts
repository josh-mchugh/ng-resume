import { Component, HostBinding } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Store } from '@ngxs/store';
import { LayoutState } from '@shared/state/layout.state';
import { DisplayState, Page, Section } from '@shared/state/display.state';
import { Display } from '@shared/state/display.actions';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent {
  @HostBinding('style.width') attrStyleWidth = '100%';

  pages$: Observable<Page[]>;

  constructor(private store: Store) {
    this.pages$ = this.store.select(DisplayState.getPages());
    this.store
      .select(LayoutState.rootNodes())
      .pipe(
        map((nodes) =>
          nodes.map((node) => {
            return {
              id: Math.random().toString(),
              parentId: '',
              layoutNodeId: node.id,
              pageId: '0',
            };
          }),
        ),
      )
      .subscribe((sections) =>
        this.store.dispatch(new Display.SectionAddAll(sections)),
      );
  }

  public sections(pageId: string): Observable<Section[]> {
    return this.store.select(DisplayState.rootSections(pageId));
  }

  public handleTrackBy(index: number): number {
    return index;
  }
}
