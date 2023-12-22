import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { Layout } from './layout.actions';

export interface LayoutStateModel {
  dimension: Dimension;
  sections: Array<SectionModel>;
}

export interface SectionModel {
  type: SectionType;
  classes: SectionClasses;
  dimension: Dimension;
  children: Array<SectionModel>;
  selector?: string;
  template?: string;
}

export interface SectionClasses {
  root: string;
  content: string;
}

function emptyClasses() {
  return {
    root: '',
    content: '',
  };
}

export enum SectionType {
  SECTION = 'SECTION',
  SOCIAL_LIST = 'SOCIAL_LIST',
  HEADER_EXPERIENCE = 'HEADER_EXPERIENCE',
  EXPERIENCE_LIST = 'EXPERIENCE_LIST',
  HEADER_SKILL = 'HEADER_SKILL',
  SKILL_LIST = 'SKILL_LIST',
  HEADER_CERTIFICATION = 'HEADER_CERTIFICATION',
  CERTIFICATION_LIST = 'CERTIFICATION_LIST',
}

export interface Dimension {
  x: number;
  y: number;
  right: number;
  bottom: number;
  height: number;
  width: number;
}

function initDimension(): Dimension {
  return {
    x: 0,
    y: 0,
    right: 0,
    bottom: 0,
    height: 0,
    width: 0,
  };
}

