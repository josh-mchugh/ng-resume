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

  export class SocialCreate {
    static readonly type = '[Resume] Social Create';
    constructor(public id: string) {}
  }

  export class SocialDelete {
    static readonly type = '[Resume] Social Delete';
    constructor(public id: string) {}
  }

  export class SocialNameUpdate {
    static readonly type = '[Resume] Social Name Update';
    constructor(
      public id: string,
      public name: string,
    ) {}
  }

  export class SocialUrlUpdate {
    static readonly type = '[Resume] Social Url Update';
    constructor(
      public id: string,
      public url: string,
    ) {}
  }

  export class ExperienceCreate {
    static readonly type = '[Resume] Experience Create';
    constructor(public id: string) {}
  }

  export class ExperienceDelete {
    static readonly type = '[Resume] Experience Delete';
    constructor(public id: string) {}
  }

  export class ExperienceTitleUpdate {
    static readonly type = '[Resume] Experience Title Update';
    constructor(
      public id: string,
      public title: string,
    ) {}
  }

  export class ExperienceOrganizationUpdate {
    static readonly type = '[Resume] Experience Organization Update';
    constructor(
      public id: string,
      public organization: string,
    ) {}
  }

  export class ExperienceDurationUpdate {
    static readonly type = '[Resume] Experience Duration Update';
    constructor(
      public id: string,
      public duration: string,
    ) {}
  }

  export class ExperienceLocationUpdate {
    static readonly type = '[Resume] Experience Location Update';
    constructor(
      public id: string,
      public location: string,
    ) {}
  }

  export class ExperienceDescriptionUpdate {
    static readonly type = '[Resume] Experience Description Update';
    constructor(
      public id: string,
      public description: string,
    ) {}
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

  export class Certification {
    constructor(
      public id: string,
      public title: string,
      public organization: string,
      public year: string,
      public location: string,
    ) {}
  }

  export class CertificationsUpdate {
    static readonly type = '[Resume] Certifications Update';
    constructor(public certifications: Certification[]) {}
  }
}
