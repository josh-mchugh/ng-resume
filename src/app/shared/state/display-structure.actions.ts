import { Dimension } from '@shared/state/display-structure.state';

export namespace DisplayStructure {
  export class AddCoordinate {
    static readonly type = '[Display Structure] Add Coordinate';
    constructor(
      public id: string,
      public parentId: string,
    ) {}
  }
  export class UpdateCoordinate {
    static readonly type = '[Display Structure] Update Coordinate';
    constructor(
      public id: string,
      public dimension: Dimension,
    ) {}
  }
}
