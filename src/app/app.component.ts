import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { AppState, AppStateModel } from './app.state';
import {
  EmailUpdate,
  LocationUpdate,
  NameUpdate,
  PhoneUpdate,
  SummaryUpdate,
  TitleUpdate
} from './app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  name$: Observable<string>;
  title$: Observable<string>;
  summary$: Observable<string>;
  phone$: Observable<string>;
  email$: Observable<string>;
  location$: Observable<string>;

  constructor(private store: Store) {
    this.name$ = this.store.select(state => state.app.name);
    this.title$ = this.store.select(state => state.app.title);
    this.summary$ = this.store.select(state => state.app.summary);
    this.phone$ = this.store.select(state => state.app.phone);
    this.email$ = this.store.select(state => state.app.email);
    this.location$ = this.store.select(state => state.app.location);
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

  public onPhoneInput(event: Event): boolean {
    const phone = (event.target as HTMLInputElement).value;
    this.store.dispatch(new PhoneUpdate(phone));
    return false;
  }

  public onEmailInput(event: Event): boolean {
    const email = (event.target as HTMLInputElement).value;
    this.store.dispatch(new EmailUpdate(email));
    return false;
  }

  public onLocationInput(event: Event): boolean {
    const location = (event.target as HTMLInputElement).value;
    this.store.dispatch(new LocationUpdate(location));
    return false;
  }
}
