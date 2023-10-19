import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  summary$: Observable<string>;

  constructor(private store: Store) {
    this.summary$ = this.store.select((state) => state.resume.summary);
  }
}
