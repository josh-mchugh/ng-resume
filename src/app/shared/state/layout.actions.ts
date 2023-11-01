import { Dimension } from './layout.state';

export namespace Layout {
  export class DimensionRowUpdate {
    static readonly type = '[Dimension] Row Update';
    constructor(
      public rowIndex: number,
      public dimension: Dimension,
    ) {}
  }

  export class DimensionColumnUpdate {
    static readonly type = '[Dimension] Column Update';
    constructor(
      public rowIndex: number,
      public columnIndex: number,
      public dimension: Dimension,
    ) {}
  }

  export class DimensionSectionUpdate {
    static readonly type = '[Dimension] Section Update';
    constructor(
      public rowIndex: number,
      public columnIndex: number,
      public sectionIndex: number,
      public dimension: Dimension,
    ) {}
  }

  export class DimensionSegmentUpdate {
    static readonly type = '[Dimension] Segment Update';
    constructor(
      public rowIndex: number,
      public columnIndex: number,
      public sectionIndex: number,
      public segmentIndex: number,
      public dimension: Dimension,
    ) {}
  }
}
