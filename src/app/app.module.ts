import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxResizeObserverModule } from 'ngx-resize-observer';

import { AppComponent } from './app.component';

import { environment } from './../environments/environment';
import { ResumeState } from '@shared/state/resume.state';
import { FormState } from '@shared/state/form.state';
import { LayoutState } from '@shared/state/layout.state';
import { PagesComponent } from './pages/pages.component';
import { DetailsInputComponent } from './inputs/details-input/details-input.component';
import { ContactInputComponent } from './inputs/contact-input/contact-input.component';
import { SocialsInputComponent } from './inputs/socials-input/socials-input.component';
import { ExperiencesInputComponent } from './inputs/experiences-input/experiences-input.component';
import { SkillsInputComponent } from './inputs/skills-input/skills-input.component';
import { CertificationsInputComponent } from './inputs/certifications-input/certifications-input.component';
import { SectionComponent } from './pages/section/section.component';
import { ExperienceListComponent } from './pages/template/experience-list/experience-list.component';
import { ExperienceComponent } from './pages/template/experience-list/experience/experience.component';
import { ExperienceSkillComponent } from './pages/template/experience-list/experience/experience-skill/experience-skill.component';
import { HeaderSkillComponent } from './pages/template/header-skill/header-skill.component';
import { SkillListComponent } from './pages/template/skill-list/skill-list.component';
import { SkillComponent } from './pages/template/skill-list/skill/skill.component';
import { HeaderCertificationComponent } from './pages/template/header-certification/header-certification.component';
import { CertificationListComponent } from './pages/template/certification-list/certification-list.component';
import { CertificationDegreeComponent } from './pages/template/certification-list/certification-degree/certification-degree.component';
import { CertificationOrganizationComponent } from './pages/template/certification-list/certification-organization/certification-organization.component';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    DetailsInputComponent,
    ContactInputComponent,
    SocialsInputComponent,
    ExperiencesInputComponent,
    SkillsInputComponent,
    CertificationsInputComponent,
    SectionComponent,
    ExperienceListComponent,
    ExperienceComponent,
    ExperienceSkillComponent,
    HeaderSkillComponent,
    SkillListComponent,
    SkillComponent,
    HeaderCertificationComponent,
    CertificationListComponent,
    CertificationDegreeComponent,
    CertificationOrganizationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxsModule.forRoot([FormState, ResumeState, LayoutState], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production,
    }),
    NgxResizeObserverModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
