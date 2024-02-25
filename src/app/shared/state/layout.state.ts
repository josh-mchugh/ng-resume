import { Injectable } from '@angular/core';
import { State, createSelector } from '@ngxs/store';
import { SelectorType } from '@shared/state/resume.state';
import { NodeType, NodeDataType } from '@shared/state/layout.interface';
import { DefaultLayoutState } from '@shared/state/layout.config';

export interface LayoutStateModel {
  byId: { [id: string]: LayoutNode };
  allIds: string[];
}

export interface LayoutNode {
  id: string;
  parentId: string;
  name: string;
  type: NodeType;
  dataType: NodeDataType;
  classes: Classes;
  selectors: Selector[];
  template: string;
}

export interface Classes {
  root: string;
  content: string;
}

export interface Selector {
  type: SelectorType;
  key: string;
}

@State<LayoutStateModel>({
  name: 'layout',
  defaults: DefaultLayoutState,
})
@Injectable()
export class LayoutState {
  static allNodes(): (state: LayoutStateModel) => LayoutNode[] {
    return createSelector([LayoutState], (state: LayoutStateModel) =>
      Object.values(state.byId),
    );
  }

  static layoutNode(id: string): (state: LayoutStateModel) => LayoutNode {
    return createSelector(
      [LayoutState],
      (state: LayoutStateModel) => state.byId[id],
    );
  }

  static rootNodes(): (state: LayoutStateModel) => LayoutNode[] {
    return createSelector([LayoutState], (state: LayoutStateModel) =>
      Object.values(state.byId).filter((section) => '' === section.parentId),
    );
  }

  static childNodes(id: string): (state: LayoutStateModel) => LayoutNode[] {
    return createSelector([LayoutState], (state: LayoutStateModel) =>
      Object.values(state.byId).filter((section) => id === section.parentId),
    );
  }

  static layoutNodeBySelectorType(
    selectorType: SelectorType,
  ): (state: LayoutStateModel) => LayoutNode {
    return createSelector([LayoutState], (state: LayoutStateModel) => {
      const layoutNode = Object.values(state.byId).find((section) =>
        section.selectors.find((selector) => selector.type === selectorType),
      );
      if (layoutNode) {
        return layoutNode;
      } else {
        throw new Error(
          `Unable to find layout node with selector type: ${selectorType}`,
        );
      }
    });
  }
}
