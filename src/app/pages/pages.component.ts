import { Component, HostBinding } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { Store } from '@ngxs/store';
import { LayoutState } from '@shared/state/layout.state';
import { DisplayState, Page, Section } from '@shared/state/display.state';
import { Display } from '@shared/state/display.actions';
import {
  DisplayService,
  DisplayRequest,
} from '@shared/service/display.service';
import { ResumeState } from '@shared/state/resume.state';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent {
  @HostBinding('style.width') attrStyleWidth = '100%';

  pages$: Observable<Page[]>;
  hasResumeContent$: Observable<boolean>;

  constructor(
    private store: Store,
    private displayService: DisplayService,
  ) {
    this.hasResumeContent$ = this.store.select(ResumeState.hasContent());
    this.pages$ = this.store.select(DisplayState.getPages());
    this.store
      .select(LayoutState.rootNodes())
      .pipe(
        map((nodes) => {
          const request = new DisplayRequest.CreateRootSections(nodes);
          return this.displayService.createRootSections(request);
        }),
        take(1),
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
