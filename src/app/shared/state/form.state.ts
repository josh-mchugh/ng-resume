import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { Form } from './form.actions';
import { Resume } from './resume.actions';

export interface FormStateModel {
  name: string;
  title: string;
  summary: string;
  phone: string;
  email: string;
  location: string;
  socials: Array<FormSocialModel>;
  experiences: Array<FormExperienceModel>;
  skills: Array<FormSkillModel>;
  certifications: Array<FormCertificationModel>;
}

export interface FormSocialModel {
  name: string;
  url: string;
}

function emptySocial(): FormSocialModel {
  return { name: '', url: '' };
}

export interface FormExperienceModel {
  title: string;
  organization: string;
  duration: string;
  location: string;
  description: string;
  skills: string;
}

function emptyExperience(): FormExperienceModel {
  return {
    title: '',
    organization: '',
    duration: '',
    location: '',
    description: '',
    skills: '',
  };
}

export interface FormSkillModel {
  name: string;
  proficiency: number;
}

function emptySkill(): FormSkillModel {
  return {
    name: '',
    proficiency: 0,
  };
}

export interface FormCertificationModel {
  title: string;
  organization: string;
  year: string;
  location: string;
}

function emptyCertification(): FormCertificationModel {
  return {
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
    socials: [emptySocial()],
    experiences: [emptyExperience()],
    skills: [emptySkill()],
    certifications: [emptyCertification()],
  },
})
@Injectable()
export class FormState {
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
    const state = ctx.getState();
    const updatedSocials = state.socials.concat(emptySocial());
    ctx.setState({
      ...state,
      socials: updatedSocials,
    });
    const resumeSocials = this.mapFormSocialsToResumeSocials(updatedSocials);
    ctx.dispatch(new Resume.SocialsUpdate(resumeSocials));
  }

  @Action(Form.Social.Delete)
  socialDelete(ctx: StateContext<FormStateModel>, action: Form.Social.Delete) {
    const state = ctx.getState();
    const updatedSocials = state.socials.filter(
      (social, index) => index !== action.index,
    );
    ctx.setState({
      ...state,
      socials: updatedSocials,
    });
    const resumeSocials = this.mapFormSocialsToResumeSocials(updatedSocials);
    ctx.dispatch(new Resume.SocialsUpdate(resumeSocials));
  }

  @Action(Form.Social.NameUpdate)
  socialNameUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Social.NameUpdate,
  ) {
    const state = ctx.getState();
    const updatedSocials = state.socials.map((social, index) =>
      index === action.index ? { ...social, name: action.name } : social,
    );
    ctx.setState({
      ...state,
      socials: updatedSocials,
    });
    const resumeSocials = this.mapFormSocialsToResumeSocials(updatedSocials);
    ctx.dispatch(new Resume.SocialsUpdate(resumeSocials));
  }

  @Action(Form.Social.UrlUpdate)
  socialUrlUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Social.UrlUpdate,
  ) {
    const state = ctx.getState();
    const updatedSocials = state.socials.map((social, index) =>
      index === action.index ? { ...social, url: action.url } : social,
    );
    ctx.setState({
      ...state,
      socials: updatedSocials,
    });
    const resumeSocials = this.mapFormSocialsToResumeSocials(updatedSocials);
    ctx.dispatch(new Resume.SocialsUpdate(resumeSocials));
  }
  /*
  @Action(Form.Experience.Create)
  experienceCreate(ctx: StateContext<FormStateModel>) {
    const state = ctx.getState();
    const updatedExperiences = state.experiences.concat(emptyExperience());
    ctx.setState({
      ...state,
      experiences: updatedExperiences,
    });
  }

  @Action(Form.Experience.Delete)
  experienceDelete(
    ctx: StateContext<FormStateModel>,
    action: Form.Experience.Delete,
  ) {
    const state = ctx.getState();
    const updatedExperiences = state.experiences.filter(
      (experience, index) => index !== action.index,
    );
    ctx.setState({
      ...state,
      experiences: updatedExperiences,
    });
    const resumeExperiences =
      this.mapFormExperiencesToResumeExperiences(updatedExperiences);
    ctx.dispatch(new Resume.ExperiencesUpdate(resumeExperiences));
  }

  @Action(Form.Experience.TitleUpdate)
  experienceTitleUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Experience.TitleUpdate,
  ) {
    const state = ctx.getState();
    const updatedExperiences = state.experiences.map((experience, index) =>
      index === action.index
        ? { ...experience, title: action.title }
        : experience,
    );
    ctx.setState({
      ...state,
      experiences: updatedExperiences,
    });
    const resumeExperiences =
      this.mapFormExperiencesToResumeExperiences(updatedExperiences);
    ctx.dispatch(new Resume.ExperiencesUpdate(resumeExperiences));
  }

  @Action(Form.Experience.OrganizationUpdate)
  experienceOrganizationUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Experience.OrganizationUpdate,
  ) {
    const state = ctx.getState();
    const updatedExperiences = state.experiences.map((experience, index) =>
      index == action.index
        ? { ...experience, organization: action.organization }
        : experience,
    );
    ctx.setState({
      ...state,
      experiences: updatedExperiences,
    });
    const resumeExperiences =
      this.mapFormExperiencesToResumeExperiences(updatedExperiences);
    ctx.dispatch(new Resume.ExperiencesUpdate(resumeExperiences));
  }

  @Action(Form.Experience.DurationUpdate)
  experienceDurationUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Experience.DurationUpdate,
  ) {
    const state = ctx.getState();
    const updatedExperiences = state.experiences.map((experience, index) =>
      index === action.index
        ? { ...experience, duration: action.duration }
        : experience,
    );
    ctx.setState({
      ...state,
      experiences: updatedExperiences,
    });
    const resumeExperiences =
      this.mapFormExperiencesToResumeExperiences(updatedExperiences);
    ctx.dispatch(new Resume.ExperiencesUpdate(resumeExperiences));
  }

  @Action(Form.Experience.LocationUpdate)
  experienceLocationUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Experience.LocationUpdate,
  ) {
    const state = ctx.getState();
    const updatedExperiences = state.experiences.map((experience, index) =>
      index === action.index
        ? { ...experience, location: action.location }
        : experience,
    );
    ctx.setState({
      ...state,
      experiences: updatedExperiences,
    });
    const resumeExperiences =
      this.mapFormExperiencesToResumeExperiences(updatedExperiences);
    ctx.dispatch(new Resume.ExperiencesUpdate(resumeExperiences));
  }

  @Action(Form.Experience.DescriptionUpdate)
  experienceDescriptionUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Experience.DescriptionUpdate,
  ) {
    const state = ctx.getState();
    const updatedExperiences = state.experiences.map((experience, index) =>
      index === action.index
        ? { ...experience, description: action.description }
        : experience,
    );
    ctx.setState({
      ...state,
      experiences: updatedExperiences,
    });
    const resumeExperiences =
      this.mapFormExperiencesToResumeExperiences(updatedExperiences);
    ctx.dispatch(new Resume.ExperiencesUpdate(resumeExperiences));
  }

  @Action(Form.Experience.SkillsUpdate)
  experienceSkillsUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Experience.SkillsUpdate,
  ) {
    const state = ctx.getState();
    const updatedExperiences = state.experiences.map((experience, index) =>
      index === action.index
        ? { ...experience, skills: action.skills }
        : experience,
    );
    ctx.setState({
      ...state,
      experiences: updatedExperiences,
    });
    const resumeExperiences =
      this.mapFormExperiencesToResumeExperiences(updatedExperiences);
    ctx.dispatch(new Resume.ExperiencesUpdate(resumeExperiences));
  }

  @Action(Form.Skill.Create)
  skillCreate(ctx: StateContext<FormStateModel>) {
    const state = ctx.getState();
    const updatedSkills = state.skills.concat(emptySkill());
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
      emptyCertification(),
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
*/
  /* Util Functions */
  mapFormSocialsToResumeSocials(
    formSocials: FormSocialModel[],
  ): Resume.Social[] {
    return formSocials.map((social, index) => {
      return new Resume.Social(index.toString(), social.name, social.url);
    });
  }
  /*
  mapFormExperiencesToResumeExperiences(
    formExperiences: Array<FormExperienceModel>,
  ): Array<ResumeExperienceModel> {
    return formExperiences.map((experience) => ({
      title: experience.title,
      organization: experience.organization,
      duration: experience.duration,
      location: experience.location,
      descriptions: experience.description.length
        ? experience.description.split('\n')
        : [],
      skills: experience.skills.length ? experience.skills.split(', ') : [],
    }));
  }

  mapFormSkillsToResumeSkills(
    formSkills: Array<FormSkillModel>,
  ): Array<ResumeSkillModel> {
    return formSkills.map((skill) => ({ ...skill }));
  }

  mapFormCertificationsToResumeCertifications(
    formCertifications: Array<FormCertificationModel>,
  ): Array<ResumeCertificationModel> {
    return formCertifications.map((certification) => ({ ...certification }));
  }
  */
}
