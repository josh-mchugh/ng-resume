import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-contact-email',
  templateUrl: './contact-email.component.html',
  styleUrls: ['./contact-email.component.scss'],
})
export class ContactEmailComponent {
  email$: Observable<string>;

  constructor(private store: Store) {
    this.email$ = this.store.select((state) => state.resume.email);
  }
}
