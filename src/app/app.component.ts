import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import {
  AppState,
  AppStateModel,
  Social
} from './app.state';
import {
  FormState,
  FormStateModel
} from './form.state';
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
import { Form } from './form.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  formName$: Observable<string>;
  formTitle$: Observable<string>;
  formSummary$: Observable<string>;
  formPhone$: Observable<string>;
  formEmail$: Observable<string>;
  formLocation$: Observable<string>;

  name$: Observable<string>;
  title$: Observable<string>;
  summary$: Observable<string>;
  phone$: Observable<string>;
  email$: Observable<string>;
  location$: Observable<string>;
  socials$: Observable<Array<Social>>;

  constructor(private store: Store) {
    this.formName$ = this.store.select(state => state.form.name);
    this.formTitle$ = this.store.select(state => state.form.title);
    this.formSummary$ = this.store.select(state => state.form.summary);
    this.formPhone$ = this.store.select(state => state.form.phone);
    this.formEmail$ = this.store.select(state => state.form.email);
    this.formLocation$ = this.store.select(state => state.form.location);

    this.name$ = this.store.select(state => state.app.name);
    this.title$ = this.store.select(state => state.app.title);
    this.summary$ = this.store.select(state => state.app.summary);
    this.phone$ = this.store.select(state => state.app.phone);
    this.email$ = this.store.select(state => state.app.email);
    this.location$ = this.store.select(state => state.app.location);
    this.socials$ = this.store.select(state => state.app.socials);
  }

  public onNameInput(event: Event): void {
    const name = this.getInputValue(event);
    this.store.dispatch([
      new Form.NameUpdate(name),
      new NameUpdate(name)
    ]);
  }

  public onTitleInput(event: Event): void {
    const title = this.getInputValue(event);
    this.store.dispatch([
      new Form.TitleUpdate(title),
      new TitleUpdate(title)
    ]);
  }

  public onSummaryInput(event: Event): void {
    const summary = this.getInputValue(event);
    this.store.dispatch([
      new Form.SummaryUpdate(summary),
      new SummaryUpdate(summary)
    ]);
  }

  public onPhoneInput(event: Event): void {
    const phone = this.getInputValue(event);
    this.store.dispatch([
      new Form.PhoneUpdate(phone),
      new PhoneUpdate(phone)
    ]);
  }

  public onEmailInput(event: Event): void {
    const email = this.getInputValue(event);
    this.store.dispatch([
      new Form.EmailUpdate(email),
      new EmailUpdate(email)
    ]);
  }

  public onLocationInput(event: Event): void {
    const location = this.getInputValue(event);
    this.store.dispatch([
      new Form.LocationUpdate(location),
      new LocationUpdate(location)
    ]);
  }

  public handleSocialTrackBy(index: number): number {
    return index;
  }

  public onSocialCreate(): boolean {
    this.store.dispatch(new SocialCreate());
    return false;
  }

  public onSocialRemove(index: number): boolean {
    this.store.dispatch(new SocialDelete(index));
    return false;
  }

  public onSocialNameInput(index: number, event: Event): void {
    const name = this.getInputValue(event);
    this.store.dispatch(new SocialNameUpdate(index, name));
  }

  public onSocialUrlInput(index: number, event: Event): void {
    const url = this.getInputValue(event);
    this.store.dispatch(new SocialUrlUpdate(index, url));
  }

  private getInputValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
