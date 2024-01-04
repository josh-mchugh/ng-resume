import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { DisplayStructure } from '@shared/state/display-structure.actions';

export interface DisplayStructureModel {
  byId: { [id: string]: Coordinate };
  allIds: string[];
}

export interface Coordinate {
  id: string;
  parentId: string;
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

@State<DisplayStructureModel>({
  name: 'displayStructure',
  defaults: {
    byId: {},
    allIds: [],
  },
})
@Injectable()
export class DisplayStructureState {
  @Action(DisplayStructure.AddCoordinate)
  coordinateAdd(
    ctx: StateContext<DisplayStructureModel>,
    action: DisplayStructure.AddCoordinate,
  ) {
    ctx.setState({
      ...ctx.getState(),
      byId: {
        ...ctx.getState().byId,
        [action.id]: { ...action, dimension: initDimension() },
      },
      allIds: [...ctx.getState().allIds, action.id],
    });
  }

  @Action(DisplayStructure.UpdateCoordinate)
  coordinateUpdate(
    ctx: StateContext<DisplayStructureModel>,
    action: DisplayStructure.UpdateCoordinate,
  ) {
    let coordinate = ctx.getState().byId[action.id];
    coordinate = { ...coordinate, dimension: action.dimension };
    ctx.setState({
      ...ctx.getState(),
      byId: { ...ctx.getState().byId, [action.id]: { ...coordinate } },
    });
  }
}
