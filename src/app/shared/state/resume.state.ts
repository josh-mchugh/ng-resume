import { Injectable } from '@angular/core';
import { mergeMap } from 'rxjs';
import { State, Action, StateContext, createSelector } from '@ngxs/store';
import { Resume } from './resume.actions';
import {
  DisplayRequest,
  DisplayService,
} from '@shared/service/display.service';

export interface ResumeStateModel {
  name: string;
  title: string;
  summary: string;
  phone: string;
  email: string;
  location: string;
  socials: { [id: string]: Social };
  experiences: { [id: string]: Experience };
  experienceDescriptions: { [id: string]: ExperienceDescription };
  experienceSkills: { [id: string]: ExperienceSkill };
  skills: { [id: string]: Skill };
  certifications: { [id: string]: Certification };
}

export interface Social {
  id: string;
  icon: string;
  name: string;
  url: string;
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  duration: string;
  location: string;
}

export interface ExperienceDescription {
  id: string;
  experienceId: string;
  description: string;
}

export interface ExperienceSkill {
  id: string;
  experienceId: string;
  skill: string;
}

export interface Skill {
  id: string;
  name: string;
  proficiency: number;
}

export interface Certification {
  id: string;
  title: string;
  organization: string;
  year: string;
  location: string;
}

export enum SelectorType {
  NAME = 'NAME',
  TITLE = 'TITLE',
  SUMMARY = 'SUMMARY',
  EMAIL = 'EMAIL',
  LOCATION = 'LOCATION',
  PHONE = 'PHONE',
  SOCIAL_LIST = 'SOCIAL_LIST',
  SOCIAL_ICON = 'SOCIAL_ICON',
  SOCIAL_NAME = 'SOCIAL_NAME',
  SOCIAL_URL = 'SOCIAL_URL',
  EXPERIENCE_LIST = 'EXPERIENCE_LIST',
  EXPERIENCE_TITLE = 'EXPERIENCE_TITLE',
  EXPERIENCE_DURATION = 'EXPERIENCE_DURATION',
  EXPERIENCE_ORGANIZATION = 'EXPERIENCE_ORGANIZATION',
  EXPERIENCE_LOCATION = 'EXPERIENCE_LOCATION',
  EXPERIENCE_DESCRIPTION_LIST = 'EXPERIENCE_DESCRIPTION_LIST',
  EXPERIENCE_DESCRIPTION = 'EXPERIENCE_DESCRIPTION',
  EXPERIENCE_SKILL_LIST = 'EXPERIENCE_SKILL_LIST',
  EXPERIENCE_SKILL = 'EXPERIENCE_SKILL',
  SKILL_LIST = 'SKILL_LIST',
  SKILL_NAME = 'SKILL_NAME',
  SKILL_BLOCKS = 'SKILL_BLOCKS',
  CERTIFICATION_LIST = 'CERTIFICATION_LIST',
  CERTIFICATION_TITLE = 'CERTIFICATION_TITLE',
  CERTIFICATION_YEAR = 'CERTIFICATION_YEAR',
  CERTIFICATION_ORGANIZATION = 'CERTIFICATION_ORGANIZATION',
  CERTIFICATION_LOCATION = 'CERTIFICATION_LOCATION',
}

