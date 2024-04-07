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

  export class CertificationCreate {
    static readonly type = '[Resume] Certification Create';
    constructor(public id: string) {}
  }

  export class CertificationDelete {
    static readonly type = '[Resume] Certification Delete';
    constructor(public id: string) {}
  }

  export class CertificationTitleUpdate {
    static readonly type = '[Resume] Certification Title Update';
    constructor(
      public id: string,
      public title: string,
    ) {}
  }

  export class CertificationOrganizationUpdate {
    static readonly type = '[Resume] Certification Organization Update';
    constructor(
      public id: string,
      public organization: string,
    ) {}
  }

  export class CertificationYearUpdate {
    static readonly type = '[Resume] Certification Year Update';
    constructor(
      public id: string,
      public year: string,
    ) {}
  }

  export class CertificationLocationUpdate {
    static readonly type = '[Resume] Certification Location Update';
    constructor(
      public id: string,
      public location: string,
    ) {}
  }
}
