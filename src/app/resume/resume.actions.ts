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
      public value: string,
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

  export class ExperienceSkillCreate {
    static readonly type = '[Resume] Experience Skill Create';
    constructor(
      public id: string,
      public experienceId: string,
      public position: number,
      public value: string,
    ) {}
  }

  export class ExperienceSkillUpdate {
    static readonly type = '[Resume] Experience Skill Update';
    constructor(
      public id: string,
      public position: number,
      public value: string,
    ) {}
  }

  export class ExperienceSkillDelete {
    static readonly type = '[Resume] Experience Skill Delete';
    constructor(public id: string) {}
  }

  export class ExperienceDescriptionDelete {
    static readonly type = '[Resume] Experience Description Delete';
    constructor(public id: string) {}
  }

  export class ExperienceSkillsUpdate {
    static readonly type = '[Resume] Experience Skills Update';
    constructor(
      public id: string,
      public skills: string,
    ) {}
  }

  export class SkillCreate {
    static readonly type = '[Resume] Skill Create';
    constructor(public id: string) {}
  }

  export class SkillDelete {
    static readonly type = '[Resume] Skill Delete';
    constructor(public id: string) {}
  }

  export class SkillNameUpdate {
    static readonly type = '[Resume] Skill Name Update';
    constructor(
      public id: string,
      public name: string,
    ) {}
  }

  export class SkillProficiencyUpdate {
    static readonly type = '[Resume] Skill Proficiency Update';
    constructor(
      public id: string,
      public proficiency: number,
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
