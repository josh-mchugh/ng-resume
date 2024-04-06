import { SelectorType } from '@resume/selector-type.enum';

export class ResumeStateConfig {
  public static readonly DEFAULT = {
    byId: {},
    allIds: [],
    byType: {
      NAME: [],
      TITLE: [],
      SUMMARY: [],
      EMAIL: [],
      PHONE: [],
      LOCATION: [],
      SOCIAL_NAME: [],
      SOCIAL_ICON: [],
      SOCIAL_URL: [],
      EXPERIENCE_ORGANIZATION: [],
      EXPERIENCE_TITLE: [],
      EXPERIENCE_DURATION: [],
      EXPERIENCE_SKILL: [],
    },
    experiences: {},
    experienceDescriptions: {},
    experienceSkills: {},
    skills: {},
    certifications: {},
  };

  public static readonly DEMO = {
    byId: {
      cGOn1Z: {
        id: 'cGOn1Z',
        groupId: '',
        groupPosition: 0,
        type: SelectorType.NAME,
        position: 0,
        value: 'John Doe',
      },
      ImxJzl: {
        id: 'ImxJzl',
        groupId: '',
        groupPosition: 0,
        type: SelectorType.TITLE,
        position: 0,
        value: 'Web and Graphic Designer',
      },
      yklt7L: {
        id: 'yklt7L',
        groupId: '',
        groupPosition: 0,
        type: SelectorType.SUMMARY,
        position: 0,
        value:
          'Rock Star/Ninja can you ballpark the cost per unit for me, for touch base disband the squad but rehydrate as needed sacred cow.',
      },
      QHVCZE: {
        id: 'QHVCZE',
        groupId: '',
        groupPosition: 0,
        type: SelectorType.EMAIL,
        position: 0,
        value: 'info@youremail.com',
      },
      '9fpoXz': {
        id: '9fpoXz',
        groupId: '',
        groupPosition: 0,
        type: SelectorType.PHONE,
        position: 0,
        value: '(123) 456-8899',
      },
      '56FXgD': {
        id: '56FXgD',
        groupId: '',
        groupPosition: 0,
        type: SelectorType.LOCATION,
        position: 0,
        value: 'New York, New York',
      },
      bSWNcA: {
        id: 'bSWNcA',
        groupId: 'hPjgs6',
        groupPosition: 0,
        type: SelectorType.SOCIAL_NAME,
        position: 0,
        value: 'Facebook',
      },
      TKGmg8: {
        id: 'TKGmg8',
        groupId: 'hPjgs6',
        groupPosition: 0,
        type: SelectorType.SOCIAL_ICON,
        position: 0,
        value: 'fa-brands fa-facebook',
      },
      QzaUKU: {
        id: 'QzaUKU',
        groupId: 'hPjgs6',
        groupPosition: 0,
        type: SelectorType.SOCIAL_URL,
        position: 0,
        value: 'https://facebook.com/profile',
      },
      NSKVRu: {
        id: 'NSKVRu',
        groupId: 'TKGmg8',
        groupPosition: 1,
        type: SelectorType.SOCIAL_NAME,
        position: 0,
        value: 'Twitter',
      },
      '3ClFV3': {
        id: '3ClFV3',
        groupId: 'TKGmg8',
        groupPosition: 1,
        type: SelectorType.SOCIAL_ICON,
        position: 0,
        value: 'fa-brands fa-twitter',
      },
      kZQ0D0: {
        id: 'kZQ0D0',
        groupId: 'TKGmg8',
        groupPosition: 1,
        type: SelectorType.SOCIAL_URL,
        position: 0,
        value: 'https://twitter.com/profile',
      },
      nyHCys: {
        id: 'nyHCys',
        groupId: 'Yle4N7',
        groupPosition: 2,
        type: SelectorType.SOCIAL_NAME,
        position: 0,
        value: 'LinkedIn',
      },
      EevRIX: {
        id: 'EevRIX',
        groupId: 'Yle4N7',
        groupPosition: 2,
        type: SelectorType.SOCIAL_ICON,
        position: 0,
        value: 'fa-brands fa-linkedin',
      },
      PdFyKt: {
        id: 'PdFyKt',
        groupId: 'Yle4N7',
        groupPosition: 2,
        type: SelectorType.SOCIAL_URL,
        position: 0,
        value: 'https://linkedin.com/profile',
      },
      mHqQo5: {
        id: 'mHqQo5',
        groupId: 'sxvDST',
        groupPosition: 0,
        type: SelectorType.EXPERIENCE_ORGANIZATION,
        position: 0,
        value: 'Cyberdyne System Corp.',
      },
      woPRPF: {
        id: 'woPRPF',
        groupId: 'sxvDST',
        groupPosition: 0,
        type: SelectorType.EXPERIENCE_TITLE,
        position: 0,
        value: 'Web Developer',
      },
      D63MSQ: {
        id: 'D63MSQ',
        groupId: 'sxvDST',
        groupPosition: 0,
        type: SelectorType.EXPERIENCE_DURATION,
        position: 0,
        value: 'Jan 2023 - Present',
      },
      xSdMqL: {
        id: 'xSdMqL',
        groupId: 'sxvDST',
        groupPosition: 0,
        type: SelectorType.EXPERIENCE_LOCATION,
        position: 0,
        value: 'Remote',
      },
      Oq1IQ6: {
        id: 'Oq1IQ6',
        groupId: 'sxvDST',
        groupPosition: 0,
        type: SelectorType.EXPERIENCE_DESCRIPTION,
        position: 0,
        value:
          'Efficiently unleash cross-media information without cross-media value.',
      },
      IH2cXf: {
        id: 'IH2cXf',
        groupId: 'sxvDST',
        groupPosition: 0,
        type: SelectorType.EXPERIENCE_DESCRIPTION,
        position: 1,
        value:
          'Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar solutions without functional solutions.',
      },
      ac3Y3g: {
        id: 'ac3Y3g',
        groupId: 'sxvDST',
        groupPosition: 0,
        type: SelectorType.EXPERIENCE_DESCRIPTION,
        position: 2,
        value:
          'Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas',
      },
      CNLcFh: {
        id: 'CNLcFh',
        groupId: 'sxvDST',
        groupPosition: 0,
        type: SelectorType.EXPERIENCE_DESCRIPTION,
        position: 3,
        value:
          'Ladder back to the strategy we need evergreen content blue money synergize productive mindfulness.',
      },
      Ov20bL: {
        id: 'Ov20bL',
        groupId: 'sxvDST',
        groupPosition: 0,
        type: SelectorType.EXPERIENCE_DESCRIPTION,
        position: 4,
        value: 'Paradigm shift land it in region, design thinking.',
      },
      Z4AfFQ: {
        id: 'Z4AfFQ',
        groupId: 'sxvDST',
        groupPosition: 0,
        type: SelectorType.EXPERIENCE_SKILL,
        position: 0,
        value: 'Photoshop',
      },
      xuLMPb: {
        id: 'xuLMPb',
        groupId: 'sxvDST',
        groupPosition: 0,
        type: SelectorType.EXPERIENCE_SKILL,
        position: 1,
        value: 'HTML',
      },
      YXlaIx: {
        id: 'YXlaIx',
        groupId: 'sxvDST',
        groupPosition: 0,
        type: SelectorType.EXPERIENCE_SKILL,
        position: 2,
        value: 'CSS',
      },
      cuAGAQ: {
        id: 'cuAGAQ',
        groupId: 'sxvDST',
        groupPosition: 0,
        type: SelectorType.EXPERIENCE_SKILL,
        position: 3,
        value: 'Illustrator',
      },
      tFxwhP: {
        id: 'tFxwhP',
        groupId: 'sxvDST',
        groupPosition: 0,
        type: SelectorType.EXPERIENCE_SKILL,
        position: 4,
        value: 'PHP',
      },
      tzXZQe: {
        id: 'tzXZQe',
        groupId: 'sxvDST',
        groupPosition: 0,
        type: SelectorType.EXPERIENCE_SKILL,
        position: 5,
        value: 'JavaScript',
      },
      xvvZMK: {
        id: 'xvvZMK',
        groupId: '6qowVm',
        groupPosition: 1,
        type: SelectorType.EXPERIENCE_ORGANIZATION,
        position: 0,
        value: 'Very Big Corp. of America',
      },
      xaQQXi: {
        id: 'xaQQXi',
        groupId: '6qowVm',
        groupPosition: 1,
        type: SelectorType.EXPERIENCE_TITLE,
        position: 0,
        value: 'User Experience Expert',
      },
      JOpOqX: {
        id: 'JOpOqX',
        groupId: '6qowVm',
        groupPosition: 1,
        type: SelectorType.EXPERIENCE_DURATION,
        position: 0,
        value: 'Jan 2022 – Dec 2022',
      },
      '4GajzB': {
        id: '4GajzB',
        groupId: '6qowVm',
        groupPosition: 1,
        type: SelectorType.EXPERIENCE_LOCATION,
        position: 0,
        value: 'Remote',
      },
      CWPe8V: {
        id: 'CWPe8V',
        groupId: '6qowVm',
        groupPosition: 1,
        type: SelectorType.EXPERIENCE_DESCRIPTION,
        position: 0,
        value:
          'Collaboratively administrate empowered markets via plug-and-play networks.',
      },
      et6YYy: {
        id: 'et6YYy',
        groupId: '6qowVm',
        groupPosition: 1,
        type: SelectorType.EXPERIENCE_DESCRIPTION,
        position: 1,
        value:
          'Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI.',
      },
      Af1Gpd: {
        id: 'Af1Gpd',
        groupId: '6qowVm',
        groupPosition: 1,
        type: SelectorType.EXPERIENCE_DESCRIPTION,
        position: 2,
        value:
          'Pursue scalable customer service through sustainable potentialities.',
      },
      HQAfhi: {
        id: 'HQAfhi',
        groupId: '6qowVm',
        groupPosition: 1,
        type: SelectorType.EXPERIENCE_DESCRIPTION,
        position: 3,
        value:
          'Draft policy ppml proposal tiger team, or face time are we in agreeance.',
      },
      hb34AN: {
        id: 'hb34AN',
        groupId: '6qowVm',
        groupPosition: 1,
        type: SelectorType.EXPERIENCE_SKILL,
        position: 0,
        value: 'Typography',
      },
      GXivPT: {
        id: 'GXivPT',
        groupId: '6qowVm',
        groupPosition: 1,
        type: SelectorType.EXPERIENCE_SKILL,
        position: 1,
        value: 'Composition',
      },
      VAdl0u: {
        id: 'VAdl0u',
        groupId: '6qowVm',
        groupPosition: 1,
        type: SelectorType.EXPERIENCE_SKILL,
        position: 2,
        value: 'Color Theory',
      },
      q4UGVi: {
        id: 'q4UGVi',
        groupId: '6qowVm',
        groupPosition: 1,
        type: SelectorType.EXPERIENCE_SKILL,
        position: 3,
        value: 'Design',
      },
      gpuzzS: {
        id: 'gpuzzS',
        groupId: '6qowVm',
        groupPosition: 1,
        type: SelectorType.EXPERIENCE_SKILL,
        position: 4,
        value: 'CMS',
      },
      '9CMYf2': {
        id: '9CMYf2',
        groupId: '6qowVm',
        groupPosition: 1,
        type: SelectorType.EXPERIENCE_SKILL,
        position: 5,
        value: 'UX',
      },
      Od930N: {
        id: 'Od930N',
        groupId: '6qowVm',
        groupPosition: 1,
        type: SelectorType.EXPERIENCE_SKILL,
        position: 6,
        value: 'Graphic Design',
      },
      iuqlt6: {
        id: 'iuqlt6',
        groupId: 'By81yN',
        groupPosition: 2,
        type: SelectorType.EXPERIENCE_ORGANIZATION,
        position: 0,
        value: 'MomCorp',
      },
      g8g11w: {
        id: 'g8g11w',
        groupId: 'By81yN',
        groupPosition: 2,
        type: SelectorType.EXPERIENCE_TITLE,
        position: 0,
        value: 'Database Developer',
      },
      '5knyWV': {
        id: '5knyWV',
        groupId: 'By81yN',
        groupPosition: 2,
        type: SelectorType.EXPERIENCE_DURATION,
        position: 0,
        value: 'Jan 2021 – Dec 2021',
      },
      '7QKmCX': {
        id: '7QKmCX',
        groupId: 'By81yN',
        groupPosition: 2,
        type: SelectorType.EXPERIENCE_LOCATION,
        position: 0,
        value: 'Remote',
      },
      vq87P2: {
        id: 'vq87P2',
        groupId: 'By81yN',
        groupPosition: 2,
        type: SelectorType.EXPERIENCE_DESCRIPTION,
        position: 0,
        value:
          'Phosfluorescently engage worldwide methodologies with web-enabled technology. Interactively coordinate proactive e-commerce.',
      },
      '87cdhd': {
        id: '87cdhd',
        groupId: 'By81yN',
        groupPosition: 2,
        type: SelectorType.EXPERIENCE_DESCRIPTION,
        position: 1,
        value:
          'Envisioned multimedia based expertise and cross-media growth strategies.',
      },
      '7VRrjV': {
        id: '7VRrjV',
        groupId: 'By81yN',
        groupPosition: 2,
        type: SelectorType.EXPERIENCE_DESCRIPTION,
        position: 2,
        value:
          'Synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.',
      },
      oHfWhn: {
        id: 'oHfWhn',
        groupId: 'By81yN',
        groupPosition: 2,
        type: SelectorType.EXPERIENCE_SKILL,
        position: 0,
        value: 'SQL',
      },
      '7zNOal': {
        id: '7zNOal',
        groupId: 'By81yN',
        groupPosition: 2,
        type: SelectorType.EXPERIENCE_SKILL,
        position: 1,
        value: 'NoSQL',
      },
      mxrRXZ: {
        id: 'mxrRXZ',
        groupId: 'By81yN',
        groupPosition: 2,
        type: SelectorType.EXPERIENCE_SKILL,
        position: 2,
        value: 'MySQL',
      },
      uaftXK: {
        id: 'uaftXK',
        groupId: 'By81yN',
        groupPosition: 2,
        type: SelectorType.EXPERIENCE_SKILL,
        position: 3,
        value: 'Postgres',
      },
      xHTzxU: {
        id: 'xHTzxU',
        groupId: 'By81yN',
        groupPosition: 2,
        type: SelectorType.EXPERIENCE_SKILL,
        position: 4,
        value: 'MongoDB',
      },
      bm0beF: {
        id: 'bm0beF',
        groupId: 'By81yN',
        groupPosition: 2,
        type: SelectorType.EXPERIENCE_SKILL,
        position: 5,
        value: 'Couchbase',
      },
      '24xuSH': {
        id: '24xuSH',
        groupId: 'cfuZQP',
        groupPosition: 3,
        type: SelectorType.EXPERIENCE_ORGANIZATION,
        position: 0,
        value: "O'Connell LLC",
      },
      FhMROM: {
        id: 'FhMROM',
        groupId: 'cfuZQP',
        groupPosition: 3,
        type: SelectorType.EXPERIENCE_TITLE,
        position: 0,
        value: 'Junior Engineer',
      },
      '3Zt1jU': {
        id: '3Zt1jU',
        groupId: 'cfuZQP',
        groupPosition: 3,
        type: SelectorType.EXPERIENCE_DURATION,
        position: 0,
        value: 'Jan 2020 - Dec 2020',
      },
      '4aihVC': {
        id: '4aihVC',
        groupId: 'cfuZQP',
        groupPosition: 3,
        type: SelectorType.EXPERIENCE_LOCATION,
        position: 0,
        value: 'Remote',
      },
      AvkEKp: {
        id: 'AvkEKp',
        groupId: 'cfuZQP',
        groupPosition: 3,
        type: SelectorType.EXPERIENCE_DESCRIPTION,
        position: 0,
        value:
          'Migrating and managing user accounts in Microsoft Office 365 and Exchange Online.',
      },
      iQdo3T: {
        id: 'iQdo3T',
        groupId: 'cfuZQP',
        groupPosition: 3,
        type: SelectorType.EXPERIENCE_DESCRIPTION,
        position: 1,
        value:
          'Creating and managing virtual machines for systems such as domain controllers and Active Directory Federation Services (ADFS) in Microsoft Windows Azure (IaaS).',
      },
      Ry2Nhk: {
        id: 'Ry2Nhk',
        groupId: 'cfuZQP',
        groupPosition: 3,
        type: SelectorType.EXPERIENCE_DESCRIPTION,
        position: 2,
        value:
          'Creating and managing storage in Microsoft Windows Azure (IaaS).',
      },
      piDAhU: {
        id: 'piDAhU',
        groupId: 'cfuZQP',
        groupPosition: 3,
        type: SelectorType.EXPERIENCE_DESCRIPTION,
        position: 3,
        value:
          'Installing and configuring StorSimple iSCSI cloud array (STaaS/BaaS).',
      },
      uwIZP3: {
        id: 'uwIZP3',
        groupId: 'cfuZQP',
        groupPosition: 3,
        type: SelectorType.EXPERIENCE_SKILL,
        position: 0,
        value: 'Active Directory',
      },
      w5f42s: {
        id: 'w5f42s',
        groupId: 'cfuZQP',
        groupPosition: 3,
        type: SelectorType.EXPERIENCE_SKILL,
        position: 1,
        value: 'VMWare',
      },
      F2wYOq: {
        id: 'F2wYOq',
        groupId: 'cfuZQP',
        groupPosition: 3,
        type: SelectorType.EXPERIENCE_SKILL,
        position: 2,
        value: 'PowerShell',
      },
      E5gPE0: {
        id: 'E5gPE0',
        groupId: 'cfuZQP',
        groupPosition: 3,
        type: SelectorType.EXPERIENCE_SKILL,
        position: 3,
        value: 'Office 365',
      },
      jTcVWu: {
        id: 'jTcVWu',
        groupId: 'JDi6zL',
        groupPosition: 4,
        type: SelectorType.EXPERIENCE_ORGANIZATION,
        position: 0,
        value: 'Turner Inc',
      },
      GNVHRV: {
        id: 'GNVHRV',
        groupId: 'JDi6zL',
        groupPosition: 4,
        type: SelectorType.EXPERIENCE_TITLE,
        position: 0,
        value: 'Information Services Liaison',
      },
      COnDfF: {
        id: 'COnDfF',
        groupId: 'JDi6zL',
        groupPosition: 4,
        type: SelectorType.EXPERIENCE_DURATION,
        position: 0,
        value: 'Jan 2019 - Dec 2019',
      },
      uWmqfg: {
        id: 'uWmqfg',
        groupId: 'JDi6zL',
        groupPosition: 4,
        type: SelectorType.EXPERIENCE_LOCATION,
        position: 0,
        value: 'Remote',
      },
      CadaeY: {
        id: 'CadaeY',
        groupId: 'JDi6zL',
        groupPosition: 4,
        type: SelectorType.EXPERIENCE_DESCRIPTION,
        position: 0,
        value:
          'Troubleshooting hardware and software problems over the telephone and through remote PC administration software.',
      },
      B6AloM: {
        id: 'B6AloM',
        groupId: 'JDi6zL',
        groupPosition: 4,
        type: SelectorType.EXPERIENCE_DESCRIPTION,
        position: 1,
        value:
          'Installing, configuring, and supporting McAfee anti-virus software on desktops.',
      },
      cZRgvl: {
        id: 'cZRgvl',
        groupId: 'JDi6zL',
        groupPosition: 4,
        type: SelectorType.EXPERIENCE_DESCRIPTION,
        position: 2,
        value:
          'Installing, configuring, and supporting BBars computer backup software.',
      },
      Uv0Q1M: {
        id: 'Uv0Q1M',
        groupId: 'JDi6zL',
        groupPosition: 4,
        type: SelectorType.EXPERIENCE_DESCRIPTION,
        position: 3,
        value:
          'Developing and maintaining websites on servers running Microsoft SharePoint Server and Internet Information Services (IIS).',
      },
      cYkQL7: {
        id: 'cYkQL7',
        groupId: 'JDi6zL',
        groupPosition: 4,
        type: SelectorType.EXPERIENCE_SKILL,
        position: 0,
        value: 'C++',
      },
      eni8JG: {
        id: 'eni8JG',
        groupId: 'JDi6zL',
        groupPosition: 4,
        type: SelectorType.EXPERIENCE_SKILL,
        position: 1,
        value: 'Java',
      },
      X34K8a: {
        id: 'X34K8a',
        groupId: 'JDi6zL',
        groupPosition: 4,
        type: SelectorType.EXPERIENCE_SKILL,
        position: 2,
        value: 'HTML',
      },
      U2wv8Q: {
        id: 'U2wv8Q',
        groupId: 'JDi6zL',
        groupPosition: 4,
        type: SelectorType.EXPERIENCE_SKILL,
        position: 3,
        value: 'CSS',
      },
      Uq4URW: {
        id: 'Uq4URW',
        groupId: 'wv7RWA',
        groupPosition: 5,
        type: SelectorType.EXPERIENCE_ORGANIZATION,
        position: 0,
        value: 'Homenick Group',
      },
      ZOcstA: {
        id: 'ZOcstA',
        groupId: 'wv7RWA',
        groupPosition: 5,
        type: SelectorType.EXPERIENCE_TITLE,
        position: 0,
        value: 'Information Technology Technician',
      },
      pKWFgj: {
        id: 'pKWFgj',
        groupId: 'wv7RWA',
        groupPosition: 5,
        type: SelectorType.EXPERIENCE_DURATION,
        position: 0,
        value: 'Jan 2018 - Dec 2018',
      },
      a7yjRM: {
        id: 'a7yjRM',
        groupId: 'wv7RWA',
        groupPosition: 5,
        type: SelectorType.EXPERIENCE_LOCATION,
        position: 0,
        value: 'Remote',
      },
      '2A5TJG': {
        id: '2A5TJG',
        groupId: 'wv7RWA',
        groupPosition: 5,
        type: SelectorType.EXPERIENCE_DESCRIPTION,
        position: 0,
        value:
        'Developing, testing, designing, and implementing application scripts using languages such as command batch files, Visual Basic Script, and PowerShell.',
      },
    },
    byType: {
      NAME: ['cGOn1Z'],
      TITLE: ['ImxJzl'],
      SUMMARY: ['yklt7L'],
      EMAIL: ['QHVCZE'],
      PHONE: ['9fpoXz'],
      LOCATION: ['56FXgD'],
      SOCIAL_NAME: ['bSWNcA', 'NSKVRu', 'nyHCys'],
      SOCIAL_ICON: ['TKGmg8', '3ClFV3', 'EevRIX'],
      SOCIAL_URL: ['QzaUKU', 'kZQ0D0', 'PdFyKt'],
      EXPERIENCE_ORGANIZATION: [
        'mHqQo5',
        'xvvZMK',
        'iuqlt6',
        '24xuSH',
        'jTcVWu',
        'Uq4URW',
      ],
      EXPERIENCE_TITLE: ['woPRPF', 'xaQQXi', 'g8g11w', 'FhMROM', 'GNVHRV', 'ZOcstA'],
      EXPERIENCE_DURATION: ['D63MSQ', 'JOpOqX', '5knyWV', '3Zt1jU', 'COnDfF', 'pKWFgj'],
      EXPERIENCE_LOCATION: ['xSdMqL', '4GajzB', '7QKmCX', '4aihVC', 'uWmqfg', 'a7yjRM'],
      EXPERIENCE_DESCRIPTION: [
        'Oq1IQ6',
        'IH2cXf',
        'ac3Y3g',
        'CNLcFh',
        'Ov20bL',
        'CWPe8V',
        'et6YYy',
        'Af1Gpd',
        'HQAfhi',
        'vq87P2',
        '87cdhd',
        '7VRrjV',
        'AvkEKp',
        'iQdo3T',
        'Ry2Nhk',
        'piDAhU',
        'CadaeY',
        'B6AloM',
        'cZRgvl',
        'Uv0Q1M',
        '2A5TJG',
      ],
      EXPERIENCE_SKILL: [
        'Z4AfFQ',
        'xuLMPb',
        'YXlaIx',
        'cuAGAQ',
        'tFxwhP',
        'tzXZQe',
        'hb34AN',
        'GXivPT',
        'VAdl0u',
        'q4UGVi',
        'gpuzzS',
        '9CMYf2',
        'Od930N',
        'oHfWhn',
        '7zNOal',
        'mxrRXZ',
        'uaftXK',
        'xHTzxU',
        'bm0beF',
        'uwIZP3',
        'w5f42s',
        'F2wYOq',
        'E5gPE0',
        'cYkQL7',
        'eni8JG',
        'X34K8a',
        'U2wv8Q',
      ],
    },
    allIds: [
      'cGOn1Z',
      'ImxJzl',
      'yklt7L',
      'QHVCZE',
      '9fpoXz',
      '56FXgD',
      'bSWNcA',
      'TKGmg8',
      'QzaUKU',
      'NSKVRu',
      '3ClFV3',
      'kZQ0D0',
      'nyHCys',
      'EevRIX',
      'PdFyKt',
      'mHqQo5',
      'woPRPF',
      'D63MSQ',
      'xSdMqL',
      'Oq1IQ6',
      'IH2cXf',
      'ac3Y3g',
      'CNLcFh',
      'Ov20bL',
      'Z4AfFQ',
      'xuLMPb',
      'YXlaIx',
      'cuAGAQ',
      'tFxwhP',
      'tzXZQe',
      'xvvZMK',
      'xaQQXi',
      'JOpOqX',
      '4GajzB',
      'CWPe8V',
      'et6YYy',
      'Af1Gpd',
      'HQAfhi',
      'hb34AN',
      'GXivPT',
      'VAdl0u',
      'q4UGVi',
      'gpuzzS',
      '9CMYf2',
      'Od930N',
      'iuqlt6',
      'g8g11w',
      '5knyWV',
      '7QKmCX',
      'vq87P2',
      '87cdhd',
      '7VRrjV',
      'oHfWhn',
      '7zNOal',
      'mxrRXZ',
      'uaftXK',
      'xHTzxU',
      'bm0beF',
      '24xuSH',
      'FhMROM',
      '3Zt1jU',
      '4aihVC',
      'AvkEKp',
      'iQdo3T',
      'Ry2Nhk',
      'piDAhU',
      'uwIZP3',
      'w5f42s',
      'F2wYOq',
      'E5gPE0',
      'jTcVWu',
      'GNVHRV',
      'COnDfF',
      'uWmqfg',
      'CadaeY',
      'B6AloM',
      'cZRgvl',
      'Uv0Q1M',
      'cYkQL7',
      'eni8JG',
      'X34K8a',
      'U2wv8Q',
      'Uq4URW',
      'ZOcstA',
      'pKWFgj',
      'a7yjRM',
      '2A5TJG',
    ],
    experiences: {
    },
    experienceDescriptions: {
      V8AFW1: {
        id: 'V8AFW1',
        experienceId: 'wv7RWA',
        position: 1,
        value:
          'Configuring and supporting Blackberry devices on the Blackberry Enterprise Server to receive Exchange email.',
      },
      '04jBVn': {
        id: '04jBVn',
        experienceId: 'wv7RWA',
        position: 2,
        value:
          'Installing, configuring, and testing Veeam virtual machine backup software and Virtual Desktop Infrastructure (VDI).',
      },
    },
    experienceSkills: {
      kPNAZo: {
        id: 'kPNAZo',
        experienceId: 'wv7RWA',
        position: 0,
        value: 'VB.Net',
      },
      '6XKu0i': {
        id: '6XKu0i',
        experienceId: 'wv7RWA',
        position: 1,
        value: 'T-SQL',
      },
    },
    skills: {
      jGFwg2: {
        id: 'jGFwg2',
        name: 'Photoshop',
        proficiency: 4,
      },
      i4OWR1: {
        id: 'i4OWR1',
        name: 'Illustrator',
        proficiency: 2,
      },
      '4nQsf4': {
        id: '4nQsf4',
        name: 'PHP',
        proficiency: 2,
      },
      CfsDjk: {
        id: 'CfsDjk',
        name: 'HTML',
        proficiency: 3,
      },
      cpXp68: {
        id: 'cpXp68',
        name: 'WordPress',
        proficiency: 3,
      },
      oWDqpM: {
        id: 'oWDqpM',
        name: 'CSS',
        proficiency: 3,
      },
      '4d9Uoh': {
        id: '4d9Uoh',
        name: 'Joomla',
        proficiency: 3,
      },
    },
    certifications: {
      doku5G: {
        id: 'doku5G',
        title: 'Master Degree in Studies',
        organization: 'Name of University',
        location: 'New York, New York',
        year: '2012',
      },
    },
  };
}
