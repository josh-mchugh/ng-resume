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
      public resumeGroupId: string,
      public selectorType: SelectorType,
    ) {}
  }

  export class SectionDelete {
    static readonly type = '[Display] Section Delete';
    constructor(public resumeGroupId: string) {}
  }

  export class PageCreate {
    static readonly type = '[Display] Page Create';
  }

  export class SectionAnchorUpdate {
    static readonly type = '[Display] Section Anchor Update';
    constructor(public sectionId: string) {}
  }

  export enum AnchorShiftType {
    OUT_OF_BOUNDS = 'OUT_OF_BOUNDS',
    IN_BOUNDS = 'IN_BOUNDS',
  }

  export class SectionAnchorShift {
    static readonly type = '[Display] Section Anchor Shift';
    constructor(
      public sectionId: string,
      public shiftType: AnchorShiftType,
      public shiftDifference: number,
    ) {}
  }
}
