import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { DisplayState, Page } from '@display/display.state';
import { LayoutState } from '@layout/layout.state';
import { SelectorType } from '@resume/selector-type.enum';

@Injectable({
  providedIn: 'root',
})
export class DisplayService {
  constructor(private store: Store) {}

  public hasSectionByResumeId(
    resumeId: string,
    selectorType: SelectorType,
  ): boolean {
    const layoutNode = this.store.selectSnapshot(
      LayoutState.layoutNodeBySelectorType(selectorType),
    );
    return this.store.selectSnapshot(
      DisplayState.hasSectionByResumeId(resumeId, layoutNode.id),
    );
  }

  public hasNextPage(pageId: string, pages: { [id: string]: Page }) {
    const page = pages[pageId];
    const pagePositions = Object.values(pages).map((page) => page.position);
    return (
      pagePositions.filter((position) => position > page.position).length > 0
    );
  }
}
