import { Injectable } from '@angular/core';
import { State, Action, StateContext, createSelector } from '@ngxs/store';
import { Resume } from './resume.actions';
import { empty } from 'rxjs';

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
  SOCIAL = 'SOCIAL',
  NONE = 'NONE',
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

  static selectorValue(selectorType: SelectorType, index: number = 0): any {
    console.log('Selector Type: ' + selectorType);
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
      case SelectorType.SOCIAL:
        return this.selectorSocial(index);
      default:
        throw new Error('Unknow selector type: ' + selectorType);
    }
  }

  private static selectorName() {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) =>  state.name,
    );
  }

  private static selectorTitle() {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) =>  state.title,
    );
  }

  private static selectorSummary() {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) =>  state.summary,
    );
  }

  private static selectorEmail() {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) =>  state.email,
    );
  }

  private static selectorLocation() {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) =>  state.location,
    );
  }

  private static selectorPhone() {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) =>  state.phone,
    );
  }

  private static selectorSocialList() {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) =>  [...Array(state.socials.length).keys()],
    );
  }

  private static selectorSocial(index: number) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) =>  state.socials[index],
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
