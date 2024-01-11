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

  export class Social {
    constructor(
      public id: string,
      public name: string,
      public url: string,
    ) {}
  }

  export class SocialsUpdate {
    static readonly type = '[Resume] Socials Update';
    constructor(public socials: Social[]) {}
  }

  export class Experience {
    constructor(
      public id: string,
      public title: string,
      public organization: string,
      public duration: string,
      public location: string,
      public descriptions: string[],
      public skills: string[],
    ) {}
  }

  export class ExperiencesUpdate {
    static readonly type = '[Resume] Experiences Update';
    constructor(public experiences: Experience[]) {}
  }

  export class Skill {
    constructor(
      public id: string,
      public name: string,
      public proficiency: number,
    ) {}
  }

  export class SkillsUpdate {
    static readonly type = '[Resume] Skills Update';
    constructor(public skills: Skill[]) {}
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
