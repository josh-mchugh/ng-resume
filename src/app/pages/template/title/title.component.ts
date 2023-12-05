import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent {
  title$: Observable<string>;

  constructor(private store: Store) {
    this.title$ = this.store.select((state) => state.resume.title);
  }
}
