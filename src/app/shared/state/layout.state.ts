import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { Layout } from './layout.actions';

export interface LayoutStateModel {
  class: string;
  dimension: Dimension;
  rows: Array<RowModel>;
}

export interface RowModel {
  class: string;
  dimension: Dimension;
  columns: Array<ColumnModel>;
}

export interface ColumnModel {
  class: string;
  dimension: Dimension;
  sections: Array<SectionModel>;
}

export interface SectionModel {
  type: SectionType;
  dimension: Dimension;
}

export enum SectionType {
  NAME = 'NAME',
  SUMMARY = 'SUMMARY',
  CONTACT = 'CONTACT',
  SOCIALS = 'SOCIAL',
  EXPERIENCES = 'EXPERIENCES',
  SKILLS = 'SKILLS',
  CERTIFICATIONS = 'CERTIFICATIONS',
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

@State<LayoutStateModel>({
  name: 'layout',
  defaults: {
    class: 'sheet--full-height',
    dimension: initDimension(),
    rows: [
      {
        class: 'row',
        dimension: initDimension(),
        columns: [
          {
            class: 'column__left',
            dimension: initDimension(),
            sections: [
              {
                type: SectionType.NAME,
                dimension: initDimension(),
              },
              {
                type: SectionType.SUMMARY,
                dimension: initDimension(),
              },
              {
                type: SectionType.CONTACT,
                dimension: initDimension(),
              },
              {
                type: SectionType.SOCIALS,
                dimension: initDimension(),
              },
            ],
          },
          {
            class: 'column__right',
            dimension: initDimension(),
            sections: [
              {
                type: SectionType.EXPERIENCES,
                dimension: initDimension(),
              },
              {
                type: SectionType.SKILLS,
                dimension: initDimension(),
              },
              {
                type: SectionType.CERTIFICATIONS,
                dimension: initDimension(),
              },
            ],
          },
        ],
      },
    ],
  },
})
@Injectable()
export class LayoutState {
  @Action(Layout.DimensionRowUpdate)
  dimensionRowUpdate(
    ctx: StateContext<LayoutStateModel>,
    action: Layout.DimensionRowUpdate,
  ) {
    const state = ctx.getState();
    const updatedRows = state.rows.map((row, index) =>
      index === action.index ? { ...row, dimension: action.dimension } : row,
    );
    ctx.setState({
      ...state,
      rows: updatedRows,
    });
  }
}
