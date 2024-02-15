import { Injectable } from '@angular/core';
import { Action, createSelector, State, StateContext } from '@ngxs/store';
import { Form } from './form.actions';
import { Resume } from './resume.actions';
import ShortUniqueId from 'short-unique-id';

const uuid = new ShortUniqueId();

export interface FormStateModel {
  name: string;
  title: string;
  summary: string;
  phone: string;
  email: string;
  location: string;
  socials: Socials;
  experiences: Experiences;
  skills: FormSkillModel[];
  certifications: FormCertificationModel[];
}

interface Socials {
  byId: { [id: string]: FormSocial };
  allIds: string[];
}

export interface FormSocial {
  id: string;
  name: string;
  url: string;
}

interface Experiences {
  byId: { [id: string]: FormExperience };
  allIds: string[];
}

export interface FormExperience {
  id: string;
  title: string;
  organization: string;
  duration: string;
  location: string;
  description: string;
  skills: string;
}

function emptyExperience(id: string): FormExperience {
  return {
    id: id,
    title: '',
    organization: '',
    duration: '',
    location: '',
    description: '',
    skills: '',
  };
}

export interface FormSkillModel {
  id: string;
  name: string;
  proficiency: number;
}

function emptySkill(id: string): FormSkillModel {
  return {
    id: id,
    name: '',
    proficiency: 0,
  };
}

export interface FormCertificationModel {
  id: string;
  title: string;
  organization: string;
  year: string;
  location: string;
}

function emptyCertification(id: string): FormCertificationModel {
  return {
    id: id,
    title: '',
    organization: '',
    year: '',
    location: '',
  };
}

@State<FormStateModel>({
  name: 'form',
  defaults: {
    name: '',
    title: '',
    summary: '',
    phone: '',
    email: '',
    location: '',
    socials: {
      byId: {},
      allIds: [],
    },
    experiences: {
      byId: {},
      allIds: [],
    },
    skills: [emptySkill(uuid.rnd())],
    certifications: [emptyCertification(uuid.rnd())],
  },
})
@Injectable()
export class FormState {
  static getSocials(): (state: FormStateModel) => FormSocial[] {
    return createSelector([FormState], (state: FormStateModel) =>
      Object.values(state.socials.byId),
    );
  }

  static getExperiences(): (state: FormStateModel) => FormExperience[] {
    return createSelector([FormState], (state: FormStateModel) =>
      Object.values(state.experiences.byId),
    );
  }

  @Action(Form.NameUpdate)
  formNameUpdate(ctx: StateContext<FormStateModel>, action: Form.NameUpdate) {
    ctx.setState({
      ...ctx.getState(),
      name: action.name,
    });
    ctx.dispatch(new Resume.NameUpdate(action.name));
  }

  @Action(Form.TitleUpdate)
  formTitleUpdate(ctx: StateContext<FormStateModel>, action: Form.TitleUpdate) {
    ctx.setState({
      ...ctx.getState(),
      title: action.title,
    });
    ctx.dispatch(new Resume.TitleUpdate(action.title));
  }

