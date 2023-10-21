import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { AppComponent } from './app.component';

import { environment } from './../environments/environment';
import { ResumeState } from './resume.state';
import { FormState } from './form.state';
import { PagesComponent } from './pages/pages.component';
import { NameComponent } from './pages/template/name/name.component';
import { SummaryComponent } from './pages/template/summary/summary.component';
import { ContactComponent } from './pages/template/contact/contact.component';
import { SocialsComponent } from './pages/template/socials/socials.component';
import { ExperiencesComponent } from './pages/template/experiences/experiences.component';
import { SkillsComponent } from './pages/template/skills/skills.component';
import { CertificationsComponent } from './pages/template/certifications/certifications.component';
import { DetailsInputComponent } from './inputs/details-input/details-input.component';
import { ContactInputComponent } from './inputs/contact-input/contact-input.component';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    NameComponent,
    SummaryComponent,
    ContactComponent,
    SocialsComponent,
    ExperiencesComponent,
    SkillsComponent,
    CertificationsComponent,
    DetailsInputComponent,
    ContactInputComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxsModule.forRoot([FormState, ResumeState], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
