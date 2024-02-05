import { Dimension } from '@shared/state/display.state';

export namespace Display {
  export interface Section {
    id: string;
    parentId: string;
    layoutNodeId: string;
    resumeId: string;
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

  export class SectionDeleteByResumeId {
    static readonly type = '[Display] Section Delete By ResumeId';
    constructor(public resumeIds: string[]) {}
  }
}
