import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-contact-location',
  templateUrl: './contact-location.component.html',
  styleUrls: ['./contact-location.component.scss'],
})
export class ContactLocationComponent {
  location$: Observable<string>;

  constructor(private store: Store) {
    this.location$ = this.store.select((state) => state.resume.location);
  }
}
