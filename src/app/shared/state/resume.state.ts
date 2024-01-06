import { Injectable } from '@angular/core';
import { State, Action, StateContext, createSelector } from '@ngxs/store';
import { Resume } from './resume.actions';

export interface ResumeStateModel {
  name: string;
  title: string;
  summary: string;
  phone: string;
  email: string;
  location: string;
  socials: Array<ResumeSocialModel>;
  experiences: Array<ResumeExperienceModel>;
  skills: Array<ResumeSkillModel>;
  certifications: Array<ResumeCertificationModel>;
}

export interface ResumeSocialModel {
  icon: string;
  name: string;
  url: string;
}

export interface ResumeExperienceModel {
  title: string;
  organization: string;
  duration: string;
  location: string;
  descriptions: Array<string>;
  skills: Array<string>;
}

export interface ResumeSkillModel {
  name: string;
  proficiency: number;
}

export interface ResumeCertificationModel {
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
    phone: '(123) 456-8899',
    email: 'info@youremail.com',
    location: 'New York, New York',
    socials: [
      {
        name: 'Facebook',
        icon: 'fa-brands fa-facebook',
        url: 'https://facebook.com/profile',
      },
      {
        name: 'Twitter',
        icon: 'fa-brands fa-twitter',
        url: 'https://twitter.com/profile',
      },
      {
        name: 'LinkedIn',
        icon: 'fa-brands fa-linkedin',
        url: 'https://linkedin.com/profile',
      },
    ],
    experiences: [
      {
        organization: 'Company Name Here',
        title: 'Senior Web Developer',
        duration: 'Jan 2023 - Present',
        location: 'Remote',
        descriptions: [
          'Efficiently unleash cross-media information without cross-media value.',
          'Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar solutions without functional solutions.',
          'Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas',
        ],
        skills: [
          'Photoshop',
          'HTML',
          'CSS',
          'Illustrator',
          'PHP',
          'JavaScript',
        ],
      },
      {
        organization: 'Company Name Here',
        title: 'Senior Web Developer',
        duration: 'Jan 2022 – Dec 2022',
        location: 'Remote',
        descriptions: [
          'Collaboratively administrate empowered markets via plug-and-play networks.',
          'Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI.',
          'Completely pursue scalable customer service through sustainable potentialities.',
        ],
        skills: [
          'Photoshop',
          'HTML',
          'CSS',
          'Illustrator',
          'PHP',
          'JavaScript',
        ],
      },
      {
        organization: 'Company Name Here',
        title: 'Senior Web Developer',
        duration: 'Jan 2021 – Dec 2021',
        location: 'Remote',
        descriptions: [
          'Phosfluorescently engage worldwide methodologies with web-enabled technology. Interactively coordinate proactive e-commerce.',
          'Proactively envisioned multimedia based expertise and cross-media growth strategies.',
          'Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas. ',
        ],
        skills: [
          'Photoshop',
          'HTML',
          'CSS',
          'Illustrator',
          'PHP',
          'JavaScript',
        ],
      },
    ],
    skills: [
      {
        name: 'Photoshop',
        proficiency: 4,
      },
      {
        name: 'Illustrator',
        proficiency: 2,
      },
      {
        name: 'PHP',
        proficiency: 2,
      },
      {
        name: 'HTML',
        proficiency: 3,
      },
      {
        name: 'WordPress',
        proficiency: 3,
      },
      {
        name: 'CSS',
        proficiency: 3,
      },
      {
        name: 'Joomla',
        proficiency: 3,
      },
    ],
    certifications: [
      {
        title: 'Master Degree in Studies',
        organization: 'Name of University',
        location: 'New York, New York',
        year: '2012',
      },
    ],
  },
})
@Injectable()
export class ResumeState {
  // Ignore until refactoring out generic type any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static selectorValue(selectorType: SelectorType, coord: number[] = []): any {
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
        return this.selectorSocialIcon(coord);
      case SelectorType.SOCIAL_NAME:
        return this.selectorSocialName(coord);
      case SelectorType.SOCIAL_URL:
        return this.selectorSocialUrl(coord);
      case SelectorType.EXPERIENCE_LIST:
        return this.selectorExperienceList();
      case SelectorType.EXPERIENCE_TITLE:
        return this.selectorExperienceTitle(coord);
      case SelectorType.EXPERIENCE_DURATION:
        return this.selectorExperienceDuration(coord);
      case SelectorType.EXPERIENCE_ORGANIZATION:
        return this.selectorExperienceOrganization(coord);
      case SelectorType.EXPERIENCE_LOCATION:
        return this.selectorExperienceLocation(coord);
      case SelectorType.EXPERIENCE_DESCRIPTION_LIST:
        return this.selectorExperienceDescriptionList(coord);
      case SelectorType.EXPERIENCE_DESCRIPTION:
        return this.selectorExperienceDescription(coord);
      case SelectorType.EXPERIENCE_SKILL_LIST:
        return this.selectorExperienceSkillList(coord);
      case SelectorType.EXPERIENCE_SKILL:
        return this.selectorExperienceSkill(coord);
      case SelectorType.SKILL_LIST:
        return this.selectorSkillList();
      case SelectorType.SKILL_NAME:
        return this.selectorSkillName(coord);
      case SelectorType.SKILL_BLOCKS:
        return this.selectorSkillBlocks(coord);
      case SelectorType.CERTIFICATION_LIST:
        return this.selectorCertificationList();
      case SelectorType.CERTIFICATION_TITLE:
        return this.selectorCertificationTitle(coord);
      case SelectorType.CERTIFICATION_YEAR:
        return this.selectorCertificationYear(coord);
      case SelectorType.CERTIFICATION_ORGANIZATION:
        return this.selectorCertificationOrganization(coord);
      case SelectorType.CERTIFICATION_LOCATION:
        return this.selectorCertificationLocation(coord);
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
    return createSelector([ResumeState], (state: ResumeStateModel) => [
      ...Array(state.socials.length).keys(),
    ]);
  }

  private static selectorSocialIcon(coord: number[]) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.socials[coord[0]].icon,
    );
  }

  private static selectorSocialName(coord: number[]) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.socials[coord[0]].name,
    );
  }

  private static selectorSocialUrl(coord: number[]) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.socials[coord[0]].url,
    );
  }

  private static selectorExperienceList() {
    return createSelector([ResumeState], (state: ResumeStateModel) => [
      ...Array(state.experiences.length).keys(),
    ]);
  }

  private static selectorExperienceTitle(coord: number[]) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.experiences[coord[0]].title,
    );
  }

  private static selectorExperienceDuration(coord: number[]) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.experiences[coord[0]].duration,
    );
  }

  private static selectorExperienceOrganization(coord: number[]) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.experiences[coord[0]].organization,
    );
  }

  private static selectorExperienceLocation(coord: number[]) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.experiences[coord[0]].location,
    );
  }

  private static selectorExperienceDescriptionList(coord: number[]) {
    return createSelector([ResumeState], (state: ResumeStateModel) => [
      ...Array(state.experiences[coord[0]].descriptions.length).keys(),
    ]);
  }

  private static selectorExperienceDescription(coord: number[]) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) =>
        state.experiences[coord[1]].descriptions[coord[0]],
    );
  }

  private static selectorExperienceSkillList(coord: number[]) {
    return createSelector([ResumeState], (state: ResumeStateModel) => [
      ...Array(state.experiences[coord[0]].skills.length).keys(),
    ]);
  }

  private static selectorExperienceSkill(coord: number[]) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.experiences[coord[1]].skills[coord[0]],
    );
  }

  private static selectorSkillList() {
    return createSelector([ResumeState], (state: ResumeStateModel) => [
      ...Array(state.skills.length).keys(),
    ]);
  }

  private static selectorSkillName(coord: number[]) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.skills[coord[0]].name,
    );
  }

  private static selectorSkillBlocks(coord: number[]) {
    return createSelector([ResumeState], (state: ResumeStateModel) =>
      [...Array(5).keys()].map((value) => {
        return {
          active: state.skills[coord[0]].proficiency >= value + 1,
        };
      }),
    );
  }

  private static selectorCertificationList() {
    return createSelector([ResumeState], (state: ResumeStateModel) => [
      ...Array(state.certifications.length).keys(),
    ]);
  }

  private static selectorCertificationTitle(coord: number[]) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.certifications[coord[0]].title,
    );
  }

  private static selectorCertificationYear(coord: number[]) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.certifications[coord[0]].year,
    );
  }

  private static selectorCertificationOrganization(coord: number[]) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.certifications[coord[0]].organization,
    );
  }

  private static selectorCertificationLocation(coord: number[]) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.certifications[coord[0]].location,
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

  @Action(Resume.SocialsUpdate)
  socialsUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.SocialsUpdate,
  ) {
    ctx.setState({
      ...ctx.getState(),
      socials: action.socials,
    });
  }

  @Action(Resume.ExperiencesUpdate)
  experiencesUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.ExperiencesUpdate,
  ) {
    ctx.setState({
      ...ctx.getState(),
      experiences: action.experiences,
    });
  }

  @Action(Resume.SkillsUpdate)
  skillsUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.SkillsUpdate,
  ) {
    ctx.setState({
      ...ctx.getState(),
      skills: action.skills,
    });
  }

  @Action(Resume.CertificationsUpdate)
  certificationsUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.CertificationsUpdate,
  ) {
    ctx.setState({
      ...ctx.getState(),
      certifications: action.certifications,
    });
  }
}
