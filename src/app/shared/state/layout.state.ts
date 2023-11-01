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
  segments: Array<SegmentModel>;
}

export enum SectionType {
  NAME = 'NAME',
  SUMMARY = 'SUMMARY',
  CONTACT = 'CONTACT',
  SOCIALS = 'SOCIALS',
  EXPERIENCES = 'EXPERIENCES',
  SKILLS = 'SKILLS',
  CERTIFICATIONS = 'CERTIFICATIONS',
}

export interface SegmentModel {
  name: string;
  type: SegmentType;
  dimension: Dimension;
}

export enum SegmentType {
  COMPONENT = 'COMPONENT',
  LIST = 'LIST',
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
                segments: [
                  {
                    name: 'NAME',
                    type: SegmentType.COMPONENT,
                    dimension: initDimension(),
                  },
                ],
              },
              {
                type: SectionType.SUMMARY,
                dimension: initDimension(),
                segments: [
                  {
                    name: 'HEADER',
                    type: SegmentType.COMPONENT,
                    dimension: initDimension(),
                  },
                  {
                    name: 'SUMMARY',
                    type: SegmentType.COMPONENT,
                    dimension: initDimension(),
                  },
                ],
              },
              {
                type: SectionType.CONTACT,
                dimension: initDimension(),
                segments: [],
              },
              {
                type: SectionType.SOCIALS,
                dimension: initDimension(),
                segments: [],
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
                segments: [],
              },
              {
                type: SectionType.SKILLS,
                dimension: initDimension(),
                segments: [],
              },
              {
                type: SectionType.CERTIFICATIONS,
                dimension: initDimension(),
                segments: [],
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
      index === action.rowIndex ? { ...row, dimension: action.dimension } : row,
    );
    ctx.setState({
      ...state,
      rows: updatedRows,
    });
  }

  @Action(Layout.DimensionColumnUpdate)
  dimensionColumnUpdate(
    ctx: StateContext<LayoutStateModel>,
    action: Layout.DimensionColumnUpdate,
  ) {
    const state = ctx.getState();
    const updatedRows = state.rows.map((row, rowIndex) => {
      if (rowIndex === action.rowIndex) {
        const updatedColumns = row.columns.map((column, columnIndex) =>
          columnIndex === action.columnIndex
            ? { ...column, dimension: action.dimension }
            : column,
        );
        return { ...row, columns: updatedColumns };
      } else {
        return row;
      }
    });
    ctx.setState({
      ...state,
      rows: updatedRows,
    });
  }

  @Action(Layout.DimensionSectionUpdate)
  dimensionSectionUpdate(
    ctx: StateContext<LayoutStateModel>,
    action: Layout.DimensionSectionUpdate,
  ) {
    const state = ctx.getState();
    const updatedRows = state.rows.map((row, rowIndex) => {
      if (rowIndex === action.rowIndex) {
        const updatedColumns = row.columns.map((column, columnIndex) => {
          if (columnIndex === action.columnIndex) {
            const updatedSections = column.sections.map(
              (section, sectionIndex) =>
                sectionIndex === action.sectionIndex
                  ? { ...section, dimension: action.dimension }
                  : section,
            );
            return { ...column, sections: updatedSections };
          } else {
            return column;
          }
        });
        return { ...row, columns: updatedColumns };
      } else {
        return row;
      }
    });

    ctx.setState({
      ...state,
      rows: updatedRows,
    });
  }
}
