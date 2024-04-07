import { ResumeStateModel } from '@resume/resume.state';
import { SelectorType } from '@resume/selector-type.enum';

export namespace Resume {
  export class InitializeState {
    static readonly type = '[Resume] Initialize State';
    constructor(public resume: ResumeStateModel) {}
  }

  export class NodeCreateOrUpdate {
    static readonly type = '[Resume] Node Create Or Update';
    constructor(
      public type: SelectorType,
      public value: string | number,
      public groupId = '',
      public groupPosition = 0,
      public position = 0,
    ) {}
  }

  export class NodeDeleteByGroupId {
    static readonly type = '[Resume] Node Delete By Group Id';
    constructor(public groupId: string) {}
  }

  export class NodeDeleteByGroupIdAndPosition {
    static readonly type = '[Resume] Node Delete By Group Id And Position';
    constructor(
      public groupId: string,
      public type: SelectorType,
      public position: number,
    ) {}
  }
}