@State<ResumeStateModel>({
  name: 'resume',
  defaults: {
    name: 'John Doe',
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
      '0': {
        id: '0',
        organization: 'Cyberdyne System Corp.',
        title: 'Web Developer',
        duration: 'Jan 2023 - Present',
        location: 'Remote',
      },
      '1': {
        id: '1',
        organization: 'Very Big Corp. of America',
        title: 'User Experience Expert',
        duration: 'Jan 2022 – Dec 2022',
        location: 'Remote',
      },
      '2': {
        id: '2',
        organization: 'MomCorp',
        title: 'Database Developer',
        duration: 'Jan 2021 – Dec 2021',
        location: 'Remote',
      },
    },
    experienceDescriptions: {
      '0': {
        id: '0',
        experienceId: '0',
        description:
          'Efficiently unleash cross-media information without cross-media value.',
      },
      '1': {
        id: '1',
        experienceId: '0',
        description:
          'Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar solutions without functional solutions.',
      },
      '2': {
        id: '2',
        experienceId: '0',
        description:
          'Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas',
      },
      '3': {
        id: '3',
        experienceId: '0',
        description:
          'Ladder back to the strategy we need evergreen content blue money synergize productive mindfulness.',
      },
      '4': {
        id: '4',
        experienceId: '0',
        description: 'Paradigm shift land it in region, design thinking.',
      },
      '5': {
        id: '5',
        experienceId: '1',
        description:
          'Collaboratively administrate empowered markets via plug-and-play networks.',
      },
      '6': {
        id: '6',
        experienceId: '1',
        description:
          'Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI.',
      },
      '7': {
        id: '7',
        experienceId: '1',
        description:
          'Pursue scalable customer service through sustainable potentialities.',
      },
      '8': {
        id: '8',
        experienceId: '1',
        description:
          'Draft policy ppml proposal tiger team, or face time are we in agreeance.',
      },
      '9': {
        id: '9',
        experienceId: '2',
        description:
          'Phosfluorescently engage worldwide methodologies with web-enabled technology. Interactively coordinate proactive e-commerce.',
      },
      '10': {
        id: '10',
        experienceId: '2',
        description:
          'Envisioned multimedia based expertise and cross-media growth strategies.',
      },
      '11': {
        id: '11',
        experienceId: '2',
        description:
          'Synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.',
      },
    },
    experienceSkills: {
      '0': {
        id: '0',
        experienceId: '0',
        skill: 'Photoshop',
      },
      '1': {
        id: '1',
        experienceId: '0',
        skill: 'HTML',
      },
      '2': {
        id: '2',
        experienceId: '0',
        skill: 'CSS',
      },
      '3': {
        id: '3',
        experienceId: '0',
        skill: 'Illustrator',
      },
      '4': {
        id: '4',
        experienceId: '0',
        skill: 'PHP',
      },
      '5': {
        id: '5',
        experienceId: '0',
        skill: 'JavaScript',
      },
      '6': {
        id: '6',
        experienceId: '1',
        skill: 'Typography',
      },
      '7': {
        id: '7',
        experienceId: '1',
        skill: 'Composition',
      },
      '8': {
        id: '8',
        experienceId: '1',
        skill: 'Color Theory',
      },
      '9': {
        id: '9',
        experienceId: '1',
        skill: 'Design',
      },
      '10': {
        id: '10',
        experienceId: '1',
        skill: 'CMS',
      },
      '11': {
        id: '11',
        experienceId: '1',
        skill: 'UX',
      },
      '12': {
        id: '12',
        experienceId: '1',
        skill: 'Graphic Design',
      },
      '13': {
        id: '13',
        experienceId: '2',
        skill: 'SQL',
      },
      '14': {
        id: '14',
        experienceId: '2',
        skill: 'NoSQL',
      },
      '15': {
        id: '15',
        experienceId: '2',
        skill: 'MySQL',
      },
      '16': {
        id: '16',
        experienceId: '2',
        skill: 'Postgres',
      },
      '17': {
        id: '17',
        experienceId: '2',
        skill: 'MongoDB',
      },
      '18': {
        id: '18',
        experienceId: '2',
        skill: 'Coachbase',
      },
    },
    skills: {
      '0': {
        id: '0',
        name: 'Photoshop',
        proficiency: 4,
      },
      '1': {
        id: '1',
        name: 'Illustrator',
        proficiency: 2,
      },
      '2': {
        id: '2',
        name: 'PHP',
        proficiency: 2,
      },
      '3': {
        id: '3',
        name: 'HTML',
        proficiency: 3,
      },
      '4': {
        id: '4',
        name: 'WordPress',
        proficiency: 3,
      },
      '5': {
        id: '5',
        name: 'CSS',
        proficiency: 3,
      },
      '6': {
        id: '6',
        name: 'Joomla',
        proficiency: 3,
      },
    },
    certifications: {
      '0': {
        id: '0',
        title: 'Master Degree in Studies',
        organization: 'Name of University',
        location: 'New York, New York',
        year: '2012',
      },
    },
  },
})
@Injectable()
export class ResumeState {
  constructor(private displayService: DisplayService) {}

