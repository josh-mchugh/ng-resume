import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Resume } from '@shared/state/resume.actions';
import { DemoResumeState } from '@shared/state/resume.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private store: Store) {
    this.store.dispatch(new Resume.InitializeState(DemoResumeState));
  }
}
