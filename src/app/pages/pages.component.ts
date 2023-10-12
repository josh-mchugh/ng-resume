import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import {
  ResumeCertificationModel,
  ResumeExperienceModel,
  ResumeSkillModel,
  ResumeSocialModel,
} from './../resume.state';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent {
  summary$: Observable<string>;
  phone$: Observable<string>;
  email$: Observable<string>;
  location$: Observable<string>;
  socials$: Observable<Array<ResumeSocialModel>>;
  experiences$: Observable<Array<ResumeExperienceModel>>;
  skills$: Observable<Array<ResumeSkillModel>>;
  certifications$: Observable<Array<ResumeCertificationModel>>;

  constructor(private store: Store) {
    this.summary$ = this.store.select((state) => state.resume.summary);
    this.phone$ = this.store.select((state) => state.resume.phone);
    this.email$ = this.store.select((state) => state.resume.email);
    this.location$ = this.store.select((state) => state.resume.location);
    this.socials$ = this.store.select((state) => state.resume.socials);
    this.experiences$ = this.store.select((state) => state.resume.experiences);
    this.skills$ = this.store.select((state) => state.resume.skills);
    this.certifications$ = this.store.select(
      (state) => state.resume.certifications,
    );
  }
}
