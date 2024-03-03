import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Display } from '@display/display.actions';
import { Form } from '@shared/state/form.actions';
import { Layout } from '@shared/state/layout.actions';
import { LayoutStateConfig } from '@shared/state/layout.config';
import { Resume } from '@resume/resume.actions';
import { ResumeStateConfig } from '@resume/resume.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store) {
    const initialResumeState = ResumeStateConfig.DEFAULT;
    this.store
      .dispatch([
        new Resume.InitializeState(initialResumeState),
        new Form.InitializeState(initialResumeState),
        new Layout.InitializeState(LayoutStateConfig.DEMO),
      ])
      .subscribe(() => this.store.dispatch(new Display.InitializeState()));
  }
}
