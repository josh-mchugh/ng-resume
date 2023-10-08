import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { Form } from './form.actions';

export interface FormStateModel {
  name: string;
  title: string;
  summary: string;
  phone: string;
  email: string;
  location: string;
}

@State<FormStateModel>({
  name: 'form',
  defaults: {
    name: '',
    title: '',
    summary: '',
    phone: '',
    email: '',
    location: ''
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
  }

  @Action(Form.TitleUpdate)
  formTitleUpdate(ctx: StateContext<FormStateModel>, action: Form.TitleUpdate) {
    ctx.setState({
      ...ctx.getState(),
      title: action.title
    });
  }

  @Action(Form.SummaryUpdate)
  formSummaryUpdate(ctx: StateContext<FormStateModel>, action: Form.SummaryUpdate) {
    ctx.setState({
      ...ctx.getState(),
      summary: action.summary
    });
  }

  @Action(Form.PhoneUpdate)
  formPhoneUpdate(ctx: StateContext<FormStateModel>, action: Form.PhoneUpdate) {
    ctx.setState({
      ...ctx.getState(),
      phone: action.phone
    });
  }

  @Action(Form.EmailUpdate)
  formEmailUpdate(ctx: StateContext<FormStateModel>, action: Form.EmailUpdate) {
    ctx.setState({
      ...ctx.getState(),
      email: action.email
    });
  }

  @Action(Form.LocationUpdate)
  formLocationUpate(ctx: StateContext<FormStateModel>, action: Form.LocationUpdate) {
    ctx.setState({
      ...ctx.getState(),
      location: action.location
    });
  }
}
