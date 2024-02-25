import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Form } from '@shared/state/form.actions';
import { Resume } from '@shared/state/resume.actions';
import { DefaultResumeState } from '@shared/state/resume.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store) {
    const initialResumeState = DefaultResumeState;
    this.store.dispatch([
      new Resume.InitializeState(initialResumeState),
      new Form.InitializeState(initialResumeState),
    ]);
  }
}
