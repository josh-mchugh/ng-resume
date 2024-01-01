import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import { SelectorType } from '@shared/state/resume.state';

export interface LayoutStateModel {
  sections: Array<SectionModel>;
}

export interface SectionModel {
  classes: SectionClasses;
  children: Array<SectionModel>;
  selectors: Selector[];
  template: string;
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

export interface Selector {
  type: SelectorType;
  key: string;
}

@State<LayoutStateModel>({
  name: 'layout',
  defaults: {
    sections: [
      {
        classes: emptyClasses(),
        selectors: [],
        template: '',
        children: [
          {
            classes: {
              root: 'section--column-left',
              content: 'section__content--column',
            },
            selectors: [],
            template: '',
            children: [
              {
                classes: {
                  root: '',
                  content: 'section__content--column',
                },
                selectors: [],
                template: '',
                children: [
                  {
                    classes: emptyClasses(),
                    selectors: [
                      {
                        type: SelectorType.NAME,
                        key: 'name',
                      },
                    ],
                    template: '<div class="name">{{ name }}</div>',
                    children: [],
                  },
                  {
                    classes: emptyClasses(),
                    selectors: [
                      {
                        type: SelectorType.TITLE,
                        key: 'title',
                      },
                    ],
                    template: '<div class="title">{{ title }}</div>',
                    children: [],
                  },
                ],
              },
              {
                classes: {
                  root: '',
                  content: 'section__content--column',
                },
                selectors: [],
                template: '',
                children: [
                  {
                    classes: emptyClasses(),
                    selectors: [],
                    template:
                      '<div class="header header--summary"><div class="header__title">SUMMARY</div><div class="header__divider"><div class="header-divider__container"><div class="header-divider__line header-divider__line--white"></div></div></div></div>',
                    children: [],
                  },
                  {
                    classes: emptyClasses(),
                    selectors: [
                      {
                        type: SelectorType.SUMMARY,
                        key: 'summary',
                      },
                    ],
                    template: '<div class="summary">{{ summary }}</div>',
                    children: [],
                  },
                ],
              },
              {
                classes: {
                  root: '',
                  content: 'section__content--column',
                },
                selectors: [],
                template: '',
                children: [
                  {
                    classes: emptyClasses(),
                    selectors: [],
                    template:
                      '<div class="header header--contact"><div class="header__title">CONTACT</div><div class="header__divider"><div class="header-divider__container"><div class="header-divider__line header-divider__line--white"></div></div></div></div>',
                    children: [],
                  },
                  {
                    classes: emptyClasses(),
                    selectors: [
                      {
                        type: SelectorType.PHONE,
                        key: 'phone',
                      },
                    ],
                    template:
                      '<div class="contact contact--first"><span class="contact__icon"><i class="fa-solid fa-phone"></i></span>{{ phone }}</div>',
                    children: [],
                  },
                  {
                    classes: emptyClasses(),
                    selectors: [
                      {
                        type: SelectorType.EMAIL,
                        key: 'email',
                      },
                    ],
                    template:
                      '<div class="contact"><span class="contact__icon"><i class="fa-solid fa-envelope"></i></span>{{ email }}</div>',
                    children: [],
                  },
                  {
                    classes: emptyClasses(),
                    selectors: [
                      {
                        type: SelectorType.LOCATION,
                        key: 'location',
                      },
                    ],
                    template:
                      '<div class="contact"><span class="contact__icon"><i class="fa-solid fa-location-dot"></i></span>{{ location }}</div>',
                    children: [],
                  },
                ],
              },
              {
                classes: {
                  root: '',
                  content: 'section__content--column',
                },
                selectors: [],
                template: '',
                children: [
                  {
                    classes: emptyClasses(),
                    selectors: [],
                    template:
                      '<div class="header header--social"><div class="header__title">SOCIAL</div><div class="header__divider"><div class="header-divider__container"><div class="header-divider__line header-divider__line--white"></div></div></div></div>',
                    children: [],
                  },
                  {
                    classes: {
                      root: '',
                      content: 'section__content--column',
                    },
                    selectors: [
                      {
                        type: SelectorType.SOCIAL_LIST,
                        key: '',
                      },
                    ],
                    template: '',
                    children: [
                      {
                        classes: emptyClasses(),
                        selectors: [
                          {
                            type: SelectorType.SOCIAL_NAME,
                            key: 'name',
                          },
                          {
                            type: SelectorType.SOCIAL_ICON,
                            key: 'icon',
                          },
                          {
                            type: SelectorType.SOCIAL_URL,
                            key: 'url',
                          },
                        ],
                        template:
                          '<div class="social"><div><span class="social__icon"><i class="{{ icon }}"></i></span>{{ name }}</div><a class="social__link" href=" {{ url }}"> {{ url }} </a></div>',
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            classes: {
              root: 'section--column-right',
              content: 'section__content--column',
            },
            selectors: [],
            template: '',
            children: [
              {
                classes: {
                  root: '',
                  content: 'section__content--column',
                },
                selectors: [],
                template: '',
                children: [
                  {
                    classes: emptyClasses(),
                    selectors: [],
                    template:
                      '<div class="header header--experience"><div class="header__title">WORK EXPERIENCE</div><div class="header__divider"><div class="header-divider__container"><div class="header-divider__line"></div></div></div></div>',
                    children: [],
                  },
                  {
                    classes: {
                      root: '',
                      content: 'section__content--column',
                    },
                    selectors: [
                      {
                        type: SelectorType.EXPERIENCE_LIST,
                        key: '',
                      },
                    ],
                    template: '',
                    children: [
                      {
                        classes: emptyClasses(),
                        selectors: [
                          {
                            type: SelectorType.EXPERIENCE_TITLE,
                            key: 'title',
                          },
                          {
                            type: SelectorType.EXPERIENCE_DURATION,
                            key: 'duration',
                          },
                        ],
                        template:
                          '<div class="experience-position"><div class="experience-position__title">{{ title }}</div><div>{{ duration }}</div></div>',
                        children: [],
                      },
                      {
                        classes: emptyClasses(),
                        selectors: [
                          {
                            type: SelectorType.EXPERIENCE_ORGANIZATION,
                            key: 'organization',
                          },
                          {
                            type: SelectorType.EXPERIENCE_LOCATION,
                            key: 'location',
                          },
                        ],
                        template:
                          '<div class="experience-organization"><div>{{ organization }}</div><div>{{ location }}</div></div>',
                        children: [],
                      },
                      {
                        classes: {
                          root: '',
                          content: 'section__content--column',
                        },
                        selectors: [
                          {
                            type: SelectorType.EXPERIENCE_DESCRIPTION_LIST,
                            key: '',
                          },
                        ],
                        template: '',
                        children: [
                          {
                            classes: emptyClasses(),
                            selectors: [
                              {
                                type: SelectorType.EXPERIENCE_DESCRIPTION,
                                key: 'description',
                              },
                            ],
                            template:
                              '<div class="experience-description"><span class="experience-description__icon"><i class="fa-solid fa-chevron-right"></i></span>{{ description }}</div>',
                            children: [],
                          },
                        ],
                      },
                      {
                        classes: {
                          root: '',
                          content: 'section__content--wrap',
                        },
                        selectors: [
                          {
                            type: SelectorType.EXPERIENCE_SKILL_LIST,
                            key: '',
                          },
                        ],
                        template: '',
                        children: [
                          {
                            classes: {
                              root: 'section--w-auto',
                              content: '',
                            },
                            selectors: [
                              {
                                type: SelectorType.EXPERIENCE_SKILL,
                                key: 'skill',
                              },
                            ],
                            template:
                              '<div class="experience-skill">{{ skill }}</div>',
                            children: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                classes: {
                  root: '',
                  content: 'section__content--column',
                },
                selectors: [],
                template: '',
                children: [
                  {
                    classes: emptyClasses(),
                    selectors: [],
                    template:
                      '<div class="header header--skill"><div class="header__title">PROFESSIONAL SKILLS</div><div class="header__divider"><div class="header-divider__container"><div class="header-divider__line"></div></div></div></div>',
                    children: [],
                  },
                  {
                    classes: {
                      root: '',
                      content: 'section__content--wrap',
                    },
                    selectors: [
                      {
                        type: SelectorType.SKILL_LIST,
                        key: '',
                      },
                    ],
                    template: '',
                    children: [
                      {
                        classes: {
                          root: 'section--w-50',
                          content: '',
                        },
                        selectors: [
                          {
                            type: SelectorType.SKILL_NAME,
                            key: 'name',
                          },
                          {
                            type: SelectorType.SKILL_BLOCKS,
                            key: 'blocks',
                          },
                        ],
                        template:
                          '<div class="skill"><div>{{ name }}</div><div class="skill__gauge">{{ #blocks }}<div class="gauge-block {{ #active }} gauge-block--active {{ /active }}"></div>{{ /blocks }}</div>',
                        children: [],
                      },
                    ],
                  },
                ],
              },
              {
                classes: {
                  root: '',
                  content: 'section__content--column',
                },
                selectors: [],
                template: '',
                children: [
                  {
                    classes: emptyClasses(),
                    selectors: [],
                    template:
                      '<div class="header header--certification"><div class="header__title">EDUCATION</div><div class="header__divider"><div class="header-divider__container"><div class="header-divider__line"></div></div></div></div>',
                    children: [],
                  },
                  {
                    classes: {
                      root: '',
                      content: 'section__content--column',
                    },
                    selectors: [
                      {
                        type: SelectorType.CERTIFICATION_LIST,
                        key: '',
                      },
                    ],
                    template: '',
                    children: [
                      {
                        classes: emptyClasses(),
                        selectors: [
                          {
                            type: SelectorType.CERTIFICATION_TITLE,
                            key: 'title',
                          },
                          {
                            type: SelectorType.CERTIFICATION_YEAR,
                            key: 'year',
                          },
                        ],
                        template:
                          '<div class="certification-degree"><div class="certification-degree__title">{{ title }}</div><div>{{ year }}</div></div>',
                        children: [],
                      },
                      {
                        classes: emptyClasses(),
                        selectors: [
                          {
                            type: SelectorType.CERTIFICATION_ORGANIZATION,
                            key: 'organization',
                          },
                          {
                            type: SelectorType.CERTIFICATION_LOCATION,
                            key: 'location',
                          },
                        ],
                        template:
                          '<div class="certification-organization"><div>{{ organization }}</div><div>{{ location }}</div></div>',
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
