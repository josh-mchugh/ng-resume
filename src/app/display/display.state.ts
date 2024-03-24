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

    const actions = ctx
      .getState()
      .pages.properties.anchors.includes(updatedSection.layoutNodeId)
      ? [new Display.SectionAnchorUpdate(updatedSection.id)]
      : [];

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
    const shiftType =
      section.dimension.height > maxPageHeight
        ? Display.AnchorShiftType.OUT_OF_BOUNDS
        : Display.AnchorShiftType.IN_BOUNDS;
    console.log('Anchor Height: ', section.dimension.height);
    console.log('Max Page Height: ', maxPageHeight);
    console.log('Hight Difference: ', heightDifference);
    console.log('Shift Type: ', shiftType);

    const currentPage = ctx.getState().pages.byId[section.pageId];
    const nextPages = Object.values(ctx.getState().pages.byId)
      .filter((page) => page.position > currentPage.position)
      .sort((a, b) => a.position - b.position);
    const hasNextPage = nextPages.length > 0;
    console.log('Current Page: ', currentPage);
    console.log('nextPages: ', nextPages);
    console.log('Has Next Page: ', hasNextPage);

    if (!hasNextPage) {
      if (Display.AnchorShiftType.OUT_OF_BOUNDS === shiftType) {
        ctx.dispatch([
          new Display.PageCreate(),
          new Display.SectionAnchorShift(
            section.id,
            shiftType,
            heightDifference,
          ),
        ]);
      }
    }
  }

  @Action(Display.SectionAnchorShift)
  sectionAnchorShift(
    ctx: StateContext<DisplayStateModel>,
    action: Display.SectionAnchorShift,
  ) {
    console.log('Starting Anchor Shift Action: ', new Date());

    // Variables related to anchor section and current page
    const section = ctx.getState().sections.byId[action.sectionId];
    const currentPage = ctx.getState().pages.byId[section.pageId];
    const sections = Object.values(ctx.getState().sections.byId);

    // Anchor section children in expanded tree form
    const anchorChildSections = this.buildSectionsTree(section.id, sections);
    console.log('Anchor Child Sections: ', anchorChildSections);

    if (Display.AnchorShiftType.OUT_OF_BOUNDS === action.shiftType) {
      // Get anchors last child sections with sum hight totally high difference
      const moveSections = this.getLastChildNodesWithinHeightLimit(
        anchorChildSections,
        action.shiftDifference,
      );
      console.log('moveSections: ', moveSections);

      // Get parent container sections up until anchor on current page
      const containers = this.getParentContainersUntilAnchor(
        section.id,
        moveSections,
        ctx.getState().sections.byId,
      );
      console.log('containers: ', containers);

      // Build a tree of containers and content sections
      const nestedContainers = this.buildSectionsTree(section.id, [
        ...containers,
        ...moveSections,
      ]);
      console.log('Nested Containers: ', nestedContainers);

      // Get the next page
      const pages = Object.values(ctx.getState().pages.byId);
      const nextPages = pages.filter(
        (page) => page.position > currentPage.position,
      );
      const nextPage = nextPages[0];
      console.log('Next Page: ', nextPage);

      // Get the anchor on the next page by layout node id
      const nextPageAnchor = sections.filter(
        (s) =>
          s.pageId === nextPage.id && s.layoutNodeId === section.layoutNodeId,
      )[0];
      console.log('Next Page Anchor: ', nextPageAnchor);

      // Create new containers and migrate content sections to the new page
      const migratedSections = this.createAndMigrateSections(
        nextPageAnchor.id,
        nextPage.id,
        nestedContainers,
        moveSections,
      );
      console.log('Migrated Sections: ', migratedSections);

      // Format new sections as an object
      const newSections = migratedSections.reduce(
        (acc, section) => ({ ...acc, [section.id]: section }),
        {},
      );

      const removedContainerIds = new Set<string>();
      for (let container of containers) {
        console.log('Container: ', container);
        const childSections = sections.filter(
          (section) => section.parentId === container.id,
        );

        const childrenAfterMove: Section[] = [];
        for (let childSection of childSections) {
          console.log('Child Section: ', childSection);

          if (removedContainerIds.has(childSection.id)) {
            console.log(
              'Moving container to removed Container List: ',
              childSection,
            );
            childrenAfterMove.push(childSection);
          }

          for (let moveSection of moveSections) {
            if (moveSection.id === childSection.id) {
              console.log('Child Section In MoveSections: ', childSection);
              childrenAfterMove.push(childSection);
            }
          }
        }

        console.log('Children After Move: ', childrenAfterMove);

        if (childrenAfterMove.length === childSections.length) {
          console.log('Container Child Length matches movedSections lengths.');
          console.log('Moving container to removed container list.');
          removedContainerIds.add(container.id);
        }
      }

      const filteredSections = Object.values(ctx.getState().sections.byId)
        .filter((section) => !removedContainerIds.has(section.id))
        .reduce((acc, section) => ({ ...acc, [section.id]: section }), {});

      ctx.setState({
        ...ctx.getState(),
        sections: {
          byId: {
            ...filteredSections,
            ...newSections,
          },
          allIds: [
            ...Object.keys(filteredSections),
            ...Object.keys(newSections),
          ],
        },
      });
    }

    console.log('End Anchor Shift Action: ', new Date());
  }

  private buildSectionsTree(id: string, sections: Section[]): Section[] {
    return sections
      .filter((section) => section.parentId === id)
      .sort((a, b) => a.position - b.position)
      .map((section) => ({
        ...section,
        children: this.buildSectionsTree(section.id, sections),
      }));
  }

  private getLastChildNodesWithinHeightLimit(
    sections: any,
    heightLimit: number,
  ): any {
    let sum = 0;
    let yAxisSet = new Set<number>();
    let results: any[] = [];

    const recurs = (sections: any): void => {
      for (let i = sections.length - 1; i >= 0; i--) {
        console.log(`Sections[${i}]: `, sections[i]);
        const section = sections[i];

        if (section.children.length) {
          recurs(section.children);
        } else {
          if (sum < heightLimit) {
            // refactor in the future to check if section has
            // a sibling with the same height or different height
            // and take the largest of the siblings.
            sum = yAxisSet.has(section.dimension.y)
              ? sum
              : sum + section.dimension.height;
            yAxisSet.add(section.dimension.y);
            results.push(section);
          }
        }

        if (sum > heightLimit) {
          return;
        }
      }
    };

    recurs(sections);

    console.log('results: ', results);
    return results;
  }

  private getParentContainersUntilAnchor(
    anchorId: string,
    moveSections: any[],
    sections: { [id: string]: Section },
  ): any[] {
    console.log('Getting Parent Container Sections');
    const parentIds = new Set<string>(
      moveSections.map((section) => section.parentId),
    );
    console.log('Parent Ids: ', parentIds);

    const resultMap = new Map<string, Section>();

    const recurs = (parentId: string): void => {
      const section = sections[parentId];
      console.log('Parent Section: ', section);
      if (section.id !== anchorId) {
        if (!resultMap.has(section.id)) {
          resultMap.set(section.id, section);
        }
        recurs(section.parentId);
      }
    };

    parentIds.forEach((parentId) => recurs(parentId));

    const results = [...resultMap.values()];
    console.log('Results: ', results);

    return results;
  }

  private createAndMigrateSections(
    parentId: string,
    nextPageId: string,
    containers: any[],
    sections: any[],
  ): Section[] {
    const sectionIds = new Set<string>(sections.map((section) => section.id));

    let results: Section[] = [];

    const recurs = (parentId: string, sections: any[]): void => {
      for (let section of sections) {
        const sectionId = sectionIds.has(section.id)
          ? section.id
          : this.uuid.rnd();

        if (section.children.length) {
          recurs(sectionId, section.children);
        }

        const newSection = {
          id: sectionId,
          parentId: parentId,
          pageId: nextPageId,
          layoutNodeId: section.layoutNodeId,
          position: section.position,
          resumeId: section.resumeId,
          dimension: initDimension(),
        };

        results.push(newSection);
      }
    };

    recurs(parentId, containers);

    console.log('Results: ', results);
    return results;
  }
}
