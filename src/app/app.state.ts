import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { NameUpdate } from './app.actions';

export interface AppStateModel {
  name: string;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    name: "John Doe"
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
}
