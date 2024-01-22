import { Injectable } from '@angular/core';
import { Action, createSelector, State, StateContext } from '@ngxs/store';
import { Display } from '@shared/state/display.actions';

export interface DisplayStateModel {
  pages: Pages;
  sections: Sections;
}

export interface Pages {
  byId: { [id: string]: Page };
  allIds: string[];
}

export interface Page {
  id: string;
}

export interface Sections {
  byId: { [id: string]: Section };
  allIds: string[];
}

export interface Section {
  id: string;
  parentId: string;
  layoutNodeId: string;
  pageId: string;
  dimension: Dimension;
}

export interface Dimension {
  x: number;
  y: number;
  right: number;
  bottom: number;
  height: number;
  width: number;
}

function initDimension(): Dimension {
  return {
    x: 0,
    y: 0,
    right: 0,
    bottom: 0,
    height: 0,
    width: 0,
  };
}

@State<DisplayStateModel>({
  name: 'display',
  defaults: {
    pages: {
      byId: {
        '0': {
          id: '0',
        },
      },
      allIds: ['0'],
    },
    sections: {
      byId: {},
      allIds: [],
    },
  },
})
@Injectable()
export class DisplayState {
  static getPages(): (state: DisplayStateModel) => Page[] {
    return createSelector([DisplayState], (state: DisplayStateModel) =>
      Object.values(state.pages.byId),
    );
  }

  static rootSections(pageId: string): (state: DisplayStateModel) => Section[] {
    return createSelector([DisplayState], (state: DisplayStateModel) =>
      Object.values(state.sections.byId).filter(
        (section) => '' === section.parentId && pageId === section.pageId,
      ),
    );
  }

  static section(id: string): (state: DisplayStateModel) => Section {
    return createSelector(
      [DisplayState],
      (state: DisplayStateModel) => state.sections.byId[id],
    );
  }

  static childSections(id: string): (state: DisplayStateModel) => Section[] {
    return createSelector([DisplayState], (state: DisplayStateModel) =>
      Object.values(state.sections.byId).filter(
        (section) => section.parentId === id,
      ),
    );
  }

  @Action(Display.SectionAdd)
  add(ctx: StateContext<DisplayStateModel>, action: Display.SectionAdd) {
    let sections = ctx.getState().sections;
    sections = {
      byId: {
        ...sections.byId,
        [action.section.id]: { ...action.section, dimension: initDimension() },
      },
      allIds: [...sections.allIds, action.section.id],
    };
    ctx.setState({
      ...ctx.getState(),
      sections: sections,
    });
  }

  @Action(Display.SectionAddAll)
  addAll(ctx: StateContext<DisplayStateModel>, action: Display.SectionAddAll) {
    let sections = ctx.getState().sections;
    const newSectionIds = action.sections.map((section) => section.id);
    const newSections = action.sections.reduce(
      (acc, section) => ({
        ...acc,
        [section.id]: { ...section, dimension: initDimension() },
      }),
      {},
    );
    sections = {
      byId: {
        ...sections.byId,
        ...newSections,
      },
      allIds: [...sections.allIds, ...newSectionIds],
    };

    ctx.setState({
      ...ctx.getState(),
      sections: sections,
    });
  }

  @Action(Display.SectionUpdate)
  update(ctx: StateContext<DisplayStateModel>, action: Display.SectionUpdate) {
    const sections = ctx.getState().sections;
    let section = sections.byId[action.id];
    section = { ...section, dimension: action.dimension };
    ctx.setState({
      ...ctx.getState(),
      sections: {
        ...ctx.getState().sections,
        byId: {
          ...sections.byId,
          [action.id]: { ...section },
        },
      }
    });
  }
}
