import { SelectorType } from '@resume/selector-type.enum';

export class ResumeStateConfig {
  public static readonly DEFAULT = {
    byId: {},
    allIds: [],
    byType: {
      NAME: [],
      TITLE: [],
    },
    title: '',
    summary: '',
    email: '',
    location: '',
    phone: '',
    socials: {},
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
        parentId: '',
        type: SelectorType.NAME,
        position: 0,
        value: 'John Doe',
      },
      ImxJzl: {
        id: 'ImxJzl',
        parentId: '',
        type: SelectorType.TITLE,
        position: 0,
        value: 'Web and Graphic Designer',
      },
    },
    allIds: ['cGOn1Z', 'ImxJzl'],
    byType: {
      NAME: ['cGOn1Z'],
      TITLE: ['ImxJzl'],
    },
    title: 'Web and Graphic Designer',
    summary:
      'Rock Star/Ninja can you ballpark the cost per unit for me, for touch base disband the squad but rehydrate as needed sacred cow.',
    email: 'info@youremail.com',
    location: 'New York, New York',
    phone: '(123) 456-8899',
    socials: {
      hPjgs6: {
        id: 'hPjgs6',
        name: 'Facebook',
        icon: 'fa-brands fa-facebook',
        url: 'https://facebook.com/profile',
      },
      TKGmg8: {
        id: 'TKGmg8',
        name: 'Twitter',
        icon: 'fa-brands fa-twitter',
        url: 'https://twitter.com/profile',
      },
      Yle4N7: {
        id: 'Yle4N7',
        name: 'LinkedIn',
        icon: 'fa-brands fa-linkedin',
        url: 'https://linkedin.com/profile',
      },
    },
    experiences: {
      sxvDST: {
        id: 'sxvDST',
        organization: 'Cyberdyne System Corp.',
        title: 'Web Developer',
        duration: 'Jan 2023 - Present',
        location: 'Remote',
      },
      '6qowVm': {
        id: '6qowVm',
        organization: 'Very Big Corp. of America',
        title: 'User Experience Expert',
        duration: 'Jan 2022 – Dec 2022',
        location: 'Remote',
      },
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
      DsI9Jf: {
        id: 'DsI9Jf',
        experienceId: 'sxvDST',
        position: 0,
        value:
          'Efficiently unleash cross-media information without cross-media value.',
      },
      IH2cXf: {
        id: 'IH2cXf',
        experienceId: 'sxvDST',
        position: 1,
        value:
          'Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar solutions without functional solutions.',
      },
      ac3Y3g: {
        id: 'ac3Y3g',
        experienceId: 'sxvDST',
        position: 2,
        value:
          'Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas',
      },
      CNLcFh: {
        id: 'CNLcFh',
        experienceId: 'sxvDST',
        position: 3,
        value:
          'Ladder back to the strategy we need evergreen content blue money synergize productive mindfulness.',
      },
      Ov20bL: {
        id: 'Ov20bL',
        experienceId: 'sxvDST',
        position: 4,
        value: 'Paradigm shift land it in region, design thinking.',
      },
      Z5GUKN: {
        id: 'Z5GUKN',
        experienceId: '6qowVm',
        position: 0,
        value:
          'Collaboratively administrate empowered markets via plug-and-play networks.',
      },
      bVUHf8: {
        id: 'bVUHf8',
        experienceId: '6qowVm',
        position: 1,
        value:
          'Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI.',
      },
      NxTdyW: {
        id: 'NxTdyW',
        experienceId: '6qowVm',
        position: 2,
        value:
          'Pursue scalable customer service through sustainable potentialities.',
      },
      hpLq5T: {
        id: 'hpLq5T',
        experienceId: '6qowVm',
        position: 3,
        value:
          'Draft policy ppml proposal tiger team, or face time are we in agreeance.',
      },
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
      A8QsRq: {
        id: 'A8QsRq',
        experienceId: 'sxvDST',
        position: 0,
        value: 'Photoshop',
      },
      ODDIMq: {
        id: 'ODDIMq',
        experienceId: 'sxvDST',
        position: 1,
        value: 'HTML',
      },
      w62dl4: {
        id: 'w62dl4',
        experienceId: 'sxvDST',
        position: 2,
        value: 'CSS',
      },
      LmRQEY: {
        id: 'LmRQEY',
        experienceId: 'sxvDST',
        position: 3,
        value: 'Illustrator',
      },
      iLPjrp: {
        id: 'iLPjrp',
        experienceId: 'sxvDST',
        position: 4,
        value: 'PHP',
      },
      HI3wnF: {
        id: 'HI3wnF',
        experienceId: 'sxvDST',
        position: 5,
        value: 'JavaScript',
      },
      imSw9w: {
        id: 'imSw9w',
        experienceId: '6qowVm',
        position: 0,
        value: 'Typography',
      },
      TYDZ9i: {
        id: 'TYDZ9i',
        experienceId: '6qowVm',
        position: 1,
        value: 'Composition',
      },
      pA2K9b: {
        id: 'pA2K9b',
        experienceId: '6qowVm',
        position: 2,
        value: 'Color Theory',
      },
      taNZ2T: {
        id: 'taNZ2T',
        experienceId: '6qowVm',
        position: 3,
        value: 'Design',
      },
      '1npMv6': {
        id: '1npMv6',
        experienceId: '6qowVm',
        position: 4,
        value: 'CMS',
      },
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
