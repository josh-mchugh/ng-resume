import { Component, HostBinding } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Store } from '@ngxs/store';
import { LayoutState } from '@shared/state/layout.state';
import { DisplayState, Page, Section } from '@shared/state/display.state';
import { Display } from '@shared/state/display.actions';
import { DisplayService } from '@shared/service/display.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent {
  @HostBinding('style.width') attrStyleWidth = '100%';

  pages$: Observable<Page[]>;

  constructor(private store: Store, private displayService: DisplayService) {
    this.pages$ = this.store.select(DisplayState.getPages());
  }

  public sections(pageId: string): Observable<Section[]> {
    return this.store.select(DisplayState.rootSections(pageId)).pipe(
      tap((sections) => {
        if (!sections.length) {
          this.store
            .select(LayoutState.rootNodes())
            .pipe(
              map((nodes) => this.displayService.createSections(nodes, '')),
            )
            .subscribe((sections) =>
              this.store.dispatch(new Display.SectionAddAll(sections)),
            );
        }
      }),
    );
  }

  public handleTrackBy(index: number): number {
    return index;
  }
}
