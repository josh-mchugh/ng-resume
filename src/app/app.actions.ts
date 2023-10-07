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
