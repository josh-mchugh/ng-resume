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
        value: 'Collaboratively administrate empowered markets via plug-and-play networks.',
      },
      et6YYy: {
        id: 'et6YYy',
        groupId: '6qowVm',
        groupPosition: 1,
        type: SelectorType.EXPERIENCE_DESCRIPTION,
        position: 1,
        value: 'Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI.',
      },
      Af1Gpd: {
        id: 'Af1Gpd',
        groupId: '6qowVm',
        groupPosition: 1,
        type: SelectorType.EXPERIENCE_DESCRIPTION,
        position: 2,
        value: 'Pursue scalable customer service through sustainable potentialities.',
      },
      HQAfhi: {
        id: 'HQAfhi',
        groupId: '6qowVm',
        groupPosition: 1,
        type: SelectorType.EXPERIENCE_DESCRIPTION,
        position: 3,
        value: 'Draft policy ppml proposal tiger team, or face time are we in agreeance.',
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
      }
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
      EXPERIENCE_ORGANIZATION: ['mHqQo5', 'xvvZMK'],
      EXPERIENCE_TITLE: ['woPRPF', 'xaQQXi'],
      EXPERIENCE_DURATION: ['D63MSQ', 'JOpOqX'],
      EXPERIENCE_LOCATION: ['xSdMqL', '4GajzB'],
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
    ],
    experiences: {
      By81yN: {
        id: 'By81yN',
        organization: 'MomCorp',
        title: 'Database Developer',
        duration: 'Jan 2021 – Dec 2021',
        location: 'Remote',
      },
      DqS3iu: {
        id: 'DqS3iu',
        organization: "O'Connell LLC",
        title: 'Junior Engineer',
        duration: 'Jan 2020 - Dec 2020',
        location: 'Remote',
      },
      JDi6zL: {
        id: 'JDi6zL',
        organization: 'Turner Inc',
        title: 'Information Services Liaison',
        duration: 'Jan 2019 - Dec 2019',
        location: 'Remote',
      },
      wv7RWA: {
        id: 'wv7RWA',
        organization: 'Homenick Group',
        title: 'Information Technology Technician',
        duration: 'Jan 2018 - Dec 2018',
        location: 'Remote',
      },
    },
    experienceDescriptions: {
      V8Rb8E: {
        id: 'V8Rb8E',
        experienceId: 'By81yN',
        position: 0,
        value:
          'Phosfluorescently engage worldwide methodologies with web-enabled technology. Interactively coordinate proactive e-commerce.',
      },
      l8faMt: {
        id: 'l8faMt',
        experienceId: 'By81yN',
        position: 1,
        value:
          'Envisioned multimedia based expertise and cross-media growth strategies.',
      },
      SzvBRx: {
        id: 'SzvBRx',
        experienceId: 'By81yN',
        position: 2,
        value:
          'Synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.',
      },
      cfuZQP: {
        id: 'cfuZQP',
        experienceId: 'DqS3iu',
        position: 0,
        value:
          'Migrating and managing user accounts in Microsoft Office 365 and Exchange Online.',
      },
      '3Qfl0f': {
        id: '3Qfl0f',
        experienceId: 'DqS3iu',
        position: 1,
        value:
          'Creating and managing virtual machines for systems such as domain controllers and Active Directory Federation Services (ADFS) in Microsoft Windows Azure (IaaS).',
      },
      c9HOmD: {
        id: 'c9HOmD',
        experienceId: 'DqS3iu',
        position: 2,
        value:
          'Creating and managing storage in Microsoft Windows Azure (IaaS).',
      },
      duyQxx: {
        id: 'duyQxx',
        experienceId: 'DqS3iu',
        position: 3,
        value:
          'Installing and configuring StorSimple iSCSI cloud array (STaaS/BaaS).',
      },
      X2RU0c: {
        id: 'X2RU0c',
        experienceId: 'JDi6zL',
        position: 0,
        value:
          'Troubleshooting hardware and software problems over the telephone and through remote PC administration software.',
      },
      sT4moZ: {
        id: 'sT4moZ',
        experienceId: 'JDi6zL',
        position: 1,
        value:
          'Installing, configuring, and supporting McAfee anti-virus software on desktops.',
      },
      YWpmDa: {
        id: 'YWpmDa',
        experienceId: 'JDi6zL',
        position: 2,
        value:
          'Installing, configuring, and supporting BBars computer backup software.',
      },
      '7dsIrL': {
        id: '7dsIrL',
        experienceId: 'JDi6zL',
        position: 3,
        value:
          'Developing and maintaining websites on servers running Microsoft SharePoint Server and Internet Information Services (IIS).',
      },
      tEHYrq: {
        id: 'tEHYrq',
        experienceId: 'wv7RWA',
        position: 0,
        value:
          'Developing, testing, designing, and implementing application scripts using languages such as command batch files, Visual Basic Script, and PowerShell.',
      },
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
      Xrdzpz: {
        id: 'Xrdzpz',
        experienceId: '6qowVm',
        position: 5,
        value: 'UX',
      },
      '36dY9U': {
        id: '36dY9U',
        experienceId: '6qowVm',
        position: 6,
        value: 'Graphic Design',
      },
      '1hdpg5': {
        id: '1hdpg5',
        experienceId: 'By81yN',
        position: 0,
        value: 'SQL',
      },
      AWGq5n: {
        id: 'AWGq5n',
        experienceId: 'By81yN',
        position: 1,
        value: 'NoSQL',
      },
      UpJ3Qc: {
        id: 'UpJ3Qc',
        experienceId: 'By81yN',
        position: 2,
        value: 'MySQL',
      },
      i9YcN5: {
        id: 'i9YcN5',
        experienceId: 'By81yN',
        position: 3,
        value: 'Postgres',
      },
      BlPZ2D: {
        id: 'BlPZ2D',
        experienceId: 'By81yN',
        position: 4,
        value: 'MongoDB',
      },
      '2JD9Zt': {
        id: '2JD9Zt',
        experienceId: 'By81yN',
        position: 5,
        value: 'Coachbase',
      },
      lY6dHN: {
        id: 'lY6dHN',
        experienceId: 'DqS3iu',
        position: 0,
        value: 'Active Directory',
      },
      FWbOYH: {
        id: 'FWbOYH',
        experienceId: 'DqS3iu',
        position: 1,
        value: 'VMWare',
      },
      mnj4z9: {
        id: 'mnj4z9',
        experienceId: 'DqS3iu',
        position: 2,
        value: 'PowerShell',
      },
      LDxNuH: {
        id: 'LDxNuH',
        experienceId: 'DqS3iu',
        position: 3,
        value: 'Office 365',
      },
      '8Mf0xD': {
        id: '8Mf0xD',
        experienceId: 'JDi6zL',
        position: 0,
        value: 'C++',
      },
      slefNV: {
        id: 'slefNV',
        experienceId: 'JDi6zL',
        position: 1,
        value: 'Java',
      },
      ZXieJh: {
        id: 'ZXieJh',
        experienceId: 'JDi6zL',
        position: 2,
        value: 'HTML,',
      },
      '33PoKh': {
        id: '33PoKh',
        experienceId: 'JDi6zL',
        position: 3,
        value: 'CSS',
      },
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
