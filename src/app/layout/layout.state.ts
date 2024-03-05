import { Injectable } from '@angular/core';
import { Action, State, StateContext, createSelector } from '@ngxs/store';
import { Layout } from '@layout/layout.actions';
import { NodeType, NodeDataType } from '@layout/layout.interface';
import { LayoutStateConfig } from '@layout/layout.config';
import { SelectorType } from '@resume/selector-type.enum';

export interface LayoutStateModel {
  page: Page;
  nodes: Nodes;
}

export interface Page {
  maxSize: number;
  anchors: string[];
}

interface Nodes {
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
  defaults: LayoutStateConfig.DEFAULT,
})
@Injectable()
export class LayoutState {
  static page(): (state: LayoutStateModel) => Page {
    return createSelector(
      [LayoutState],
      (state: LayoutStateModel) => state.page,
    );
  }

  static allNodes(): (state: LayoutStateModel) => LayoutNode[] {
    return createSelector([LayoutState], (state: LayoutStateModel) =>
      Object.values(state.nodes.byId),
    );
  }

  static layoutNode(id: string): (state: LayoutStateModel) => LayoutNode {
    return createSelector(
      [LayoutState],
      (state: LayoutStateModel) => state.nodes.byId[id],
    );
  }

  static rootNodes(): (state: LayoutStateModel) => LayoutNode[] {
    return createSelector([LayoutState], (state: LayoutStateModel) =>
      Object.values(state.nodes.byId).filter(
        (section) => '' === section.parentId,
      ),
    );
  }

  static childNodes(id: string): (state: LayoutStateModel) => LayoutNode[] {
    return createSelector([LayoutState], (state: LayoutStateModel) =>
      Object.values(state.nodes.byId).filter(
        (section) => id === section.parentId,
      ),
    );
  }

  static layoutNodeBySelectorType(
    selectorType: SelectorType,
  ): (state: LayoutStateModel) => LayoutNode {
    return createSelector([LayoutState], (state: LayoutStateModel) => {
      const layoutNode = Object.values(state.nodes.byId).find((section) =>
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

  @Action(Layout.InitializeState)
  initializeState(
    ctx: StateContext<LayoutStateModel>,
    action: Layout.InitializeState,
  ) {
    ctx.setState({
      ...action.layout,
    });
  }
}
