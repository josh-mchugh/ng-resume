import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { DisplayStructure } from '@shared/state/display-structure.actions';

export interface DisplayStructureModel {
  coordinates: Coordinate[];
}

export interface Coordinate {
  dimension: Dimension;
  children: Coordinate[];
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
    coordinates: [
      {
        dimension: initDimension(),
        children: []
      }
    ]
  }
})
@Injectable()
export class DisplayStructureState {
  @Action(DisplayStructure.AddCoordinate)
  certificationsUpdate(
    ctx: StateContext<DisplayStructureModel>,
    action: DisplayStructure.AddCoordinate,
  ) {
    const state = ctx.getState();

    const copyCoordinates = state.coordinates;
    console.log("copyCoordinates before: " + JSON.stringify(copyCoordinates));

    const child = {
      dimension: initDimension(),
      children: []
    };

    const recursion = (coordinate: Coordinate, coords: number[], newChild: Coordinate): Coordinate => {
      console.log("Coordinate: " + JSON.stringify(coordinate));
      console.log("Coords: " + coords);
      if(coords.length === 1) {
        return {
          ...coordinate,
          children: [...coordinate.children, newChild ]
        };
      }
      return {
        ...coordinate,
        children: coordinate.children
          .map((childCoord, index) => {
            if (index === coords[0]) {
              return recursion(childCoord, coords.slice(1), newChild)
            }
            return childCoord;
          })
      };
    };

    const newCoordinates = state.coordinates.map(coordinate => {
      return recursion(coordinate, action.coordinate.slice(1), child);
    });

    console.log("New Coordinates: " + JSON.stringify(newCoordinates));
    ctx.setState({
      ...state,
      coordinates: newCoordinates
    });
  }
}
