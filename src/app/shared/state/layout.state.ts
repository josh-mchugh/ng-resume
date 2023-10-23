import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

export interface LayoutModel {
  class: string;
  rows: Array<RowModel>;
}

export interface RowModel {
  class: string;
  columns: Array<ColumnModel>;
}

export interface ColumnModel {
  class: string;
  sections: Array<SectionModel>;
}

export interface SectionModel {
  type: SectionType;
}

export enum SectionType {
  NAME = 'NAME',
  SUMMARY = 'SUMMARY',
  CONTACT = 'CONTACT',
  SOCIALS = 'SOCIAL',
  EXPERIENCES = 'EXPERIENCES',
  SKILLS = 'SKILLS',
  CERTIFICATIONS = 'CERTIFICATIONS',
}

@State<LayoutModel>({
  name: 'layout',
  defaults: {
    class: 'sheet--full-height',
    rows: [
      {
        class: 'row',
        columns: [
          {
            class: 'column__left',
            sections: [
              { type: SectionType.NAME },
              { type: SectionType.SUMMARY },
              { type: SectionType.CONTACT },
              { type: SectionType.SOCIALS },
            ],
          },
          {
            class: 'column__right',
            sections: [
              { type: SectionType.EXPERIENCES },
              { type: SectionType.SKILLS },
              { type: SectionType.CERTIFICATIONS },
            ],
          },
        ],
      },
    ],
  },
})
@Injectable()
export class LayoutState {}
