import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { Section } from '@shared/state/section.actions';

export interface SectionModel {
  byId: { [id: string]: Section };
  allIds: string[];
}

export interface Section {
  id: string;
  parentId: string;
  layoutNodeId: string;
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

@State<SectionModel>({
  name: 'section',
  defaults: {
    byId: {},
    allIds: [],
  },
})
@Injectable()
export class SectionState {
  @Action(Section.Add)
  add(ctx: StateContext<SectionModel>, action: Section.Add) {
    ctx.setState({
      ...ctx.getState(),
      byId: {
        ...ctx.getState().byId,
        [action.id]: { ...action, dimension: initDimension() },
      },
      allIds: [...ctx.getState().allIds, action.id],
    });
  }

  @Action(Section.Update)
  update(ctx: StateContext<SectionModel>, action: Section.Update) {
    let section = ctx.getState().byId[action.id];
    section = { ...section, dimension: action.dimension };
    ctx.setState({
      ...ctx.getState(),
      byId: { ...ctx.getState().byId, [action.id]: { ...section } },
    });
  }
}
