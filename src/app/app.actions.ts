export class NameUpdate {
  static readonly type = '[Name] Update';
  constructor(public name: string) {}
}

export class TitleUpdate {
  static readonly type = '[Title] Update';
  constructor(public title: string) {}
}

export class SummaryUpdate {
  static readonly type = '[Summary] Update';
  constructor(public summary: string) {}
}

export class PhoneUpdate {
  static readonly type = '[Phone] Update';
  constructor(public phone: string) {}
}

export class EmailUpdate {
  static readonly type = '[Email] Update';
  constructor(public email: string) {}
}

export class LocationUpdate {
  static readonly type = '[Location] Update';
  constructor(public location: string) {}
}

export class SocialCreate {
  static readonly type = '[Social] Create';
  constructor() {}
}

export class SocialDelete {
  static readonly type = '[Social] Delete';
  constructor(public index: number) {}
}

export class SocialNameUpdate {
  static readonly type = '[Social] Update Name';
  constructor(public index: number, public name: string) {}
}

export class SocialUrlUpdate {
  static readonly type = '[Social] Update Url';
  constructor(public index: number, public url: string) {}
}
