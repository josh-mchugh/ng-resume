import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-contact-phone',
  templateUrl: './contact-phone.component.html',
  styleUrls: ['./contact-phone.component.scss'],
})
export class ContactPhoneComponent {
  phone$: Observable<string>;

  constructor(private store: Store) {
    this.phone$ = this.store.select((state) => state.resume.phone);
  }
}
