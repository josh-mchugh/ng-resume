import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { Form } from './../../form.actions';

@Component({
  selector: 'app-contact-input',
  templateUrl: './contact-input.component.html',
  styleUrls: ['./contact-input.component.scss'],
})
export class ContactInputComponent {
  formPhone$: Observable<string>;
  formEmail$: Observable<string>;
  formLocation$: Observable<string>;

  constructor(private store: Store) {
    this.formPhone$ = this.store.select((state) => state.form.phone);
    this.formEmail$ = this.store.select((state) => state.form.email);
    this.formLocation$ = this.store.select((state) => state.form.location);
  }

  public onPhoneInput(event: Event): void {
    const phone = (event.target as HTMLInputElement).value;
    this.store.dispatch(new Form.PhoneUpdate(phone));
  }

  public onEmailInput(event: Event): void {
    const email = (event.target as HTMLInputElement).value;
    this.store.dispatch(new Form.EmailUpdate(email));
  }

  public onLocationInput(event: Event): void {
    const location = (event.target as HTMLInputElement).value;
    this.store.dispatch(new Form.LocationUpdate(location));
  }
}
