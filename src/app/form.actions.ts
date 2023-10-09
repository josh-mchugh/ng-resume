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
      constructor() {}
    }

    export class Delete {
      static readonly type = '[Form] Social Delete';
      constructor(public index: number) {}
    }

    export class NameUpdate {
      static readonly type = '[Form] Social Name Update';
      constructor(public index: number, public name: string) {}
    }

    export class UrlUpdate {
      static readonly type = '[Form] Social Url Update';
      constructor(public index: number, public url: string) {}
    }
  }

  export namespace Experience {
    export class Create {
      static readonly type = '[Form] Experience Create';
      constructor() {}
    }

    export class Delete {
      static readonly type = '[Form] Experience Delete';
      constructor(public index: number) {}
    }

    export class TitleUpdate {
      static readonly type = '[Form] Experience Title Update';
      constructor(public index: number, public title: string) {}
    }

    export class OrganizationUpdate {
      static readonly type = '[Form] Experience Organization Update';
      constructor(public index: number, public organization: string) {}
    }
  }
}
