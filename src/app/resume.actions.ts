import {
  ResumeExperienceModel,
  ResumeSkillModel,
  ResumeSocialModel
} from './resume.state';

export namespace Resume {
  export class NameUpdate {
    static readonly type = '[Resume] Name Update';
    constructor(public name: string) {}
  }

  export class TitleUpdate {
    static readonly type = '[Resume] Title Update';
    constructor(public title: string) {}
  }

  export class SummaryUpdate {
    static readonly type = '[Resume] Summary Update';
    constructor(public summary: string) {}
  }

  export class PhoneUpdate {
    static readonly type = '[Resume] Phone Update';
    constructor(public phone: string) {}
  }

  export class EmailUpdate {
    static readonly type = '[Resume] Email Update';
    constructor(public email: string) {}
  }

  export class LocationUpdate {
    static readonly type = '[Resume] Location Update';
    constructor(public location: string) {}
  }

  export class SocialsUpdate {
    static readonly type = '[Resume] Socials Update';
    constructor(public socials: Array<ResumeSocialModel>) {}
  }

  export class ExperiencesUpdate {
    static readonly type = '[Resume] Experiences Update';
    constructor(public experiences: Array<ResumeExperienceModel>) {}
  }

  export class SkillsUpdate {
    static readonly type = '[Resume] Skills Update';
    constructor(public skills: Array<ResumeSkillModel>) {}
  }
}
