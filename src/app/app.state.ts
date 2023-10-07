import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import {
  NameUpdate,
  PhoneUpdate,
  SummaryUpdate,
  TitleUpdate
} from './app.actions';

export interface AppStateModel {
  name: string;
  title: string;
  summary: string;
  phone: string;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    name: "John Doe",
    title: "Web and Graphic Designer",
    summary: "Rock Star/Ninja can you ballpark the cost per unit for me, for touch base disband the squad but rehydrate as needed sacred cow.",
    phone: "(123) 456-8899"
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
}
