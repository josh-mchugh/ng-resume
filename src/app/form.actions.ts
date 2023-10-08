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
}
