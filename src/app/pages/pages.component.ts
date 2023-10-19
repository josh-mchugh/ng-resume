import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import {
  ResumeCertificationModel,
  ResumeExperienceModel,
  ResumeSkillModel,
} from './../resume.state';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent {
  experiences$: Observable<Array<ResumeExperienceModel>>;
  skills$: Observable<Array<ResumeSkillModel>>;
  certifications$: Observable<Array<ResumeCertificationModel>>;

  constructor(private store: Store) {
    this.experiences$ = this.store.select((state) => state.resume.experiences);
    this.skills$ = this.store.select((state) => state.resume.skills);
    this.certifications$ = this.store.select(
      (state) => state.resume.certifications,
    );
  }
}
