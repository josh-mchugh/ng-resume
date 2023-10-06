import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { AppState, AppStateModel } from './app.state';
import { NameUpdate } from './app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  name$: Observable<string>;

  constructor(private store: Store) {
    this.name$ = this.store.select(state => state.app.name);
  }

  public handleNameInput(event: Event): void {
    const name = (event.target as HTMLInputElement).value;
    this.store.dispatch(new NameUpdate(name));
  }
}
