import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { NameUpdate, TitleUpdate, SummaryUpdate } from './app.actions';

export interface AppStateModel {
  name: string;
  title: string;
  summary: string;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    name: "John Doe",
    title: "Web and Graphic Designer",
    summary: "Rock Star/Ninja can you ballpark the cost per unit for me, for touch base disband the squad but rehydrate as needed sacred cow."
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
}
