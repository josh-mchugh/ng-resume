import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { Form } from './form.actions';
import { Resume } from './resume.actions';
import { ResumeSocialModel } from './resume.state';

export interface FormStateModel {
  name: string;
  title: string;
  summary: string;
  phone: string;
  email: string;
  location: string;
  socials: Array<FormSocialModel>;
  experiences: Array<FormExperienceModel>;
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
    skills: ''
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
    experiences: [emptyExperience()]
  }
})
@Injectable()
export class FormState {

  @Action(Form.NameUpdate)
  formNameUpdate(ctx: StateContext<FormStateModel>, action: Form.NameUpdate) {
    ctx.setState({
      ...ctx.getState(),
      name: action.name
    });
    ctx.dispatch(new Resume.NameUpdate(action.name));
  }

  @Action(Form.TitleUpdate)
  formTitleUpdate(ctx: StateContext<FormStateModel>, action: Form.TitleUpdate) {
    ctx.setState({
      ...ctx.getState(),
      title: action.title
    });
    ctx.dispatch(new Resume.TitleUpdate(action.title));
  }

  @Action(Form.SummaryUpdate)
  formSummaryUpdate(ctx: StateContext<FormStateModel>, action: Form.SummaryUpdate) {
    ctx.setState({
      ...ctx.getState(),
      summary: action.summary
    });
    ctx.dispatch(new Resume.SummaryUpdate(action.summary));
  }

  @Action(Form.PhoneUpdate)
  formPhoneUpdate(ctx: StateContext<FormStateModel>, action: Form.PhoneUpdate) {
    ctx.setState({
      ...ctx.getState(),
      phone: action.phone
    });
    ctx.dispatch(new Resume.PhoneUpdate(action.phone));
  }

  @Action(Form.EmailUpdate)
  formEmailUpdate(ctx: StateContext<FormStateModel>, action: Form.EmailUpdate) {
    ctx.setState({
      ...ctx.getState(),
      email: action.email
    });
    ctx.dispatch(new Resume.EmailUpdate(action.email));
  }

  @Action(Form.LocationUpdate)
  formLocationUpate(ctx: StateContext<FormStateModel>, action: Form.LocationUpdate) {
    ctx.setState({
      ...ctx.getState(),
      location: action.location
    });
    ctx.dispatch(new Resume.LocationUpdate(action.location));
  }

  @Action(Form.Social.Create)
  socialCreate(ctx: StateContext<FormStateModel>, action: Form.Social.Create) {
    const state = ctx.getState();
    const updatedSocials = state.socials.concat(emptySocial());
    ctx.setState({
      ...state,
      socials: updatedSocials
    });
    const resumeSocials = this.mapFormSocialsToResumeSocials(updatedSocials);
    ctx.dispatch(new Resume.SocialsUpdate(resumeSocials));
  }

  @Action(Form.Social.Delete)
  socialDelete(ctx: StateContext<FormStateModel>, action: Form.Social.Delete) {
    const state = ctx.getState();
    const updatedSocials = state.socials.filter((social, index) => index !== action.index);
    ctx.setState({
      ...state,
      socials: updatedSocials
    });
    const resumeSocials = this.mapFormSocialsToResumeSocials(updatedSocials);
    ctx.dispatch(new Resume.SocialsUpdate(resumeSocials));
  }

  @Action(Form.Social.NameUpdate)
  socialNameUpdate(ctx: StateContext<FormStateModel>, action: Form.Social.NameUpdate) {
    const state = ctx.getState();
    const updatedSocials = state.socials.map((social, index) =>
      index === action.index ? {...social, name: action.name} : social
    );
    ctx.setState({
      ...state,
      socials: updatedSocials
    });
    const resumeSocials = this.mapFormSocialsToResumeSocials(updatedSocials);
    ctx.dispatch(new Resume.SocialsUpdate(resumeSocials));
  }

  @Action(Form.Social.UrlUpdate)
  socialUrlUpdate(ctx: StateContext<FormStateModel>, action: Form.Social.UrlUpdate) {
    const state = ctx.getState();
    const updatedSocials = state.socials.map((social, index) =>
      index === action.index ? {...social, url: action.url} : social
    );
    ctx.setState({
      ...state,
      socials: updatedSocials
    });
    const resumeSocials = this.mapFormSocialsToResumeSocials(updatedSocials);
    ctx.dispatch(new Resume.SocialsUpdate(resumeSocials));
  }

  @Action(Form.Experience.Create)
  experienceCreate(ctx: StateContext<FormStateModel>) {
    const state = ctx.getState();
    const updatedExperiences = state.experiences.concat(emptyExperience());
    ctx.setState({
      ...state,
      experiences: updatedExperiences
    });
  }


  /* Util Functions */
  mapFormSocialsToResumeSocials(formSocials: Array<FormSocialModel>): Array<ResumeSocialModel> {
    return formSocials.map(social => ({...social, icon: ''}) );
  }
}
