import { Dimension } from '@shared/state/section.state';

export namespace Section {
  export class Add {
    static readonly type = '[Section] Add';
    constructor(
      public id: string,
      public parentId: string,
      public layoutNodeId: string,
      public pageId: string,
    ) {}
  }
  export class Update {
    static readonly type = '[Section] Update';
    constructor(
      public id: string,
      public dimension: Dimension,
    ) {}
  }
}
