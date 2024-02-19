import { Dimension } from '@shared/state/display.state';
import { SelectorType } from '@shared/state/resume.state';

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

  export class SectionDeleteByResumeIds {
    static readonly type = '[Display] Section Delete By ResumeIds';
    constructor(public resumeIds: string[]) {}
  }

  export class SectionCreate {
    static readonly type = '[Display] Section Create';
    constructor(
      public resumeId: string,
      public selectorType: SelectorType,
    ) {}
  }

  export class SectionDelete {
    static readonly type = '[Display] Section Delete';
    constructor(public resumeId: string) {}
  }
}
