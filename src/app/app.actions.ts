export class NameUpdate {
  static readonly type = '[Name] Update';
  constructor(public name: string) {}
}

export class TitleUpdate {
  static readonly type = '[Title] Update';
  constructor(public title: string) {}
}
