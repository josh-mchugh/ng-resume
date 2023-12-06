import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { Layout } from './layout.actions';

export interface LayoutStateModel {
  dimension: Dimension;
  sections: Array<SectionModel>;
}

export interface SectionModel {
  type: SectionType;
  classes: SectionClasses;
  dimension: Dimension;
  children: Array<SectionModel>;
}

export interface SectionClasses {
  root: string;
  content: string;
}

function emptyClasses() {
  return {
    root: '',
    content: '',
  };
}

export enum SectionType {
  SECTION = 'SECTION',
  NAME = 'NAME',
  TITLE = 'TITLE',
  // SUMMARY COMPONENT
  SUMMARY_COMPONENT = 'SUMMARY_COMPONENT',
  SUMMARY_HEADER = 'SUMMARY_HEADER',
  SUMMARY_CONTENT = 'SUMMARY_CONTENT',
  CONTACT = 'CONTACT',
  SOCIALS = 'SOCIALS',
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
    dimension: initDimension(),
    sections: [
      {
        type: SectionType.SECTION,
        classes: emptyClasses(),
        dimension: initDimension(),
        children: [
          {
            type: SectionType.SECTION,
            classes: {
              root: 'section--column-left',
              content: 'section__content--column',
            },
            dimension: initDimension(),
            children: [
              {
                type: SectionType.SECTION,
                classes: {
                  root: '',
                  content: 'section__content--column',
                },
                dimension: initDimension(),
                children: [
                  {
                    type: SectionType.SECTION,
                    classes: emptyClasses(),
                    dimension: initDimension(),
                    children: [
                      {
                        type: SectionType.NAME,
                        classes: emptyClasses(),
                        dimension: initDimension(),
                        children: [],
                      },
                    ],
                  },
                  {
                    type: SectionType.SECTION,
                    classes: emptyClasses(),
                    dimension: initDimension(),
                    children: [
                      {
                        type: SectionType.TITLE,
                        classes: emptyClasses(),
                        dimension: initDimension(),
                        children: [],
                      },
                    ],
                  },
                ],
              },
              {
                type: SectionType.SUMMARY_COMPONENT,
                classes: emptyClasses(),
                dimension: initDimension(),
                children: [
                  {
                    type: SectionType.SUMMARY_HEADER,
                    classes: emptyClasses(),
                    dimension: initDimension(),
                    children: [],
                  },
                  {
                    type: SectionType.SUMMARY_CONTENT,
                    classes: emptyClasses(),
                    dimension: initDimension(),
                    children: [],
                  },
                ],
              },
              {
                type: SectionType.CONTACT,
                classes: emptyClasses(),
                dimension: initDimension(),
                children: [],
              },
              {
                type: SectionType.SOCIALS,
                classes: emptyClasses(),
                dimension: initDimension(),
                children: [],
              },
            ],
          },
          {
            type: SectionType.SECTION,
            classes: {
              root: 'section--column-right',
              content: 'section__content--column',
            },
            dimension: initDimension(),
            children: [
              {
                type: SectionType.EXPERIENCES,
                classes: emptyClasses(),
                dimension: initDimension(),
                children: [],
              },
              {
                type: SectionType.SKILLS,
                classes: emptyClasses(),
                dimension: initDimension(),
                children: [],
              },
              {
                type: SectionType.CERTIFICATIONS,
                classes: emptyClasses(),
                dimension: initDimension(),
                children: [],
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
    const updatedRows = state.sections.map((row, index) =>
      index === action.rowIndex ? { ...row, dimension: action.dimension } : row,
    );
    ctx.setState({
      ...state,
      sections: updatedRows,
    });
  }

  @Action(Layout.DimensionColumnUpdate)
  dimensionColumnUpdate(
    ctx: StateContext<LayoutStateModel>,
    action: Layout.DimensionColumnUpdate,
  ) {
    const state = ctx.getState();
    const updatedRows = state.sections.map((row, rowIndex) => {
      if (rowIndex === action.rowIndex) {
        const updatedColumns = row.children.map((column, columnIndex) =>
          columnIndex === action.columnIndex
            ? { ...column, dimension: action.dimension }
            : column,
        );
        return { ...row, children: updatedColumns };
      } else {
        return row;
      }
    });
    ctx.setState({
      ...state,
      sections: updatedRows,
    });
  }

  @Action(Layout.DimensionSectionUpdate)
  dimensionSectionUpdate(
    ctx: StateContext<LayoutStateModel>,
    action: Layout.DimensionSectionUpdate,
  ) {
    const state = ctx.getState();
    const updatedRows = state.sections.map((row, rowIndex) => {
      if (rowIndex === action.rowIndex) {
        const updatedColumns = row.children.map((column, columnIndex) => {
          if (columnIndex === action.columnIndex) {
            const updatedSections = column.children.map(
              (section, sectionIndex) =>
                sectionIndex === action.sectionIndex
                  ? { ...section, dimension: action.dimension }
                  : section,
            );
            return { ...column, children: updatedSections };
          } else {
            return column;
          }
        });
        return { ...row, children: updatedColumns };
      } else {
        return row;
      }
    });

    ctx.setState({
      ...state,
      sections: updatedRows,
    });
  }

  @Action(Layout.DimensionSegmentUpdate)
  dimensionSegmentUpdate(
    ctx: StateContext<LayoutStateModel>,
    action: Layout.DimensionSegmentUpdate,
  ) {
    const state = ctx.getState();
    const updatedRows = state.sections.map((row, rowIndex) => {
      if (rowIndex === action.rowIndex) {
        const updatedColumns = row.children.map((column, columnIndex) => {
          if (columnIndex === action.columnIndex) {
            const updatedSections = column.children.map(
              (section, sectionIndex) => {
                if (sectionIndex === action.sectionIndex) {
                  const updatedSegements = section.children.map(
                    (segment, segmentIndex) => {
                      if (segmentIndex === action.segmentIndex) {
                        return { ...segment, dimension: action.dimension };
                      } else {
                        return segment;
                      }
                    },
                  );
                  return { ...section, children: updatedSegements };
                } else {
                  return section;
                }
              },
            );
            return { ...column, children: updatedSections };
          } else {
            return column;
          }
        });
        return { ...row, children: updatedColumns };
      } else {
        return row;
      }
    });

    ctx.setState({
      ...state,
      sections: updatedRows,
    });
  }
}
