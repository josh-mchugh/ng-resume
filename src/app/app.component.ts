import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { AppState, AppStateModel } from './app.state';
import { NameUpdate, TitleUpdate, SummaryUpdate } from './app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  name$: Observable<string>;
  title$: Observable<string>;
  summary$: Observable<string>;

  constructor(private store: Store) {
    this.name$ = this.store.select(state => state.app.name);
    this.title$ = this.store.select(state => state.app.title);
    this.summary$ = this.store.select(state => state.app.summary);
  }

  public onNameInput(event: Event): boolean {
    const name = (event.target as HTMLInputElement).value;
    this.store.dispatch(new NameUpdate(name));
    return false;
  }

  public onTitleInput(event: Event): boolean {
    const title = (event.target as HTMLInputElement).value;
    this.store.dispatch(new TitleUpdate(title));
    return false;
  }

  public onSummaryInput(event: Event): boolean {
    const summary = (event.target as HTMLInputElement).value;
    this.store.dispatch(new SummaryUpdate(summary));
    return false;
  }
}
