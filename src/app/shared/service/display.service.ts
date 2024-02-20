import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import ShortUniqueId from 'short-unique-id';
import { LayoutNode, LayoutState } from '@shared/state/layout.state';
import { Display } from '@shared/state/display.actions';
import { DisplayState } from '@shared/state/display.state';
import { SelectorType } from '@shared/state/resume.state';

export namespace DisplayRequest {
  export class CreateRootSections {
    constructor(public layoutNodes: LayoutNode[]) {}
  }

  export class CreateStaticSections {
    constructor(
      public layoutNodes: LayoutNode[],
      public parentId: string,
    ) {}
  }

  export class CreateDynamicSections {
    constructor(
      public layoutNodes: LayoutNode[],
      public parentId: string,
      public resumeIds: string[],
    ) {}
  }

  export class SocialSectionChangeRequest {
    constructor(
      public prevStateIds: string[],
      public newStateIds: string[],
    ) {}
  }
}

@Injectable({
  providedIn: 'root',
})
export class DisplayService {
  uuid: ShortUniqueId;

  constructor(private store: Store) {
    this.uuid = new ShortUniqueId();
  }

  public createRootSections(
    request: DisplayRequest.CreateRootSections,
  ): Display.Section[] {
    return request.layoutNodes.map((layoutNode) =>
      this.createSection(layoutNode, '', ''),
    );
  }

  public createStaticSections(
    request: DisplayRequest.CreateStaticSections,
  ): Display.Section[] {
    return request.layoutNodes.map((layoutNode) =>
      this.createSection(layoutNode, request.parentId, ''),
    );
  }

  public createDynamicSections(
    request: DisplayRequest.CreateDynamicSections,
  ): Display.Section[] {
    return request.resumeIds
      .map((resumeId) =>
        request.layoutNodes.map((layoutNode) =>
          this.createSection(layoutNode, request.parentId, resumeId),
        ),
      )
      .flat();
  }

  public createSection(
    layoutNode: LayoutNode,
    parentId: string,
    resumeId: string,
  ): Display.Section {
    return {
      id: this.uuid.randomUUID(),
      parentId: parentId,
      layoutNodeId: layoutNode.id,
      resumeId: resumeId,
      pageId: '0',
    };
  }

  public hasSectionByResumeId(
    resumeId: string,
    selectorType: SelectorType,
  ): boolean {
    const layoutNode = this.store.selectSnapshot(
      LayoutState.layoutNodeBySelectorType(selectorType),
    );
    return this.store.selectSnapshot(
      DisplayState.hasSectionByResumeId(resumeId, layoutNode.id),
    );
  }
}
