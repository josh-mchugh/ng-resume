import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { DisplayState, Section } from '@display/display.state';
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

  public pageExceedsMaxHeight(): boolean {
    const layoutPage = this.store.selectSnapshot(LayoutState.page());

    const anchorSections = this.store
      .selectSnapshot(DisplayState.sectionsByLayoutNodeIds(layoutPage.anchors))
      .filter((section) => section.dimension.height > layoutPage.maxHeight);

    return anchorSections.length > 0;
  }
}