@State<LayoutStateModel>({
  name: 'layout',
  defaults: {
    dimension: initDimension(),
    sections: [
      {
        type: SectionType.SECTION,
        classes: emptyClasses(),
        dimension: initDimension(),
        children: [
          {
            type: SectionType.SECTION,
            classes: {
              root: 'section--column-left',
              content: 'section__content--column',
            },
            dimension: initDimension(),
            children: [
              {
                type: SectionType.SECTION,
                classes: {
                  root: '',
                  content: 'section__content--column',
                },
                dimension: initDimension(),
                children: [
                  {
                    type: SectionType.SECTION,
                    classes: emptyClasses(),
                    dimension: initDimension(),
                    selector: 'name',
                    template: '<div class="name">{{ name }}</div>',
                    children: [],
                  },
                  {
                    type: SectionType.SECTION,
                    classes: emptyClasses(),
                    dimension: initDimension(),
                    selector: 'title',
                    template: '<div class="title">{{ title }}</div>',
                    children: [],
                  },
                ],
              },
              {
                type: SectionType.SECTION,
                classes: {
                  root: '',
                  content: 'section__content--column',
                },
                dimension: initDimension(),
                children: [
                  {
                    type: SectionType.SECTION,
                    classes: emptyClasses(),
                    dimension: initDimension(),
                    selector: '',
                    template: '<div class="header header--summary"><div class="header__title">SUMMARY</div><div class="header__divider"><div class="header-divider__container"><div class="header-divider__line header-divider__line--white"></div></div></div></div>',
                    children: [],
                  },
                  {
                    type: SectionType.SECTION,
                    classes: emptyClasses(),
                    dimension: initDimension(),
                    selector: 'summary',
                    template: '<div class="summary">{{ summary }}</div>',
                    children: [],
                  },
                ],
              },
              {
                type: SectionType.SECTION,
                classes: {
                  root: '',
                  content: 'section__content--column',
                },
                dimension: initDimension(),
                children: [
                  {
                    type: SectionType.SECTION,
                    classes: emptyClasses(),
                    dimension: initDimension(),
                    selector: '',
                    template: '<div class="header header--contact"><div class="header__title">CONTACT</div><div class="header__divider"><div class="header-divider__container"><div class="header-divider__line header-divider__line--white"></div></div></div></div>',
                    children: [],
                  },
                  {
                    type: SectionType.SECTION,
                    classes: emptyClasses(),
                    dimension: initDimension(),
                    selector: 'phone',
                    template: '<div class="contact contact--first"><span class="contact__icon"><i class="fa-solid fa-phone"></i></span>{{ phone }}</div>',
                    children: [],
                  },
                  {
                    type: SectionType.SECTION,
                    classes: emptyClasses(),
                    dimension: initDimension(),
                    selector: 'email',
                    template: '<div class="contact"><span class="contact__icon"><i class="fa-solid fa-envelope"></i></span>{{ email }}</div>',
                    children: [],
                  },
                  {
                    type: SectionType.SECTION,
                    classes: emptyClasses(),
                    dimension: initDimension(),
                    selector: 'location',
                    template: '<div class="contact"><span class="contact__icon"><i class="fa-solid fa-location-dot"></i></span>{{ location }}</div>',
                    children: [],
                  },
                ],
              },
              {
                type: SectionType.SECTION,
                classes: {
                  root: '',
                  content: 'section__content--column',
                },
                dimension: initDimension(),
                children: [
                  {
                    type: SectionType.SECTION,
                    classes: emptyClasses(),
                    dimension: initDimension(),
                    selector: '',
                    template: '<div class="header header--social"><div class="header__title">SOCIAL</div><div class="header__divider"><div class="header-divider__container"><div class="header-divider__line header-divider__line--white"></div></div></div></div>',
                    children: [],
                  },
                  {
                    type: SectionType.SECTION,
                    classes: {
                      root: '',
                      content: 'section__content--column',
                    },
                    dimension: initDimension(),
                    children: [
                      {
                        type: SectionType.SOCIAL_LIST,
                        classes: emptyClasses(),
                        dimension: initDimension(),
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: SectionType.SECTION,
            classes: {
              root: 'section--column-right',
              content: 'section__content--column',
            },
            dimension: initDimension(),
            children: [
              {
                type: SectionType.SECTION,
                classes: {
                  root: '',
                  content: 'section__content--column',
                },
                dimension: initDimension(),
                children: [
                  {
                    type: SectionType.SECTION,
                    classes: emptyClasses(),
                    dimension: initDimension(),
                    children: [
                      {
                        type: SectionType.HEADER_EXPERIENCE,
                        classes: emptyClasses(),
                        dimension: initDimension(),
                        children: [],
                      },
                    ],
                  },
                  {
                    type: SectionType.SECTION,
                    classes: emptyClasses(),
                    dimension: initDimension(),
                    children: [
                      {
                        type: SectionType.EXPERIENCE_LIST,
                        classes: emptyClasses(),
                        dimension: initDimension(),
                        children: [],
                      },
                    ],
                  },
                ],
              },
              {
                type: SectionType.SECTION,
                classes: {
                  root: '',
                  content: 'section__content--column',
                },
                dimension: initDimension(),
                children: [
                  {
                    type: SectionType.SECTION,
                    classes: emptyClasses(),
                    dimension: initDimension(),
                    children: [
                      {
                        type: SectionType.HEADER_SKILL,
                        classes: emptyClasses(),
                        dimension: initDimension(),
                        children: [],
                      },
                    ],
                  },
                  {
                    type: SectionType.SECTION,
                    classes: emptyClasses(),
                    dimension: initDimension(),
                    children: [
                      {
                        type: SectionType.SKILL_LIST,
                        classes: emptyClasses(),
                        dimension: initDimension(),
                        children: [],
                      },
                    ],
                  },
                ],
              },
              {
                type: SectionType.SECTION,
                classes: {
                  root: '',
                  content: 'section__content--column',
                },
                dimension: initDimension(),
                children: [
                  {
                    type: SectionType.SECTION,
                    classes: emptyClasses(),
                    dimension: initDimension(),
                    children: [
                      {
                        type: SectionType.HEADER_CERTIFICATION,
                        classes: emptyClasses(),
                        dimension: initDimension(),
                        children: [],
                      },
                    ],
                  },
                  {
                    type: SectionType.SECTION,
                    classes: emptyClasses(),
                    dimension: initDimension(),
                    children: [
                      {
                        type: SectionType.CERTIFICATION_LIST,
                        classes: emptyClasses(),
                        dimension: initDimension(),
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
})
@Injectable()
export class LayoutState {}