  @Action(Form.SummaryUpdate)
  formSummaryUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.SummaryUpdate,
  ) {
    ctx.setState({
      ...ctx.getState(),
      summary: action.summary,
    });
    ctx.dispatch(new Resume.SummaryUpdate(action.summary));
  }

  @Action(Form.PhoneUpdate)
  formPhoneUpdate(ctx: StateContext<FormStateModel>, action: Form.PhoneUpdate) {
    ctx.setState({
      ...ctx.getState(),
      phone: action.phone,
    });
    ctx.dispatch(new Resume.PhoneUpdate(action.phone));
  }

  @Action(Form.EmailUpdate)
  formEmailUpdate(ctx: StateContext<FormStateModel>, action: Form.EmailUpdate) {
    ctx.setState({
      ...ctx.getState(),
      email: action.email,
    });
    ctx.dispatch(new Resume.EmailUpdate(action.email));
  }

  @Action(Form.LocationUpdate)
  formLocationUpate(
    ctx: StateContext<FormStateModel>,
    action: Form.LocationUpdate,
  ) {
    ctx.setState({
      ...ctx.getState(),
      location: action.location,
    });
    ctx.dispatch(new Resume.LocationUpdate(action.location));
  }

  @Action(Form.Social.Create)
  socialCreate(ctx: StateContext<FormStateModel>) {
    const social = { id: uuid.rnd(), name: '', url: '', icon: '' };
    const updatedById = { ...ctx.getState().socials.byId, [social.id]: social };
    const updatedAllIds = Object.keys(updatedById);

    ctx.setState({
      ...ctx.getState(),
      socials: {
        byId: updatedById,
        allIds: updatedAllIds,
      },
    });

    return ctx.dispatch(new Resume.SocialCreate(social.id));
  }

  @Action(Form.Social.Delete)
  socialDelete(ctx: StateContext<FormStateModel>, action: Form.Social.Delete) {
    const updatedById = Object.values(ctx.getState().socials.byId)
      .filter((social) => action.id !== social.id)
      .reduce((acc, social) => ({ ...acc, [social.id]: social }), {});
    const updatedAllIds = Object.keys(updatedById);

    ctx.setState({
      ...ctx.getState(),
      socials: {
        byId: updatedById,
        allIds: updatedAllIds,
      },
    });

    return ctx.dispatch(new Resume.SocialDelete(action.id));
  }

  @Action(Form.Social.NameUpdate)
  socialNameUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Social.NameUpdate,
  ) {
    const social = ctx.getState().socials.byId[action.id];
    const updatedSocial = { ...social, name: action.name };

    ctx.setState({
      ...ctx.getState(),
      socials: {
        ...ctx.getState().socials,
        byId: {
          ...ctx.getState().socials.byId,
          [updatedSocial.id]: updatedSocial,
        },
      },
    });

    return ctx.dispatch(
      new Resume.SocialNameUpdate(updatedSocial.id, updatedSocial.name),
    );
  }

  @Action(Form.Social.UrlUpdate)
  socialUrlUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Social.UrlUpdate,
  ) {
    const social = ctx.getState().socials.byId[action.id];
    const updatedSocial = { ...social, url: action.url };

    ctx.setState({
      ...ctx.getState(),
      socials: {
        ...ctx.getState().socials,
        byId: {
          ...ctx.getState().socials.byId,
          [updatedSocial.id]: updatedSocial,
        },
      },
    });

    return ctx.dispatch(
      new Resume.SocialUrlUpdate(updatedSocial.id, updatedSocial.url),
    );
  }

  @Action(Form.Experience.Create)
  experienceCreate(ctx: StateContext<FormStateModel>) {
    const experiences = ctx.getState().experiences;
    const experience = {
      id: uuid.rnd(),
      title: '',
      organization: '',
      duration: '',
      location: '',
      description: '',
      skills: '',
    };

    ctx.setState({
      ...ctx.getState(),
      experiences: {
        byId: { ...experiences.byId, [experience.id]: experience },
        allIds: [...experiences.allIds, experience.id],
      },
    });

    return ctx.dispatch(new Resume.ExperienceCreate(experience.id));
  }

  @Action(Form.Experience.Delete)
  experienceDelete(
    ctx: StateContext<FormStateModel>,
    action: Form.Experience.Delete,
  ) {
    const updatedById = Object.values(ctx.getState().experiences.byId)
      .filter((experience) => experience.id !== action.id)
      .reduce(
        (acc, experience) => ({ ...acc, [experience.id]: experience }),
        {},
      );
    const updatedAllIds = Object.keys(updatedById);

    ctx.setState({
      ...ctx.getState(),
      experiences: {
        byId: updatedById,
        allIds: updatedAllIds,
      },
    });

    return ctx.dispatch(new Resume.ExperienceDelete(action.id));
  }

  @Action(Form.Experience.TitleUpdate)
  experienceTitleUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Experience.TitleUpdate,
  ) {
    const experience = ctx.getState().experiences.byId[action.id];
    const updatedExperience = { ...experience, title: action.title };

    ctx.setState({
      ...ctx.getState(),
      experiences: {
        ...ctx.getState().experiences,
        byId: {
          ...ctx.getState().experiences.byId,
          [updatedExperience.id]: updatedExperience,
        },
      },
    });

    return ctx.dispatch(
      new Resume.ExperienceTitleUpdate(
        updatedExperience.id,
        updatedExperience.title,
      ),
    );
  }

  @Action(Form.Experience.OrganizationUpdate)
  experienceOrganizationUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Experience.OrganizationUpdate,
  ) {
    const experience = ctx.getState().experiences.byId[action.id];
    const updatedExperience = {
      ...experience,
      organization: action.organization,
    };

    ctx.setState({
      ...ctx.getState(),
      experiences: {
        ...ctx.getState().experiences,
        byId: {
          ...ctx.getState().experiences.byId,
          [updatedExperience.id]: updatedExperience,
        },
      },
    });

    return ctx.dispatch(
      new Resume.ExperienceOrganizationUpdate(
        updatedExperience.id,
        updatedExperience.organization,
      ),
    );
  }

  @Action(Form.Experience.DurationUpdate)
  experienceDurationUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Experience.DurationUpdate,
  ) {
    const experience = ctx.getState().experiences.byId[action.id];
    const updatedExperience = { ...experience, duration: action.duration };

    ctx.setState({
      ...ctx.getState(),
      experiences: {
        ...ctx.getState().experiences,
        byId: {
          ...ctx.getState().experiences.byId,
          [updatedExperience.id]: updatedExperience,
        },
      },
    });

    return ctx.dispatch(
      new Resume.ExperienceDurationUpdate(
        updatedExperience.id,
        updatedExperience.duration,
      ),
    );
  }

  @Action(Form.Experience.LocationUpdate)
  experienceLocationUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Experience.LocationUpdate,
  ) {
    const experience = ctx.getState().experiences.byId[action.id];
    const updatedExperience = { ...experience, location: action.location };

    ctx.setState({
      ...ctx.getState(),
      experiences: {
        ...ctx.getState().experiences,
        byId: {
          ...ctx.getState().experiences.byId,
          [updatedExperience.id]: updatedExperience,
        },
      },
    });

    return ctx.dispatch(
      new Resume.ExperienceLocationUpdate(
        updatedExperience.id,
        updatedExperience.location,
      ),
    );
  }

  @Action(Form.Experience.DescriptionUpdate)
  experienceDescriptionUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Experience.DescriptionUpdate,
  ) {
    const experience = ctx.getState().experiences.byId[action.id];
    const updatedExperience = {
      ...experience,
      description: action.description,
    };

    ctx.setState({
      ...ctx.getState(),
      experiences: {
        ...ctx.getState().experiences,
        byId: {
          ...ctx.getState().experiences.byId,
          [updatedExperience.id]: updatedExperience,
        },
      },
    });

    const descriptions = updatedExperience.description.split('\n')
      .filter((value) => value)
      .map((value, index) => new Resume.ExperienceDescription(index, value));
    return ctx.dispatch(new Resume.ExperienceDescriptionUpdate(updatedExperience.id, descriptions));
  }

  @Action(Form.Experience.SkillsUpdate)
  experienceSkillsUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Experience.SkillsUpdate,
  ) {
    const experience = ctx.getState().experiences.byId[action.id];
    const updatedExperience = { ...experience, skills: action.skills };

    ctx.setState({
      ...ctx.getState(),
      experiences: {
        ...ctx.getState().experiences,
        byId: {
          ...ctx.getState().experiences.byId,
          [updatedExperience.id]: updatedExperience,
        },
      },
    });

    // TODO: Dispatch Resume Experience Skills Update Action
  }

  @Action(Form.Skill.Create)
  skillCreate(ctx: StateContext<FormStateModel>) {
    const state = ctx.getState();
    const updatedSkills = state.skills.concat(emptySkill(uuid.rnd()));
    ctx.setState({
      ...state,
      skills: updatedSkills,
    });
    const resumeSkills = this.mapFormSkillsToResumeSkills(updatedSkills);
    ctx.dispatch(new Resume.SkillsUpdate(resumeSkills));
  }

  @Action(Form.Skill.Delete)
  skillDelete(ctx: StateContext<FormStateModel>, action: Form.Skill.Delete) {
    const state = ctx.getState();
    const updatedSkills = state.skills.filter(
      (skill, index) => index !== action.index,
    );
    ctx.setState({
      ...state,
      skills: updatedSkills,
    });
    const resumeSkills = this.mapFormSkillsToResumeSkills(updatedSkills);
    ctx.dispatch(new Resume.SkillsUpdate(resumeSkills));
  }

  @Action(Form.Skill.NameUpdate)
  skillNameUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Skill.NameUpdate,
  ) {
    const state = ctx.getState();
    const updatedSkills = state.skills.map((skill, index) =>
      index === action.index ? { ...skill, name: action.name } : skill,
    );
    ctx.setState({
      ...state,
      skills: updatedSkills,
    });
    const resumeSkills = this.mapFormSkillsToResumeSkills(updatedSkills);
    ctx.dispatch(new Resume.SkillsUpdate(resumeSkills));
  }

  @Action(Form.Skill.ProficiencyUpdate)
  skillProficiencyUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Skill.ProficiencyUpdate,
  ) {
    const state = ctx.getState();
    const updatedSkills = state.skills.map((skill, index) =>
      index == action.index
        ? { ...skill, proficiency: action.proficiency }
        : skill,
    );
    ctx.setState({
      ...state,
      skills: updatedSkills,
    });
    const resumeSkills = this.mapFormSkillsToResumeSkills(updatedSkills);
    ctx.dispatch(new Resume.SkillsUpdate(resumeSkills));
  }

  @Action(Form.Certification.Create)
  certificationCreate(ctx: StateContext<FormStateModel>) {
    const state = ctx.getState();
    const updatedCertifications = state.certifications.concat(
      emptyCertification(uuid.rnd()),
    );
    ctx.setState({
      ...state,
      certifications: updatedCertifications,
    });
    const resumeCertifications =
      this.mapFormCertificationsToResumeCertifications(updatedCertifications);
    ctx.dispatch(new Resume.CertificationsUpdate(resumeCertifications));
  }

  @Action(Form.Certification.Delete)
  certificationDelete(
    ctx: StateContext<FormStateModel>,
    action: Form.Certification.Delete,
  ) {
    const state = ctx.getState();
    const updatedCertifications = state.certifications.filter(
      (certification, index) => index !== action.index,
    );
    ctx.setState({
      ...state,
      certifications: updatedCertifications,
    });
    const resumeCertifications =
      this.mapFormCertificationsToResumeCertifications(updatedCertifications);
    ctx.dispatch(new Resume.CertificationsUpdate(resumeCertifications));
  }

  @Action(Form.Certification.TitleUpdate)
  certificationTitleUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Certification.TitleUpdate,
  ) {
    const state = ctx.getState();
    const updatedCertifications = state.certifications.map(
      (certification, index) =>
        index === action.index
          ? { ...certification, title: action.title }
          : certification,
    );
    ctx.setState({
      ...state,
      certifications: updatedCertifications,
    });
    const resumeCertifications =
      this.mapFormCertificationsToResumeCertifications(updatedCertifications);
    ctx.dispatch(new Resume.CertificationsUpdate(resumeCertifications));
  }

  @Action(Form.Certification.OrganizationUpdate)
  certificationOrganizationUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Certification.OrganizationUpdate,
  ) {
    const state = ctx.getState();
    const updatedCertifications = state.certifications.map(
      (certification, index) =>
        index === action.index
          ? { ...certification, organization: action.organization }
          : certification,
    );
    ctx.setState({
      ...state,
      certifications: updatedCertifications,
    });
    const resumeCertifications =
      this.mapFormCertificationsToResumeCertifications(updatedCertifications);
    ctx.dispatch(new Resume.CertificationsUpdate(resumeCertifications));
  }

  @Action(Form.Certification.YearUpdate)
  certificationYearUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Certification.YearUpdate,
  ) {
    const state = ctx.getState();
    const updatedCertifications = state.certifications.map(
      (certification, index) =>
        index === action.index
          ? { ...certification, year: action.year }
          : certification,
    );
    ctx.setState({
      ...state,
      certifications: updatedCertifications,
    });
    const resumeCertifications =
      this.mapFormCertificationsToResumeCertifications(updatedCertifications);
    ctx.dispatch(new Resume.CertificationsUpdate(resumeCertifications));
  }

  @Action(Form.Certification.LocationUpdate)
  certificationLocationUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Certification.LocationUpdate,
  ) {
    const state = ctx.getState();
    const updatedCertifications = state.certifications.map(
      (certification, index) =>
        index === action.index
          ? { ...certification, location: action.location }
          : certification,
    );
    ctx.setState({
      ...state,
      certifications: updatedCertifications,
    });
    const resumeCertifications =
      this.mapFormCertificationsToResumeCertifications(updatedCertifications);
    ctx.dispatch(new Resume.CertificationsUpdate(resumeCertifications));
  }

  /* Util Functions */
  mapFormSkillsToResumeSkills(formSkills: FormSkillModel[]): Resume.Skill[] {
    return formSkills.map((skill) => ({
      ...skill,
    }));
  }

  mapFormCertificationsToResumeCertifications(
    formCertifications: FormCertificationModel[],
  ): Resume.Certification[] {
    return formCertifications.map((certification) => ({
      ...certification,
    }));
  }
}
