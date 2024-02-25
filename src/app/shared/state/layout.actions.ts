import { LayoutStateModel } from '@shared/state/layout.state';

export namespace Layout {
  export class InitializeState {
    static readonly type = '[Layout] Initialize State';
    constructor(public layout: LayoutStateModel) {}
  }
}
