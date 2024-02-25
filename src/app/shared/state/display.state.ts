import { Injectable } from '@angular/core';
import {
  Action,
  createSelector,
  State,
  StateContext,
  Store,
} from '@ngxs/store';
import { Display } from '@shared/state/display.actions';
import { DisplayStateConfig } from '@shared/state/display.config';
import { LayoutState } from '@shared/state/layout.state';
import ShortUniqueId from 'short-unique-id';

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
  resumeId: string;
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
  defaults: DisplayStateConfig.DEFAULT,
})
@Injectable()
export class DisplayState {
  private uuid: ShortUniqueId;

  constructor(private store: Store) {
    this.uuid = new ShortUniqueId();
  }

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

  static hasSectionByResumeId(
    resumeId: string,
    layoutNodeId: string,
  ): (state: DisplayStateModel) => boolean {
    return createSelector(
      [DisplayState],
      (state: DisplayStateModel) =>
        Object.values(state.sections.byId).filter(
          (section) =>
            section.resumeId === resumeId &&
            section.layoutNodeId === layoutNodeId,
        ).length > 0,
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
      },
    });
  }

  @Action(Display.SectionDeleteByResumeIds)
  delete(
    ctx: StateContext<DisplayStateModel>,
    action: Display.SectionDeleteByResumeIds,
  ) {
    const sections = Object.values(ctx.getState().sections.byId)
      .filter((section) => !action.resumeIds.includes(section.resumeId))
      .reduce(
        (acc, section) => ({
          ...acc,
          [section.id]: { ...section },
        }),
        {},
      );

    const allIds = Object.keys(sections);

    ctx.setState({
      ...ctx.getState(),
      sections: {
        byId: sections,
        allIds: allIds,
      },
    });
  }

  @Action(Display.SectionCreate)
  sectionCreate(
    ctx: StateContext<DisplayStateModel>,
    action: Display.SectionCreate,
  ) {
    const layoutNode = this.store.selectSnapshot(
      LayoutState.layoutNodeBySelectorType(action.selectorType),
    );
    const parentSection = Object.values(ctx.getState().sections.byId).find(
      (section) => section.layoutNodeId === layoutNode.parentId,
    );
    if (!parentSection) {
      throw new Error(
        `Unable to find parent section by layoutNodeId: ${layoutNode.id}`,
      );
    }

    const section = {
      id: this.uuid.rnd(),
      parentId: parentSection.id,
      layoutNodeId: layoutNode.id,
      resumeId: action.resumeId,
      pageId: '0',
      dimension: initDimension(),
    };

    const updatedById = {
      ...ctx.getState().sections.byId,
      [section.id]: section,
    };
    const updatedAllIds = Object.keys(updatedById);

    ctx.setState({
      ...ctx.getState(),
      sections: {
        byId: updatedById,
        allIds: updatedAllIds,
      },
    });
  }

  @Action(Display.SectionDelete)
  sectionDelete(
    ctx: StateContext<DisplayStateModel>,
    action: Display.SectionDelete,
  ) {
    const updatedById = Object.values(ctx.getState().sections.byId)
      .filter((section) => section.resumeId !== action.resumeId)
      .reduce((acc, section) => ({ ...acc, [section.id]: section }), {});
    const updatedAllIds = Object.keys(updatedById);

    ctx.setState({
      ...ctx.getState(),
      sections: {
        byId: updatedById,
        allIds: updatedAllIds,
      },
    });
  }
}
