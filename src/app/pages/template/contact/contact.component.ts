import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  phone$: Observable<string>;
  email$: Observable<string>;
  location$: Observable<string>;

  constructor(private store: Store) {
    this.phone$ = this.store.select((state) => state.resume.phone);
    this.email$ = this.store.select((state) => state.resume.email);
    this.location$ = this.store.select((state) => state.resume.location);
  }
}
