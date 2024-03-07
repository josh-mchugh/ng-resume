import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Display } from '@display/display.actions';
import { Form } from '@form/form.actions';
import { Layout } from '@layout/layout.actions';
import { LayoutStateConfig } from '@layout/layout.config';
import { Resume } from '@resume/resume.actions';
import { ResumeStateConfig } from '@resume/resume.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store) {
    const initialResumeState = ResumeStateConfig.DEMO;
    this.store
      .dispatch([
        new Resume.InitializeState(initialResumeState),
        new Form.InitializeState(initialResumeState),
        new Layout.InitializeState(LayoutStateConfig.DEMO),
      ])
      .subscribe(() => this.store.dispatch(new Display.InitializeState()));
  }
}
