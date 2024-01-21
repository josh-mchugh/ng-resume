import { Dimension } from '@shared/state/display.state';

export namespace Display {
  interface Section {
    id: string;
    parentId: string;
    layoutNodeId: string;
    pageId: string;
  }

  export class SectionAdd {
    static readonly type = '[Display] Section Add';
    constructor(public section: Section) {}
  }

  export class SectionAddAll {
    static readonly type = '[Display] Section Add All';
    constructor(public sections: Section[]) {}
  }

  export class SectionUpdate {
    static readonly type = '[Display] Section Update';
    constructor(
      public id: string,
      public dimension: Dimension,
    ) {}
  }
}
