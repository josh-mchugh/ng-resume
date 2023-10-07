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

  public onNameInput(event: Event): void {
    const name = this.getInputValue(event);
    this.store.dispatch(new NameUpdate(name));
  }

  public onTitleInput(event: Event): void {
    const title = this.getInputValue(event);
    this.store.dispatch(new TitleUpdate(title));
  }

  public onSummaryInput(event: Event): void {
    const summary = this.getInputValue(event);
    this.store.dispatch(new SummaryUpdate(summary));
  }

  public onPhoneInput(event: Event): void {
    const phone = this.getInputValue(event);
    this.store.dispatch(new PhoneUpdate(phone));
  }

  public onEmailInput(event: Event): void {
    const email = this.getInputValue(event);
    this.store.dispatch(new EmailUpdate(email));
  }

  public onLocationInput(event: Event): void {
    const location = this.getInputValue(event);
    this.store.dispatch(new LocationUpdate(location));
  }

  private getInputValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
