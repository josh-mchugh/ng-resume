import { Dimension } from './layout.state';

export namespace Layout {
  export class DimensionRowUpdate {
    static readonly type = '[Dimension] Row Update';
    constructor(
      public index: number,
      public dimension: Dimension,
    ) {}
  }
}
