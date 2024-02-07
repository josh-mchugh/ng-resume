export namespace Form {
  export class NameUpdate {
    static readonly type = '[Form] Name Update';
    constructor(public name: string) {}
  }

  export class TitleUpdate {
    static readonly type = '[Form] Title Update';
    constructor(public title: string) {}
  }

  export class SummaryUpdate {
    static readonly type = '[Form] Summary Update';
    constructor(public summary: string) {}
  }

  export class PhoneUpdate {
    static readonly type = '[Form] Phone Update';
    constructor(public phone: string) {}
  }

  export class EmailUpdate {
    static readonly type = '[Form] Email Update';
    constructor(public email: string) {}
  }

  export class LocationUpdate {
    static readonly type = '[Form] Location Update';
    constructor(public location: string) {}
  }

  export namespace Social {
    export class Create {
      static readonly type = '[Form] Social Create';
    }

    export class Delete {
      static readonly type = '[Form] Social Delete';
      constructor(public id: string) {}
    }

    export class NameUpdate {
      static readonly type = '[Form] Social Name Update';
      constructor(
        public id: string,
        public name: string,
      ) {}
    }

    export class UrlUpdate {
      static readonly type = '[Form] Social Url Update';
      constructor(
        public id: string,
        public url: string,
      ) {}
    }
  }

  export namespace Experience {
    export class Create {
      static readonly type = '[Form] Experience Create';
    }

    export class Delete {
      static readonly type = '[Form] Experience Delete';
      constructor(public index: number) {}
    }

    export class TitleUpdate {
      static readonly type = '[Form] Experience Title Update';
      constructor(
        public index: number,
        public title: string,
      ) {}
    }

    export class OrganizationUpdate {
      static readonly type = '[Form] Experience Organization Update';
      constructor(
        public index: number,
        public organization: string,
      ) {}
    }

    export class DurationUpdate {
      static readonly type = '[Form] Experience Duration Update';
      constructor(
        public index: number,
        public duration: string,
      ) {}
    }

    export class LocationUpdate {
      static readonly type = '[Form] Experience Location Update';
      constructor(
        public index: number,
        public location: string,
      ) {}
    }

    export class DescriptionUpdate {
      static readonly type = '[Form] Experience Description Update';
      constructor(
        public index: number,
        public description: string,
      ) {}
    }

    export class SkillsUpdate {
      static readonly type = '[Form] Experience Skills Update';
      constructor(
        public index: number,
        public skills: string,
      ) {}
    }
  }

  export namespace Skill {
    export class Create {
      static readonly type = '[Form] Skill Create';
    }

    export class Delete {
      static readonly type = '[Form] Skill Delete';
      constructor(public index: number) {}
    }

    export class NameUpdate {
      static readonly type = '[Form] Skill Name Update';
      constructor(
        public index: number,
        public name: string,
      ) {}
    }

    export class ProficiencyUpdate {
      static readonly type = '[Form] Skill Proficiency Update';
      constructor(
        public index: number,
        public proficiency: number,
      ) {}
    }
  }

  export namespace Certification {
    export class Create {
      static readonly type = '[Form] Certification Create';
    }

    export class Delete {
      static readonly type = '[Form] Certification Delete';
      constructor(public index: number) {}
    }

    export class TitleUpdate {
      static readonly type = '[Form] Certification Title Update';
      constructor(
        public index: number,
        public title: string,
      ) {}
    }

    export class OrganizationUpdate {
      static readonly type = '[Form] Certification Organization Update';
      constructor(
        public index: number,
        public organization: string,
      ) {}
    }

    export class YearUpdate {
      static readonly type = '[Form] Certification Year Update';
      constructor(
        public index: number,
        public year: string,
      ) {}
    }

    export class LocationUpdate {
      static readonly type = '[Form] Certification Location Update';
      constructor(
        public index: number,
        public location: string,
      ) {}
    }
  }
}
