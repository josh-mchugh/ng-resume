import { Injectable } from '@angular/core';
import {
  Action,
  createSelector,
  State,
  StateContext,
  Store,
} from '@ngxs/store';
import { Display } from '@display/display.actions';
import { DisplayStateConfig } from '@display/display.config';
import { DisplayService } from '@display/display.service';
import { NodeType, NodeDataType } from '@layout/layout.interface';
import { LayoutState, LayoutNode } from '@layout/layout.state';
import { ResumeState } from '@resume/resume.state';
import ShortUniqueId from 'short-unique-id';

export interface DisplayStateModel {
  pages: Pages;
  sections: Sections;
}

export interface Pages {
  byId: { [id: string]: Page };
  allIds: string[];
  properties: PageProperties;
}

export interface Page {
  id: string;
  position: number;
}

export interface PageProperties {
  anchors: string[];
  maxHeight: number;
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
  position: number;
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

  constructor(
    private store: Store,
    private displayService: DisplayService,
  ) {
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

  static sectionsByLayoutNodeIds(
    layoutNodeIds: string[],
  ): (state: DisplayStateModel) => Section[] {
    return createSelector([DisplayState], (state: DisplayStateModel) =>
      Object.values(state.sections.byId).filter((section) =>
        layoutNodeIds.includes(section.layoutNodeId),
      ),
    );
  }

  static sectionByLayoutNodeId(
    layoutNodeId: string,
    pageId: string,
  ): (state: DisplayStateModel) => Section {
    return createSelector(
      [DisplayState],
      (state: DisplayStateModel) =>
        Object.values(state.sections.byId).filter(
          (section) =>
            section.layoutNodeId === layoutNodeId && section.pageId === pageId,
        )[0],
    );
  }

  @Action(Display.InitializeState)
  initializeState(ctx: StateContext<DisplayStateModel>) {
    const pageProperties = this.store.selectSnapshot(LayoutState.page());
    const page = {
      id: this.uuid.rnd(),
      position: 0,
    };

    const rootNodes = this.store.selectSnapshot(LayoutState.rootNodes());

    const buildSection = (
      parentId: string,
      resumeId: string,
      layoutNode: LayoutNode,
    ): Section[] => {
      const id = this.uuid.rnd();
      const section = {
        id: id,
        layoutNodeId: layoutNode.id,
        parentId: parentId,
        resumeId: resumeId,
        position: layoutNode.position,
        pageId: page.id,
        dimension: initDimension(),
      };

      const childNodes = this.store.selectSnapshot(
        LayoutState.childNodes(layoutNode.id),
      );
      if (childNodes.length) {
        const isDynamicContainer =
          NodeType.CONTAINER === layoutNode.type &&
          NodeDataType.DYNAMIC === layoutNode.dataType;

        const resumeIds: string[] = isDynamicContainer
          ? this.store.selectSnapshot(
              ResumeState.selectorValue(layoutNode.selectors[0].type, resumeId),
            )
          : [''];
        const childSections = resumeIds
          .map((resumeId) =>
            childNodes.map((node) => buildSection(id, resumeId, node)),
          )
          .flat()
          .flat();
        return [section, ...childSections];
      }

      return [section];
    };

    const sections = rootNodes
      .map((node) => buildSection('', '', node))
      .flat()
      .reduce((acc, section) => ({ ...acc, [section.id]: section }), {});

    ctx.setState({
      pages: {
        properties: {
          anchors: pageProperties.anchors,
          maxHeight: pageProperties.maxHeight,
        },
        byId: {
          [page.id]: page,
        },
        allIds: [page.id],
      },
      sections: {
        byId: sections,
        allIds: Object.keys(sections),
      },
    });
  }

  @Action(Display.SectionDimensionUpdate)
  update(
    ctx: StateContext<DisplayStateModel>,
    action: Display.SectionDimensionUpdate,
  ) {
    const section = ctx.getState().sections.byId[action.id];
    const updatedSection = { ...section, dimension: action.dimension };

    ctx.setState({
      ...ctx.getState(),
      sections: {
        ...ctx.getState().sections,
        byId: {
          ...ctx.getState().sections.byId,
          [updatedSection.id]: { ...updatedSection },
        },
      },
    });

    const actions = ctx.getState().pages.properties.anchors.includes(updatedSection.layoutNodeId)
      ? [new Display.SectionAnchorUpdate(updatedSection.id)] : [];

    return ctx.dispatch(actions);
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
      position: layoutNode.position,
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

  @Action(Display.NestedSectionCreate)
  nestedSectionCreate(
    ctx: StateContext<DisplayStateModel>,
    action: Display.NestedSectionCreate,
  ) {
    const layoutNode = this.store.selectSnapshot(
      LayoutState.layoutNodeBySelectorType(action.selectorType),
    );
    const parentSection = Object.values(ctx.getState().sections.byId).find(
      (section) =>
        section.layoutNodeId === layoutNode.parentId &&
        section.resumeId === action.parentResumeId,
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
      position: layoutNode.position,
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

  @Action(Display.PageCreate)
  pageCreate(ctx: StateContext<DisplayStateModel>) {
    const pagePosition = Object.values(ctx.getState().pages.byId).length;

    const page = {
      id: this.uuid.rnd(),
      position: pagePosition,
    };

    // build sections to anchor nodes
    const rootNodes = this.store.selectSnapshot(LayoutState.rootNodes());

    const buildSection = (
      parentId: string,
      resumeId: string,
      layoutNode: LayoutNode,
    ): Section[] => {
      const id = this.uuid.rnd();
      const section = {
        id: id,
        layoutNodeId: layoutNode.id,
        parentId: parentId,
        resumeId: resumeId,
        position: layoutNode.position,
        pageId: page.id,
        dimension: initDimension(),
      };

      if (
        !ctx.getState().pages.properties.anchors.includes(section.layoutNodeId)
      ) {
        const childNodes = this.store.selectSnapshot(
          LayoutState.childNodes(layoutNode.id),
        );
        if (childNodes.length) {
          const isDynamicContainer =
            NodeType.CONTAINER === layoutNode.type &&
            NodeDataType.DYNAMIC === layoutNode.dataType;

          const resumeIds: string[] = isDynamicContainer
            ? this.store.selectSnapshot(
                ResumeState.selectorValue(
                  layoutNode.selectors[0].type,
                  resumeId,
                ),
              )
            : [''];
          const childSections = resumeIds
            .map((resumeId) =>
              childNodes.map((node) => buildSection(id, resumeId, node)),
            )
            .flat()
            .flat();
          return [section, ...childSections];
        }
      }

      return [section];
    };

    const sections = rootNodes
      .map((node) => buildSection('', '', node))
      .flat()
      .reduce((acc, section) => ({ ...acc, [section.id]: section }), {});

    ctx.setState({
      ...ctx.getState(),
      pages: {
        ...ctx.getState().pages,
        byId: {
          ...ctx.getState().pages.byId,
          [page.id]: page,
        },
        allIds: [...ctx.getState().pages.allIds, page.id],
      },
      sections: {
        ...ctx.getState().sections,
        byId: {
          ...ctx.getState().sections.byId,
          ...sections,
        },
        allIds: [...ctx.getState().sections.allIds, ...Object.keys(sections)],
      },
    });
  }

  @Action(Display.SectionAnchorUpdate)
  sectionAnchorUpdate(
    ctx: StateContext<DisplayStateModel>,
    action: Display.SectionAnchorUpdate,
  ) {
    const section = ctx.getState().sections.byId[action.sectionId];
    const maxPageHeight = ctx.getState().pages.properties.maxHeight;
    const heightDifference = section.dimension.height - maxPageHeight;
    const shiftType = maxPageHeight === section.dimension.height
      ? Display.AnchorShiftType.SAME
      : section.dimension.height > maxPageHeight ? Display.AnchorShiftType.EXPAND : Display.AnchorShiftType.SHRANK;
    console.log("Anchor Height: ", section.dimension.height);
    console.log("Max Page Height: ", maxPageHeight);
    console.log("Hight Difference: ", heightDifference);
    console.log("Shift Type: ", shiftType);

    const currentPage = ctx.getState().pages.byId[section.pageId];
    const nextPages = Object.values(ctx.getState().pages.byId)
      .filter((page) => page.position > currentPage.position)
      .sort((a, b) => a.position - b.position);
    const hasNextPage = nextPages.length > 0;
    console.log("Current Page: ", currentPage);
    console.log("nextPages: ", nextPages);
    console.log("Has Next Page: ", hasNextPage);

    if(!hasNextPage) {
      if(Display.AnchorShiftType.EXPAND === shiftType) {
        ctx.dispatch([
          new Display.PageCreate(),
          new Display.SectionAnchorShift(section.id, shiftType, heightDifference)
        ])
      }
    }
  }

  @Action(Display.SectionAnchorShift)
  sectionAnchorShift(
    ctx: StateContext<DisplayStateModel>,
    action: Display.SectionAnchorShift,
  ) {
    const section = ctx.getState().sections.byId[action.sectionId];
    const currentPage = ctx.getState().pages.byId[section.pageId];
    const sections = Object.values(ctx.getState().sections.byId);

    const nest = (items: Section[], id: string): Section[] =>
      items.filter((item) => item['parentId'] === id)
        .sort((a, b) => a.position - b.position)
        .map((item) => ({ ...item, children: nest(items, item.id ) }) )

    const anchorChildSections = nest(sections, section.id)
    console.log("Anchor Child Sections: ", anchorChildSections);

    if(Display.AnchorShiftType.EXPAND === action.shiftType) {

      const reducer = (sections: any): any => {
        return sections.reduceRight((acc: any, curr: any) => {
          console.log("Reducer curr: ", curr);
          if(acc.sum < action.shiftDifference) {
            if(curr.children.length) {
              return reducer(curr.children);
            }
            return {
              sum: acc.sum + curr.dimension.height,
              sections: [ ...acc.sections, curr],
            };
          }
          return acc;
        }, { sum: 0, sections: [] as Section[] }, );
      }

      const reduced = reducer(anchorChildSections);
      console.log("reduced: ", reduced);

      const nestContainers = (parentId: string): Section[] => {
        const section = ctx.getState().sections.byId[parentId];
        console.log("section: ", section);
        if(ctx.getState().pages.properties.anchors.includes(section.layoutNodeId)) {
          console.log("parent id is an anchor");
          return [];
        }
        console.log("parent id is NOT an anchor");
        return [
          section,
          ...nestContainers(section.parentId),
        ];
      }

      const containers = reduced.sections.flatMap((section: Section) => nestContainers(section.parentId));
      console.log("containers: ", containers);

      const nestedContainers = nest([...containers, ...reduced.sections], section.id);
      console.log("Nested Containers: ", nestedContainers);

      const pages = Object.values(ctx.getState().pages.byId);
      const nextPages = pages.filter((page) => page.position > currentPage.position);
      const nextPage = nextPages[0];
      console.log("Next Page: ", nextPage);

      const nextPageAnchor = sections.filter((s) => s.pageId === nextPage.id && s.layoutNodeId === section.layoutNodeId)[0];
      console.log("Next anchor: ", nextPageAnchor);

      const migrator = (sections: any, parentId: string): Section[] => {
        return sections.flatMap((section: any) => {
          const sectionId = reduced.sections.filter((s: any) => s.id === section.id).length ? section.id : this.uuid.rnd();
          const newSection = {
            id: sectionId,
            parentId: parentId,
            pageId: nextPage.id,
            layoutNodeId: section.layoutNodeId,
            position: section.position,
            resumeId: section.resumeId,
            dimension: initDimension()
          };
          if(section.children.length) {
            return [
              newSection,
              ...migrator(section.children, sectionId),
            ];
          }
          return [newSection];
        })
      }
      const migratedSections = migrator(nestedContainers, nextPageAnchor.id);
      console.log("Migrated Sections: ", migratedSections);

      const newSections = migratedSections.reduce((acc, section) => ({ ...acc, [section.id]: section }), {}, );

      ctx.setState({
        ...ctx.getState(),
        sections: {
          byId: {
            ...ctx.getState().sections.byId,
            ...newSections,
          },
          allIds: [
            ...ctx.getState().sections.allIds,
            ...Object.keys(newSections),
          ],
        },
      });
    }
  }
}