  // Ignore until refactoring out generic type any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static selectorValue(selectorType: SelectorType, id: string): any {
    switch (selectorType) {
      case SelectorType.NAME:
        return this.selectorName();
      case SelectorType.TITLE:
        return this.selectorTitle();
      case SelectorType.SUMMARY:
        return this.selectorSummary();
      case SelectorType.EMAIL:
        return this.selectorEmail();
      case SelectorType.LOCATION:
        return this.selectorLocation();
      case SelectorType.PHONE:
        return this.selectorPhone();
      case SelectorType.SOCIAL_LIST:
        return this.selectorSocialList();
      case SelectorType.SOCIAL_ICON:
        return this.selectorSocialIcon(id);
      case SelectorType.SOCIAL_NAME:
        return this.selectorSocialName(id);
      case SelectorType.SOCIAL_URL:
        return this.selectorSocialUrl(id);
      case SelectorType.EXPERIENCE_LIST:
        return this.selectorExperienceList();
      case SelectorType.EXPERIENCE_TITLE:
        return this.selectorExperienceTitle(id);
      case SelectorType.EXPERIENCE_DURATION:
        return this.selectorExperienceDuration(id);
      case SelectorType.EXPERIENCE_ORGANIZATION:
        return this.selectorExperienceOrganization(id);
      case SelectorType.EXPERIENCE_LOCATION:
        return this.selectorExperienceLocation(id);
      case SelectorType.EXPERIENCE_DESCRIPTION_LIST:
        return this.selectorExperienceDescriptionList(id);
      case SelectorType.EXPERIENCE_DESCRIPTION:
        return this.selectorExperienceDescription(id);
      case SelectorType.EXPERIENCE_SKILL_LIST:
        return this.selectorExperienceSkillList(id);
      case SelectorType.EXPERIENCE_SKILL:
        return this.selectorExperienceSkill(id);
      case SelectorType.SKILL_LIST:
        return this.selectorSkillList();
      case SelectorType.SKILL_NAME:
        return this.selectorSkillName(id);
      case SelectorType.SKILL_BLOCKS:
        return this.selectorSkillBlocks(id);
      case SelectorType.CERTIFICATION_LIST:
        return this.selectorCertificationList();
      case SelectorType.CERTIFICATION_TITLE:
        return this.selectorCertificationTitle(id);
      case SelectorType.CERTIFICATION_YEAR:
        return this.selectorCertificationYear(id);
      case SelectorType.CERTIFICATION_ORGANIZATION:
        return this.selectorCertificationOrganization(id);
      case SelectorType.CERTIFICATION_LOCATION:
        return this.selectorCertificationLocation(id);
      default:
        throw new Error('Unknow selector type: ' + selectorType);
    }
  }

  private static selectorName() {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.name,
    );
  }

  private static selectorTitle() {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.title,
    );
  }

  private static selectorSummary() {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.summary,
    );
  }

  private static selectorEmail() {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.email,
    );
  }

  private static selectorLocation() {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.location,
    );
  }

  private static selectorPhone() {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.phone,
    );
  }

  private static selectorSocialList() {
    return createSelector([ResumeState], (state: ResumeStateModel) =>
      Object.keys(state.socials),
    );
  }

  private static selectorSocialIcon(id: string) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.socials[id].icon,
    );
  }

  private static selectorSocialName(id: string) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.socials[id].name,
    );
  }

  private static selectorSocialUrl(id: string) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.socials[id].url,
    );
  }

  private static selectorExperienceList() {
    return createSelector([ResumeState], (state: ResumeStateModel) =>
      Object.keys(state.experiences),
    );
  }

  private static selectorExperienceTitle(id: string) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.experiences[id].title,
    );
  }

  private static selectorExperienceDuration(id: string) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.experiences[id].duration,
    );
  }

  private static selectorExperienceOrganization(id: string) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.experiences[id].organization,
    );
  }

  private static selectorExperienceLocation(id: string) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.experiences[id].location,
    );
  }

  private static selectorExperienceDescriptionList(id: string) {
    return createSelector([ResumeState], (state: ResumeStateModel) =>
      Object.values(state.experienceDescriptions)
        .filter((description) => id === description.experienceId)
        .map((description) => description.id),
    );
  }

  private static selectorExperienceDescription(id: string) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.experienceDescriptions[id].description,
    );
  }

  private static selectorExperienceSkillList(id: string) {
    return createSelector([ResumeState], (state: ResumeStateModel) =>
      Object.values(state.experienceSkills)
        .filter((skill) => id === skill.experienceId)
        .map((skill) => skill.id),
    );
  }

  private static selectorExperienceSkill(id: string) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.experienceSkills[id].skill,
    );
  }

  private static selectorSkillList() {
    return createSelector([ResumeState], (state: ResumeStateModel) =>
      Object.keys(state.skills),
    );
  }

  private static selectorSkillName(id: string) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.skills[id].name,
    );
  }

  private static selectorSkillBlocks(id: string) {
    return createSelector([ResumeState], (state: ResumeStateModel) =>
      [...Array(5).keys()].map((value) => {
        return {
          active: state.skills[id].proficiency >= value + 1,
        };
      }),
    );
  }

  private static selectorCertificationList() {
    return createSelector([ResumeState], (state: ResumeStateModel) =>
      Object.keys(state.certifications),
    );
  }

  private static selectorCertificationTitle(id: string) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.certifications[id].title,
    );
  }

  private static selectorCertificationYear(id: string) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.certifications[id].year,
    );
  }

  private static selectorCertificationOrganization(id: string) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.certifications[id].organization,
    );
  }

  private static selectorCertificationLocation(id: string) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.certifications[id].location,
    );
  }

  @Action(Resume.NameUpdate)
  nameUpdate(ctx: StateContext<ResumeStateModel>, action: Resume.NameUpdate) {
    ctx.setState({
      ...ctx.getState(),
      name: action.name,
    });
  }

  @Action(Resume.TitleUpdate)
  titleUpdate(ctx: StateContext<ResumeStateModel>, action: Resume.TitleUpdate) {
    ctx.setState({
      ...ctx.getState(),
      title: action.title,
    });
  }

  @Action(Resume.SummaryUpdate)
  summaryUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.SummaryUpdate,
  ) {
    ctx.setState({
      ...ctx.getState(),
      summary: action.summary,
    });
  }

  @Action(Resume.PhoneUpdate)
  phoneUpdate(ctx: StateContext<ResumeStateModel>, action: Resume.PhoneUpdate) {
    ctx.setState({
      ...ctx.getState(),
      phone: action.phone,
    });
  }

  @Action(Resume.EmailUpdate)
  emailUpdate(ctx: StateContext<ResumeStateModel>, action: Resume.EmailUpdate) {
    ctx.setState({
      ...ctx.getState(),
      email: action.email,
    });
  }

  @Action(Resume.LocationUpdate)
  locationUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.LocationUpdate,
  ) {
    ctx.setState({
      ...ctx.getState(),
      location: action.location,
    });
  }

  @Action(Resume.SocialCreate)
  socialCreate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.SocialCreate,
  ) {
    const socials = ctx.getState().socials;
    const social = { id: action.id, name: '', url: '', icon: '' };
    const updatedSocials = { ...socials, [social.id]: social };

    ctx.setState({
      ...ctx.getState(),
      socials: updatedSocials,
    });

    // TODO: Create new Section for Social
  }

  @Action(Resume.ExperiencesUpdate)
  experiencesUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.ExperiencesUpdate,
  ) {
    // Create Experience Object
    const experiences = action.experiences
      .map((experience) => {
        return {
          id: experience.id,
          title: experience.title,
          organization: experience.organization,
          duration: experience.duration,
          location: experience.location,
        };
      })
      .reduce(
        (acc, experience) => ({ ...acc, [experience.id]: experience }),
        {},
      );

    // Create ExperienceDescription Objects
    const experienceDescriptions = action.experiences
      .map((experience, experienceIndex) => {
        return experience.descriptions.map((description) => {
          return {
            experienceId: experienceIndex.toString(),
            description: description,
          };
        });
      })
      .flat()
      .reduce(
        (acc, description, index) => ({
          ...acc,
          [index.toString()]: { ...description, id: index.toString() },
        }),
        {},
      );

    // Create ExperienceSkill Objects
    const experienceSkills = action.experiences
      .map((experience, experienceId) => {
        return experience.skills.map((skill) => {
          return {
            experienceId: experienceId.toString(),
            skill: skill,
          };
        });
      })
      .flat()
      .reduce(
        (acc, skill, index) => ({
          ...acc,
          [index.toString()]: { ...skill, id: index.toString() },
        }),
        {},
      );

    ctx.setState({
      ...ctx.getState(),
      experiences: experiences,
      experienceDescriptions: experienceDescriptions,
      experienceSkills: experienceSkills,
    });
  }

  @Action(Resume.SkillsUpdate)
  skillsUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.SkillsUpdate,
  ) {
    const skills = action.skills.reduce(
      (acc, skill) => ({ ...acc, [skill.id]: skill }),
      {},
    );
    ctx.setState({
      ...ctx.getState(),
      skills: skills,
    });
  }

  @Action(Resume.CertificationsUpdate)
  certificationsUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.CertificationsUpdate,
  ) {
    const certifications = action.certifications.reduce(
      (acc, certification) => ({ ...acc, [certification.id]: certification }),
      {},
    );
    ctx.setState({
      ...ctx.getState(),
      certifications: certifications,
    });
  }
}
