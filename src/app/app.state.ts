import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { NameUpdate, TitleUpdate } from './app.actions';

export interface AppStateModel {
  name: string;
  title: string;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    name: "John Doe",
    title: "Web and Graphic Designer"
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
  summaryUpdate(ctx: StateContext<AppStateModel>, action: TitleUpdate) {
    ctx.setState({
      ...ctx.getState(),
      title: action.title
    });
  }
}
