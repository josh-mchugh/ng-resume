import { NodeType, NodeDataType } from '@shared/state/layout.interface';
import { SelectorType } from '@shared/state/selector-type.enum';

export class LayoutStateConfig {
  public static readonly DEFAULT = {
    byId: {},
    allIds: [],
  };

  public static readonly DEMO = {
  byId: {
    '0': {
      id: '0',
      parentId: '',
      name: 'Row Section',
      type: NodeType.CONTAINER,
      dataType: NodeDataType.STATIC,
      classes: {
        root: '',
        content: '',
      },
      selectors: [],
      template: '',
    },
    '0,0': {
      id: '0,0',
      parentId: '0',
      name: 'Left Column Section',
      type: NodeType.CONTAINER,
      dataType: NodeDataType.STATIC,
      classes: {
        root: 'section--column-left',
        content: 'section__content--column',
      },
      selectors: [],
      template: '',
    },
    '0,0,0': {
      id: '0,0,0',
      parentId: '0,0',
      name: 'Name & Title Section',
      type: NodeType.CONTAINER,
      dataType: NodeDataType.STATIC,
      classes: {
        root: '',
        content: 'section__content--column',
      },
      selectors: [],
      template: '',
    },
    '0,0,0,0': {
      id: '0,0,0,0',
      parentId: '0,0,0',
      name: 'Name Template',
      type: NodeType.CONTENT,
      dataType: NodeDataType.DYNAMIC,
      classes: {
        root: '',
        content: '',
      },
      selectors: [
        {
          type: SelectorType.NAME,
          key: 'name',
        },
      ],
      template: '<div class="name">{{ name }}</div>',
    },
    '0,0,0,1': {
      id: '0,0,0,1',
      parentId: '0,0,0',
      name: 'Title Template',
      type: NodeType.CONTENT,
      dataType: NodeDataType.DYNAMIC,
      classes: {
        root: '',
        content: '',
      },
      selectors: [
        {
          type: SelectorType.TITLE,
          key: 'title',
        },
      ],
      template: '<div class="title">{{ title }}</div>',
    },
    '0,0,1': {
      id: '0,0,1',
      parentId: '0,0',
      type: NodeType.CONTAINER,
      dataType: NodeDataType.STATIC,
      name: 'Summary Section',
      classes: {
        root: '',
        content: 'section__content--column',
      },
      selectors: [],
      template: '',
    },
    '0,0,1,0': {
      id: '0,0,1,0',
      parentId: '0,0,1',
      name: 'Summary Header Template',
      type: NodeType.CONTENT,
      dataType: NodeDataType.STATIC,
      classes: {
        root: '',
        content: '',
      },
      selectors: [],
      template:
        '<div class="header header--summary"><div class="header__title">SUMMARY</div><div class="header__divider"><div class="header-divider__container"><div class="header-divider__line header-divider__line--white"></div></div></div></div>',
    },
    '0,0,1,1': {
      id: '0,0,1,1',
      parentId: '0,0,1',
      name: 'Summary Template',
      type: NodeType.CONTENT,
      dataType: NodeDataType.DYNAMIC,
      classes: {
        root: '',
        content: '',
      },
      selectors: [
        {
          type: SelectorType.SUMMARY,
          key: 'summary',
        },
      ],
      template: '<div class="summary">{{ summary }}</div>',
    },
    '0,0,2': {
      id: '0,0,2',
      parentId: '0,0',
      name: 'Contact Section',
      type: NodeType.CONTAINER,
      dataType: NodeDataType.STATIC,
      classes: {
        root: '',
        content: 'section__content--column',
      },
      selectors: [],
      template: '',
    },
    '0,0,2,0': {
      id: '0,0,2,0',
      parentId: '0,0,2',
      name: 'Contact Header Template',
      type: NodeType.CONTENT,
      dataType: NodeDataType.STATIC,
      classes: {
        root: '',
        content: '',
      },
      selectors: [],
      template:
        '<div class="header header--contact"><div class="header__title">CONTACT</div><div class="header__divider"><div class="header-divider__container"><div class="header-divider__line header-divider__line--white"></div></div></div></div>',
    },
    '0,0,2,1': {
      id: '0,0,2,1',
      parentId: '0,0,2',
      type: NodeType.CONTENT,
      dataType: NodeDataType.DYNAMIC,
      name: 'Contact Phone Template',
      classes: {
        root: '',
        content: '',
      },
      selectors: [
        {
          type: SelectorType.PHONE,
          key: 'phone',
        },
      ],
      template:
        '<div class="contact contact--first"><span class="contact__icon"><i class="fa-solid fa-phone"></i></span>{{ phone }}</div>',
    },
    '0,0,2,2': {
      id: '0,0,2,2',
      parentId: '0,0,2',
      name: 'Contact Email Template',
      type: NodeType.CONTENT,
      dataType: NodeDataType.DYNAMIC,
      classes: {
        root: '',
        content: '',
      },
      selectors: [
        {
          type: SelectorType.EMAIL,
          key: 'email',
        },
      ],
      template:
        '<div class="contact"><span class="contact__icon"><i class="fa-solid fa-envelope"></i></span>{{ email }}</div>',
    },
    '0,0,2,3': {
      id: '0,0,2,3',
      parentId: '0,0,2',
      type: NodeType.CONTENT,
      dataType: NodeDataType.DYNAMIC,
      name: 'Contact Location Template',
      classes: {
        root: '',
        content: '',
      },
      selectors: [
        {
          type: SelectorType.LOCATION,
          key: 'location',
        },
      ],
      template:
        '<div class="contact"><span class="contact__icon"><i class="fa-solid fa-location-dot"></i></span>{{ location }}</div>',
    },
    '0,0,3': {
      id: '0,0,3',
      parentId: '0,0',
      type: NodeType.CONTAINER,
      dataType: NodeDataType.STATIC,
      name: 'Social Section',
      classes: {
        root: '',
        content: 'section__content--column',
      },
      selectors: [],
      template: '',
    },
    '0,0,3,0': {
      id: '0,0,3,0',
      parentId: '0,0,3',
      name: 'Social Header Template',
      type: NodeType.CONTENT,
      dataType: NodeDataType.STATIC,
      classes: {
        root: '',
        content: '',
      },
      selectors: [],
      template:
        '<div class="header header--social"><div class="header__title">SOCIAL</div><div class="header__divider"><div class="header-divider__container"><div class="header-divider__line header-divider__line--white"></div></div></div></div>',
    },
    '0,0,3,1': {
      id: '0,0,3,1',
      parentId: '0,0,3',
      name: 'Socials List Section',
      type: NodeType.CONTAINER,
      dataType: NodeDataType.DYNAMIC,
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
    },
    '0,0,3,1,0': {
      id: '0,0,3,1,0',
      parentId: '0,0,3,1',
      name: 'Social Template',
      type: NodeType.CONTENT,
      dataType: NodeDataType.DYNAMIC,
      classes: {
        root: '',
        content: '',
      },
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
    },
    '0,1': {
      id: '0,1',
      parentId: '0',
      name: 'Right Column Section',
      type: NodeType.CONTAINER,
      dataType: NodeDataType.STATIC,
      classes: {
        root: 'section--column-right',
        content: 'section__content--column',
      },
      selectors: [],
      template: '',
    },
    '0,1,0': {
      id: '0,1,0',
      parentId: '0,1',
      name: 'Experience Section',
      type: NodeType.CONTAINER,
      dataType: NodeDataType.STATIC,
      classes: {
        root: '',
        content: 'section__content--column',
      },
      selectors: [],
      template: '',
    },
    '0,1,0,0': {
      id: '0,1,0,0',
      parentId: '0,1,0',
      name: 'Experience Header Template',
      type: NodeType.CONTENT,
      dataType: NodeDataType.STATIC,
      classes: {
        root: '',
        content: '',
      },
      selectors: [],
      template:
        '<div class="header header--experience"><div class="header__title">WORK EXPERIENCE</div><div class="header__divider"><div class="header-divider__container"><div class="header-divider__line"></div></div></div></div>',
    },
    '0,1,0,1': {
      id: '0,1,0,1',
      parentId: '0,1,0',
      name: 'Experience List Section',
      type: NodeType.CONTAINER,
      dataType: NodeDataType.DYNAMIC,
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
    },
    '0,1,0,1,0': {
      id: '0,1,0,1,0',
      parentId: '0,1,0,1',
      name: 'Experience Position Template',
      type: NodeType.CONTENT,
      dataType: NodeDataType.DYNAMIC,
      classes: {
        root: '',
        content: '',
      },
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
    },
    '0,1,0,1,1': {
      id: '0,1,0,1,1',
      parentId: '0,1,0,1',
      name: 'Experience Organization Template',
      type: NodeType.CONTENT,
      dataType: NodeDataType.DYNAMIC,
      classes: {
        root: '',
        content: '',
      },
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
    },
    '0,1,0,1,2': {
      id: '0,1,0,1,2',
      parentId: '0,1,0,1',
      name: 'Experience Description Section',
      type: NodeType.CONTAINER,
      dataType: NodeDataType.DYNAMIC,
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
    },
    '0,1,0,1,2,0': {
      id: '0,1,0,1,2,0',
      parentId: '0,1,0,1,2',
      name: 'Experience Description',
      type: NodeType.CONTENT,
      dataType: NodeDataType.DYNAMIC,
      classes: {
        root: '',
        content: '',
      },
      selectors: [
        {
          type: SelectorType.EXPERIENCE_DESCRIPTION,
          key: 'description',
        },
      ],
      template:
        '<div class="experience-description"><span class="experience-description__icon"><i class="fa-solid fa-chevron-right"></i></span>{{ description }}</div>',
    },
    '0,1,0,1,3': {
      id: '0,1,0,1,3',
      parentId: '0,1,0,1',
      name: 'Experience Skill Section',
      type: NodeType.CONTAINER,
      dataType: NodeDataType.DYNAMIC,
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
    },
    '0,1,0,1,3,0': {
      id: '0,1,0,1,3,0',
      parentId: '0,1,0,1,3',
      name: 'Experience Skill',
      type: NodeType.CONTENT,
      dataType: NodeDataType.DYNAMIC,
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
      template: '<div class="experience-skill">{{ skill }}</div>',
    },
    '0,1,1': {
      id: '0,1,1',
      parentId: '0,1',
      name: 'Skill Section',
      type: NodeType.CONTAINER,
      dataType: NodeDataType.STATIC,
      classes: {
        root: '',
        content: 'section__content--column',
      },
      selectors: [],
      template: '',
    },
    '0,1,1,0': {
      id: '0,1,1,0',
      parentId: '0,1,1',
      name: 'Skill Header Template',
      type: NodeType.CONTENT,
      dataType: NodeDataType.STATIC,
      classes: {
        root: '',
        content: '',
      },
      selectors: [],
      template:
        '<div class="header header--skill"><div class="header__title">PROFESSIONAL SKILLS</div><div class="header__divider"><div class="header-divider__container"><div class="header-divider__line"></div></div></div></div>',
    },
    '0,1,1,1': {
      id: '0,1,1,1',
      parentId: '0,1,1',
      name: 'Skill List Section',
      type: NodeType.CONTAINER,
      dataType: NodeDataType.DYNAMIC,
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
    },
    '0,1,1,1,0': {
      id: '0,1,1,1,0',
      parentId: '0,1,1,1',
      name: 'Skill Template',
      type: NodeType.CONTENT,
      dataType: NodeDataType.DYNAMIC,
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
    },
    '0,1,2': {
      id: '0,1,2',
      parentId: '0,1',
      name: 'Certification Section',
      type: NodeType.CONTAINER,
      dataType: NodeDataType.STATIC,
      classes: {
        root: '',
        content: 'section__content--column',
      },
      selectors: [],
      template: '',
    },
    '0,1,2,0': {
      id: '0,1,2,0',
      parentId: '0,1,2',
      name: 'Certification Header Template',
      type: NodeType.CONTENT,
      dataType: NodeDataType.STATIC,
      classes: {
        root: '',
        content: '',
      },
      selectors: [],
      template:
        '<div class="header header--certification"><div class="header__title">EDUCATION</div><div class="header__divider"><div class="header-divider__container"><div class="header-divider__line"></div></div></div></div>',
    },
    '0,1,2,1': {
      id: '0,1,2,1',
      parentId: '0,1,2',
      name: 'Certification List Section',
      type: NodeType.CONTAINER,
      dataType: NodeDataType.DYNAMIC,
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
    },
    '0,1,2,1,0': {
      id: '0,1,2,1,0',
      parentId: '0,1,2,1',
      name: 'Certification Degree Template',
      type: NodeType.CONTENT,
      dataType: NodeDataType.DYNAMIC,
      classes: {
        root: '',
        content: '',
      },
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
    },
    '0,1,2,1,1': {
      id: '0,1,2,1,1',
      parentId: '0,1,2,1',
      name: 'Certification Organization Template',
      type: NodeType.CONTENT,
      dataType: NodeDataType.DYNAMIC,
      classes: {
        root: '',
        content: '',
      },
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
    },
  },
  allIds: [
    '0',
    '0,0',
    '0,0,0',
    '0,0,0,0',
    '0,0,0,1',
    '0,0,1',
    '0,0,1,0',
    '0,0,1,1',
    '0,0,2',
    '0,0,2,0',
    '0,0,2,1',
    '0,0,2,2',
    '0,0,2,3',
    '0,0,3',
    '0,0,3,0',
    '0,0,3,1',
    '0,0,3,1,0',
    '0,1',
    '0,1,0',
    '0,1,0,0',
    '0,1,0,1',
    '0,1,0,1,0',
    '0,1,0,1,1',
    '0,1,0,1,2',
    '0,1,0,1,2,0',
    '0,1,0,1,3',
    '0,1,0,1,3,0',
    '0,1,1',
    '0,1,1,0',
    '0,1,1,1',
    '0,1,1,1,0',
    '0,1,2',
    '0,1,2,0',
    '0,1,2,1',
    '0,1,2,1,0',
    '0,1,2,1,1',
  ],
};

}
