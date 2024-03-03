import { LayoutStateModel } from '@layout/layout.state';

export namespace Layout {
  export class InitializeState {
    static readonly type = '[Layout] Initialize State';
    constructor(public layout: LayoutStateModel) {}
  }
}
