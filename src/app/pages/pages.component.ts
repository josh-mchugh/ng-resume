import { Component, HostBinding, OnDestroy } from '@angular/core';
import { Observable, map, Subject, takeUntil } from 'rxjs';
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
export class PagesComponent implements OnDestroy {
  @HostBinding('style.width') attrStyleWidth = '100%';

  pages$: Observable<Page[]>;
  destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private displayService: DisplayService,
  ) {
    this.pages$ = this.store.select(DisplayState.getPages());
    this.store
      .select(LayoutState.rootNodes())
      .pipe(
        map((nodes) => this.displayService.createSections(nodes, '')),
        takeUntil(this.destroy$),
      )
      .subscribe((sections) =>
        this.store.dispatch(new Display.SectionAddAll(sections)),
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public sections(pageId: string): Observable<Section[]> {
    return this.store.select(DisplayState.rootSections(pageId));
  }

  public handleTrackBy(index: number): number {
    return index;
  }
}
