import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import { SelectorType } from '@shared/state/resume.state';

export interface LayoutStateModel {
  dimension: Dimension;
  sections: Array<SectionModel>;
}

export interface SectionModel {
  type: SectionType;
  classes: SectionClasses;
  dimension: Dimension;
  children: Array<SectionModel>;
  selector?: SelectorType;
  selectorKey?: string,
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
  CONTENT = 'CONTENT',
  LIST = 'LIST',
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
        type: SectionType.LIST,
        classes: emptyClasses(),
        dimension: initDimension(),
        children: [
          {
            type: SectionType.LIST,
            classes: {
              root: 'section--column-left',
              content: 'section__content--column',
            },
            dimension: initDimension(),
            children: [
              {
                type: SectionType.LIST,
                classes: {
                  root: '',
                  content: 'section__content--column',
                },
                dimension: initDimension(),
                children: [
                  {
                    type: SectionType.CONTENT,
                    classes: emptyClasses(),
                    dimension: initDimension(),
                    selector: SelectorType.NAME,
                    selectorKey: 'name',
                    template: '<div class="name">{{ name }}</div>',
                    children: [],
                  },
                  {
                    type: SectionType.CONTENT,
                    classes: emptyClasses(),
                    dimension: initDimension(),
                    selector: SelectorType.TITLE,
                    selectorKey: 'title',
                    template: '<div class="title">{{ title }}</div>',
                    children: [],
                  },
                ],
              },
              {
                type: SectionType.LIST,
                classes: {
                  root: '',
                  content: 'section__content--column',
                },
                dimension: initDimension(),
                children: [
                  {
                    type: SectionType.CONTENT,
                    classes: emptyClasses(),
                    dimension: initDimension(),
                    selector: SelectorType.NONE,
                    template:
                      '<div class="header header--summary"><div class="header__title">SUMMARY</div><div class="header__divider"><div class="header-divider__container"><div class="header-divider__line header-divider__line--white"></div></div></div></div>',
                    children: [],
                  },
                  {
                    type: SectionType.CONTENT,
                    classes: emptyClasses(),
                    dimension: initDimension(),
                    selector: SelectorType.SUMMARY,
                    selectorKey: 'summary',
                    template: '<div class="summary">{{ summary }}</div>',
                    children: [],
                  },
                ],
              },
              {
                type: SectionType.LIST,
                classes: {
                  root: '',
                  content: 'section__content--column',
                },
                dimension: initDimension(),
                children: [
                  {
                    type: SectionType.CONTENT,
                    classes: emptyClasses(),
                    dimension: initDimension(),
                    selector: SelectorType.NONE,
                    template:
                      '<div class="header header--contact"><div class="header__title">CONTACT</div><div class="header__divider"><div class="header-divider__container"><div class="header-divider__line header-divider__line--white"></div></div></div></div>',
                    children: [],
                  },
                  {
                    type: SectionType.CONTENT,
                    classes: emptyClasses(),
                    dimension: initDimension(),
                    selector: SelectorType.PHONE,
                    selectorKey: 'phone',
                    template:
                      '<div class="contact contact--first"><span class="contact__icon"><i class="fa-solid fa-phone"></i></span>{{ phone }}</div>',
                    children: [],
                  },
                  {
                    type: SectionType.CONTENT,
                    classes: emptyClasses(),
                    dimension: initDimension(),
                    selector: SelectorType.EMAIL,
                    selectorKey: 'email',
                    template:
                      '<div class="contact"><span class="contact__icon"><i class="fa-solid fa-envelope"></i></span>{{ email }}</div>',
                    children: [],
                  },
                  {
                    type: SectionType.CONTENT,
                    classes: emptyClasses(),
                    dimension: initDimension(),
                    selector: SelectorType.LOCATION,
                    selectorKey: 'location',
                    template:
                      '<div class="contact"><span class="contact__icon"><i class="fa-solid fa-location-dot"></i></span>{{ location }}</div>',
                    children: [],
                  },
                ],
              },
              {
                type: SectionType.LIST,
                classes: {
                  root: '',
                  content: 'section__content--column',
                },
                dimension: initDimension(),
                children: [
                  {
                    type: SectionType.CONTENT,
                    classes: emptyClasses(),
                    dimension: initDimension(),
                    selector: SelectorType.NONE,
                    template:
                      '<div class="header header--social"><div class="header__title">SOCIAL</div><div class="header__divider"><div class="header-divider__container"><div class="header-divider__line header-divider__line--white"></div></div></div></div>',
                    children: [],
                  },
                  {
                    type: SectionType.LIST,
                    classes: {
                      root: '',
                      content: 'section__content--column',
                    },
                    dimension: initDimension(),
                    selector: SelectorType.SOCIAL_LIST,
                    children: [
                      {
                        type: SectionType.CONTENT,
                        classes: emptyClasses(),
                        dimension: initDimension(),
                        selector: SelectorType.SOCIAL,
                        selectorKey: 'social',
                        template:
                        '<div class="social"><div><span class="social__icon"><i class="{{ social.icon }}"></i></span>{{ social.name }}</div><a class="social__link" href=" {{ social.url }}"> {{ social.url }} </a></div>',
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
