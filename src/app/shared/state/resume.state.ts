import { Injectable } from '@angular/core';
import { mergeMap } from 'rxjs';
import { State, Action, StateContext, createSelector } from '@ngxs/store';
import { Resume } from './resume.actions';
import {
  DisplayRequest,
  DisplayService,
} from '@shared/service/display.service';
import ShortUniqueId from 'short-unique-id';

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
  position: number;
  description: string;
}

export interface ExperienceSkill {
  id: string;
  experienceId: string;
  position: number;
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
        position: 0,
        description:
          'Efficiently unleash cross-media information without cross-media value.',
      },
      '1': {
        id: '1',
        experienceId: '0',
        position: 0,
        description:
          'Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar solutions without functional solutions.',
      },
      '2': {
        id: '2',
        experienceId: '0',
        position: 1,
        description:
          'Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas',
      },
      '3': {
        id: '3',
        experienceId: '0',
        position: 2,
        description:
          'Ladder back to the strategy we need evergreen content blue money synergize productive mindfulness.',
      },
      '4': {
        id: '4',
        experienceId: '0',
        position: 3,
        description: 'Paradigm shift land it in region, design thinking.',
      },
      '5': {
        id: '5',
        experienceId: '1',
        position: 0,
        description:
          'Collaboratively administrate empowered markets via plug-and-play networks.',
      },
      '6': {
        id: '6',
        experienceId: '1',
        position: 1,
        description:
          'Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI.',
      },
      '7': {
        id: '7',
        experienceId: '1',
        position: 2,
        description:
          'Pursue scalable customer service through sustainable potentialities.',
      },
      '8': {
        id: '8',
        experienceId: '1',
        position: 3,
        description:
          'Draft policy ppml proposal tiger team, or face time are we in agreeance.',
      },
      '9': {
        id: '9',
        experienceId: '2',
        position: 0,
        description:
          'Phosfluorescently engage worldwide methodologies with web-enabled technology. Interactively coordinate proactive e-commerce.',
      },
      '10': {
        id: '10',
        experienceId: '2',
        position: 1,
        description:
          'Envisioned multimedia based expertise and cross-media growth strategies.',
      },
      '11': {
        id: '11',
        experienceId: '2',
        position: 2,
        description:
          'Synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.',
      },
    },
    experienceSkills: {
      '0': {
        id: '0',
        experienceId: '0',
        position: 0,
        skill: 'Photoshop',
      },
      '1': {
        id: '1',
        experienceId: '0',
        position: 1,
        skill: 'HTML',
      },
      '2': {
        id: '2',
        experienceId: '0',
        position: 2,
        skill: 'CSS',
      },
      '3': {
        id: '3',
        experienceId: '0',
        position: 3,
        skill: 'Illustrator',
      },
      '4': {
        id: '4',
        experienceId: '0',
        position: 4,
        skill: 'PHP',
      },
      '5': {
        id: '5',
        experienceId: '0',
        position: 5,
        skill: 'JavaScript',
      },
      '6': {
        id: '6',
        experienceId: '1',
        position: 0,
        skill: 'Typography',
      },
      '7': {
        id: '7',
        experienceId: '1',
        position: 1,
        skill: 'Composition',
      },
      '8': {
        id: '8',
        experienceId: '1',
        position: 2,
        skill: 'Color Theory',
      },
      '9': {
        id: '9',
        experienceId: '1',
        position: 3,
        skill: 'Design',
      },
      '10': {
        id: '10',
        experienceId: '1',
        position: 4,
        skill: 'CMS',
      },
      '11': {
        id: '11',
        experienceId: '1',
        position: 5,
        skill: 'UX',
      },
      '12': {
        id: '12',
        experienceId: '1',
        position: 6,
        skill: 'Graphic Design',
      },
      '13': {
        id: '13',
        experienceId: '2',
        position: 0,
        skill: 'SQL',
      },
      '14': {
        id: '14',
        experienceId: '2',
        position: 1,
        skill: 'NoSQL',
      },
      '15': {
        id: '15',
        experienceId: '2',
        position: 2,
        skill: 'MySQL',
      },
      '16': {
        id: '16',
        experienceId: '2',
        position: 3,
        skill: 'Postgres',
      },
      '17': {
        id: '17',
        experienceId: '2',
        position: 4,
        skill: 'MongoDB',
      },
      '18': {
        id: '18',
        experienceId: '2',
        position: 5,
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
  private uuid: ShortUniqueId;
  constructor(private displayService: DisplayService) {
    this.uuid = new ShortUniqueId();
  }

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
    const social = { id: action.id, name: '', url: '', icon: '' };
    const updatedSocials = {
      ...ctx.getState().socials,
      [social.id]: social,
    };

    ctx.setState({
      ...ctx.getState(),
      socials: updatedSocials,
    });

    // TODO: Create new Section for Social
  }

  @Action(Resume.SocialDelete)
  socialDelete(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.SocialDelete,
  ) {
    const updatedSocials = Object.values(ctx.getState().socials)
      .filter((social) => action.id !== social.id)
      .reduce((acc, social) => ({ ...acc, [social.id]: social }), {});

    ctx.setState({
      ...ctx.getState(),
      socials: updatedSocials,
    });

    // TODO: Delete Section referencing Social
  }

  @Action(Resume.SocialNameUpdate)
  socialNameUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.SocialNameUpdate,
  ) {
    const social = ctx.getState().socials[action.id];
    const updatedSocial = {
      ...social,
      name: action.name,
    };

    ctx.setState({
      ...ctx.getState(),
      socials: {
        ...ctx.getState().socials,
        [updatedSocial.id]: updatedSocial,
      },
    });
  }

  @Action(Resume.SocialUrlUpdate)
  socialUrlUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.SocialUrlUpdate,
  ) {
    const social = ctx.getState().socials[action.id];
    const updatedSocial = {
      ...social,
      url: action.url,
    };

    ctx.setState({
      ...ctx.getState(),
      socials: {
        ...ctx.getState().socials,
        [updatedSocial.id]: updatedSocial,
      },
    });
  }

  @Action(Resume.ExperienceCreate)
  experienceCreate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.ExperienceCreate,
  ) {
    const experience = {
      id: action.id,
      title: '',
      organization: '',
      duration: '',
      location: '',
    };
    const updatedExperiences = {
      ...ctx.getState().experiences,
      [experience.id]: experience,
    };

    ctx.setState({
      ...ctx.getState(),
      experiences: updatedExperiences,
    });

    // TODO: Create Section for Experience
  }

  @Action(Resume.ExperienceDelete)
  experienceDelete(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.ExperienceDelete,
  ) {
    const updatedExperiences = Object.values(ctx.getState().experiences)
      .filter((experience) => experience.id !== action.id)
      .reduce(
        (acc, experience) => ({ ...acc, [experience.id]: experience }),
        {},
      );

    ctx.setState({
      ...ctx.getState(),
      experiences: updatedExperiences,
    });

    // TODO: Dispatch Section Experience Delete Action
  }

  @Action(Resume.ExperienceTitleUpdate)
  experienceTitleUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.ExperienceTitleUpdate,
  ) {
    const experience = ctx.getState().experiences[action.id];
    const updatedExperience = {
      ...experience,
      title: action.title,
    };

    ctx.setState({
      ...ctx.getState(),
      experiences: {
        ...ctx.getState().experiences,
        [updatedExperience.id]: updatedExperience,
      },
    });
  }

  @Action(Resume.ExperienceOrganizationUpdate)
  experienceOrganizationUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.ExperienceOrganizationUpdate,
  ) {
    const experience = ctx.getState().experiences[action.id];
    const updatedExperience = {
      ...experience,
      organization: action.organization,
    };

    ctx.setState({
      ...ctx.getState(),
      experiences: {
        ...ctx.getState().experiences,
        [updatedExperience.id]: updatedExperience,
      },
    });
  }

  @Action(Resume.ExperienceDurationUpdate)
  experienceDurationUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.ExperienceDurationUpdate,
  ) {
    const experience = ctx.getState().experiences[action.id];
    const updatedExperience = {
      ...experience,
      duration: action.duration,
    };

    ctx.setState({
      ...ctx.getState(),
      experiences: {
        ...ctx.getState().experiences,
        [updatedExperience.id]: updatedExperience,
      },
    });
  }

  @Action(Resume.ExperienceLocationUpdate)
  experienceLocationUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.ExperienceLocationUpdate,
  ) {
    const experience = ctx.getState().experiences[action.id];
    const updatedExperience = {
      ...experience,
      location: action.location,
    };

    ctx.setState({
      ...ctx.getState(),
      experiences: {
        ...ctx.getState().experiences,
        [updatedExperience.id]: updatedExperience,
      },
    });
  }

  @Action(Resume.ExperienceDescriptionUpdate)
  experienceDescriptionUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.ExperienceDescriptionUpdate,
  ) {
    const experienceDescriptions = Object.values(
      ctx.getState().experienceDescriptions,
    ).filter((description) => description.experienceId === action.id);

    const prevDescriptions = new Map(
      experienceDescriptions.map((description) => [
        description.position,
        description,
      ]),
    );

    const newDescriptions = action.description
      .split('\n')
      .filter((value) => value.trim())
      .map((value, index) =>
        prevDescriptions.has(index)
          ? { ...prevDescriptions.get(index), description: value }
          : {
              id: this.uuid.rnd(),
              experienceId: action.id,
              position: index,
              description: value,
            },
      )
      .reduce(
        (acc, description) => ({
          ...acc,
          [description.id as string]: description,
        }),
        {},
      );

    const otherExperienceDescriptions = Object.values(
      ctx.getState().experienceDescriptions,
    )
      .filter((description) => description.experienceId !== action.id)
      .reduce(
        (acc, description) => ({ ...acc, [description.id]: description }),
        {},
      );

    ctx.setState({
      ...ctx.getState(),
      experienceDescriptions: {
        ...otherExperienceDescriptions,
        ...newDescriptions,
      },
    });

    // TODO: Dispatch Create and Delete Section Actions
  }

  @Action(Resume.ExperienceSkillsUpdate)
  experienceSkillsUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.ExperienceSkillsUpdate,
  ) {
    const experienceSkills = Object.values(
      ctx.getState().experienceSkills,
    ).filter((skill) => skill.experienceId === action.id);

    const prevSkills = new Map(
      experienceSkills.map((skill) => [skill.position, skill]),
    );

    const newSkills = action.skills
      .split(',')
      .filter((value) => value.trim())
      .map((value, index) =>
        prevSkills.has(index)
          ? { ...prevSkills.get(index), skill: value }
          : {
              id: this.uuid.rnd(),
              experienceId: action.id,
              position: index,
              skill: value,
            },
      )
      .reduce(
        (acc, skill) => ({
          ...acc,
          [skill.id as string]: skill,
        }),
        {},
      );

    const otherExperienceSkills = Object.values(ctx.getState().experienceSkills)
      .filter((skill) => skill.experienceId !== action.id)
      .reduce((acc, skill) => ({ ...acc, [skill.id]: skill }), {});

    ctx.setState({
      ...ctx.getState(),
      experienceSkills: {
        ...otherExperienceSkills,
        ...newSkills,
      },
    });

    // TODO: Dispatch Section Create and Delete Actions
  }

  @Action(Resume.SkillCreate)
  skillCreate(ctx: StateContext<ResumeStateModel>, action: Resume.SkillCreate) {
    const skill = { id: action.id, name: '', proficiency: 0 };
    const updatedSkills = {
      ...ctx.getState().skills,
      [skill.id]: skill,
    };

    ctx.setState({
      ...ctx.getState(),
      skills: updatedSkills,
    });

    // TODO: Dispatch Sections Skill Create Action
  }

  @Action(Resume.SkillDelete)
  skillDelete(ctx: StateContext<ResumeStateModel>, action: Resume.SkillDelete) {
    const updatedSkills = Object.values(ctx.getState().skills)
      .filter((skill) => skill.id !== action.id)
      .reduce((acc, skill) => ({ ...acc, [skill.id]: skill }), {});

    ctx.setState({
      ...ctx.getState(),
      skills: updatedSkills,
    });

    // TODO: Dispatch Section Skills Delete Action
  }

  @Action(Resume.SkillNameUpdate)
  skillNameUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.SkillNameUpdate,
  ) {
    const skill = ctx.getState().skills[action.id];
    const updatedSkill = { ...skill, name: action.name };

    ctx.setState({
      ...ctx.getState(),
      skills: {
        ...ctx.getState().skills,
        [updatedSkill.id]: updatedSkill,
      },
    });
  }

  @Action(Resume.SkillProficiencyUpdate)
  skillProficiencyUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.SkillProficiencyUpdate,
  ) {
    const skill = ctx.getState().skills[action.id];
    const updatedSkill = { ...skill, proficiency: action.proficiency };

    ctx.setState({
      ...ctx.getState(),
      skills: {
        ...ctx.getState().skills,
        [updatedSkill.id]: updatedSkill,
      },
    });
  }

  @Action(Resume.CertificationCreate)
  certificationCreate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.CertificationCreate,
  ) {
    const certification = {
      id: action.id,
      title: '',
      organization: '',
      year: '',
      location: '',
    };
    const updatedCertifications = {
      ...ctx.getState().certifications,
      [certification.id]: certification,
    };

    ctx.setState({
      ...ctx.getState(),
      certifications: updatedCertifications,
    });

    // TODO: Dispatch Section Create Certification Action
  }

  @Action(Resume.CertificationDelete)
  certificationDelete(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.CertificationDelete,
  ) {
    const updatedCertifications = Object.values(ctx.getState().certifications)
      .filter((certification) => certification.id !== action.id)
      .reduce(
        (acc, certification) => ({ ...acc, [certification.id]: certification }),
        {},
      );

    ctx.setState({
      ...ctx.getState(),
      certifications: updatedCertifications,
    });

    // TODO: Dispatch Section Certification Delete action
  }

  @Action(Resume.CertificationTitleUpdate)
  certificationTitleUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.CertificationTitleUpdate,
  ) {
    const certification = ctx.getState().certifications[action.id];
    const updatedCertification = { ...certification, title: action.title };

    ctx.setState({
      ...ctx.getState(),
      certifications: {
        ...ctx.getState().certifications,
        [updatedCertification.id]: updatedCertification,
      },
    });
  }

  @Action(Resume.CertificationOrganizationUpdate)
  certificationOrganizationUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.CertificationOrganizationUpdate,
  ) {
    const certification = ctx.getState().certifications[action.id];
    const updatedCertification = {
      ...certification,
      organization: action.organization,
    };

    ctx.setState({
      ...ctx.getState(),
      certifications: {
        ...ctx.getState().certifications,
        [updatedCertification.id]: updatedCertification,
      },
    });
  }

  @Action(Resume.CertificationYearUpdate)
  certificationYearUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.CertificationYearUpdate,
  ) {
    const certification = ctx.getState().certifications[action.id];
    const updatedCertification = {
      ...certification,
      year: action.year,
    };

    ctx.setState({
      ...ctx.getState(),
      certifications: {
        ...ctx.getState().certifications,
        [updatedCertification.id]: updatedCertification,
      },
    });
  }
}
