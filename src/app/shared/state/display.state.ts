import { Injectable } from '@angular/core';
import { Action, createSelector, State, StateContext } from '@ngxs/store';
import { Section } from '@shared/state/display.actions';

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
  }
})
@Injectable()
export class DisplayState {
  static getPages(): (state: DisplayStateModel) => Page[] {
    return createSelector([DisplayState], (state: DisplayStateModel) => Object.values(state.pages.byId))
  }

  @Action(Section.Add)
  add(ctx: StateContext<DisplayStateModel>, action: Section.Add) {
    let sections = ctx.getState().sections;
    sections = {
      byId: {
        ...sections.byId,
        [action.id]: { ...action, dimension: initDimension() },
      },
      allIds: [...sections.allIds, action.id],
    };
    ctx.setState({
      ...ctx.getState(),
      sections: sections,
    });
  }

  @Action(Section.Update)
  update(ctx: StateContext<DisplayStateModel>, action: Section.Update) {
    const sections = ctx.getState().sections;
    let section = sections.byId[action.id];
    section = { ...section, dimension: action.dimension };
    ctx.setState({
      ...ctx.getState(),
      sections: { ...sections, [action.id]: { ...section } },
    });
  }
}
