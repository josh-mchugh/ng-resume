import { Component, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { DisplayState, Page, Section } from '@display/display.state';
import { ResumeState } from '@resume/resume.state';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent {
  @HostBinding('style.width') attrStyleWidth = '100%';

  pages$: Observable<Page[]>;
  hasResumeContent$: Observable<boolean>;

  constructor(private store: Store) {
    this.hasResumeContent$ = this.store.select(ResumeState.hasContent());
    this.pages$ = this.store.select(DisplayState.getPages());
  }

  public sections(pageId: string): Observable<Section[]> {
    return this.store.select(DisplayState.rootSections(pageId));
  }

  public handlePageTrackBy(index: number, page: Page): string {
    return page.id;
  }

  public handleSectionTrackBy(index: number, section: Section): string {
    return section.id;
  }
}
