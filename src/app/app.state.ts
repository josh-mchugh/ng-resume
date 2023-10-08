import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import {
  EmailUpdate,
  LocationUpdate,
  NameUpdate,
  PhoneUpdate,
  SocialCreate,
  SocialDelete,
  SocialNameUpdate,
  SocialUrlUpdate,
  SummaryUpdate,
  TitleUpdate
} from './app.actions';

export interface AppStateModel {
  name: string;
  title: string;
  summary: string;
  phone: string;
  email: string;
  location: string;
  socials: Array<Social>;
}

export interface Social {
  icon: string;
  name: string;
  url: string;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    name: "John Doe",
    title: "Web and Graphic Designer",
    summary: "Rock Star/Ninja can you ballpark the cost per unit for me, for touch base disband the squad but rehydrate as needed sacred cow.",
    phone: "(123) 456-8899",
    email: "info@youremail.com",
    location: "New York, New York",
    socials: [
      {
        name: "Facebook",
        icon: "fa-brands fa-facebook",
        url: "https://facebook.com/profile"
      },
      {
        name: "Twitter",
        icon: "fa-brands fa-twitter",
        url: "https://twitter.com/profile"
      },
      {
        name: "LinkedIn",
        icon: "fa-brands fa-linkedin",
        url: "https://linkedin.com/profile"
      }
    ]
  }
})
@Injectable()
export class AppState {

  @Action(NameUpdate)
  nameUpdate(ctx: StateContext<AppStateModel>, action: NameUpdate) {
    ctx.setState({
      ...ctx.getState(),
      name: action.name
    });
  }

  @Action(TitleUpdate)
  titleUpdate(ctx: StateContext<AppStateModel>, action: TitleUpdate) {
    ctx.setState({
      ...ctx.getState(),
      title: action.title
    });
  }

  @Action(SummaryUpdate)
  summaryUpdate(ctx: StateContext<AppStateModel>, action: SummaryUpdate) {
    ctx.setState({
      ...ctx.getState(),
      summary: action.summary
    });
  }

  @Action(PhoneUpdate)
  phoneUpdate(ctx: StateContext<AppStateModel>, action: PhoneUpdate) {
    ctx.setState({
      ...ctx.getState(),
      phone: action.phone
    });
  }

  @Action(EmailUpdate)
  emailUpdate(ctx: StateContext<AppStateModel>, action: EmailUpdate) {
    ctx.setState({
      ...ctx.getState(),
      email: action.email
    });
  }

  @Action(LocationUpdate)
  locationUpdate(ctx: StateContext<AppStateModel>, action: LocationUpdate) {
    ctx.setState({
      ...ctx.getState(),
      location: action.location
    });
  }

  @Action(SocialCreate)
  socialAdd(ctx: StateContext<AppStateModel>) {
    ctx.setState({
      ...ctx.getState(),
      socials: ctx.getState().socials.concat( { name: "", url: "", icon: "" } )
    });
  }

  @Action(SocialDelete)
  socialDelete(ctx: StateContext<AppStateModel>, action: SocialDelete) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      socials: state.socials.filter((social, index) => index !== action.index)
    });
  }

  @Action(SocialNameUpdate)
  socialNameUpdate(ctx: StateContext<AppStateModel>, action: SocialNameUpdate) {
    const state = ctx.getState();
    const updatedSocials = state.socials.map((social: Social, index: number) => {
      return index === action.index ? {...social, name: action.name} : social;
    });
    ctx.setState({
      ...state,
      socials: updatedSocials
    });
  }

  @Action(SocialUrlUpdate)
  socialUrlUpdate(ctx: StateContext<AppStateModel>, action: SocialUrlUpdate) {
    const state = ctx.getState();
    const updatedSocials = state.socials.map((social, index) => {
      return index === action.index ? {...social, url: action.url} : social;
    })
    ctx.setState({
      ...state,
      socials: updatedSocials
    });
  }
}
