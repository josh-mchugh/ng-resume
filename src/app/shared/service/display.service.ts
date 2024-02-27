import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { LayoutState } from '@shared/state/layout.state';
import { DisplayState } from '@shared/state/display.state';
import { SelectorType } from '@shared/state/selector-type.enum';

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
}
