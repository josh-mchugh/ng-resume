import { Injectable } from '@angular/core';
import ShortUniqueId from 'short-unique-id';
import { LayoutNode } from '@shared/state/layout.state';
import { Display } from '@shared/state/display.actions';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  uuid: ShortUniqueId;

  constructor() {
    this.uuid = new ShortUniqueId();
  }

  public createSections(layoutNodes: LayoutNode[], parentId: string): Display.Section[] {
    return layoutNodes.map((layoutNode) => this.createSection(layoutNode, parentId));
  }

  public createSection(layoutNode: LayoutNode, parentId: string): Display.Section {
    return {
      id: this.uuid.randomUUID(),
      parentId: parentId,
      layoutNodeId: layoutNode.id,
      pageId: '0',
    };
  }
}
