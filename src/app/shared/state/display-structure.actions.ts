export namespace DisplayStructure {
  export class AddCoordinate {
    static readonly type = '[Display Structure] Add Coordinate';
    constructor(public coordinate: number[]) {}
  }
}
