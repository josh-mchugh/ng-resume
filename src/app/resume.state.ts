import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { Resume } from './resume.actions';

export interface ResumeStateModel {
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

@State<ResumeStateModel>({
  name: 'resume',
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
export class ResumeState {

  @Action(Resume.NameUpdate)
  nameUpdate(ctx: StateContext<ResumeStateModel>, action: Resume.NameUpdate) {
    ctx.setState({
      ...ctx.getState(),
      name: action.name
    });
  }

  @Action(Resume.TitleUpdate)
  titleUpdate(ctx: StateContext<ResumeStateModel>, action: Resume.TitleUpdate) {
    ctx.setState({
      ...ctx.getState(),
      title: action.title
    });
  }

  @Action(Resume.SummaryUpdate)
  summaryUpdate(ctx: StateContext<ResumeStateModel>, action: Resume.SummaryUpdate) {
    ctx.setState({
      ...ctx.getState(),
      summary: action.summary
    });
  }

  @Action(Resume.PhoneUpdate)
  phoneUpdate(ctx: StateContext<ResumeStateModel>, action: Resume.PhoneUpdate) {
    ctx.setState({
      ...ctx.getState(),
      phone: action.phone
    });
  }

  @Action(Resume.EmailUpdate)
  emailUpdate(ctx: StateContext<ResumeStateModel>, action: Resume.EmailUpdate) {
    ctx.setState({
      ...ctx.getState(),
      email: action.email
    });
  }

  @Action(Resume.LocationUpdate)
  locationUpdate(ctx: StateContext<ResumeStateModel>, action: Resume.LocationUpdate) {
    ctx.setState({
      ...ctx.getState(),
      location: action.location
    });
  }

  @Action(Resume.SocialsUpdate)
  socialsUpdate(ctx: StateContext<ResumeStateModel>, action: Resume.SocialsUpdate) {
    ctx.setState({
      ...ctx.getState(),
      socials: action.socials
    });
  }
}
