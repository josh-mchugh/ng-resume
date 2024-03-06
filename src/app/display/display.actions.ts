import { Dimension } from '@display/display.state';
import { SelectorType } from '@resume/selector-type.enum';

export namespace Display {
  export class InitializeState {
    static readonly type = '[Display] Initialize State';
  }

  export class SectionDimensionUpdate {
    static readonly type = '[Display] Section Dimension Update';
    constructor(
      public id: string,
      public dimension: Dimension,
    ) {}
  }

  export class SectionCreate {
    static readonly type = '[Display] Section Create';
    constructor(
      public resumeId: string,
      public selectorType: SelectorType,
    ) {}
  }

  export class NestedSectionCreate {
    static readonly type = '[Display] Nested Section Create';
    constructor(
      public resumeId: string,
      public parentResumeId: string,
      public selectorType: SelectorType,
    ) {}
  }

  export class SectionDelete {
    static readonly type = '[Display] Section Delete';
    constructor(public resumeId: string) {}
  }
}
