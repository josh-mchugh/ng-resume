import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxResizeObserverModule } from 'ngx-resize-observer';

import { AppComponent } from './app.component';

import { environment } from './../environments/environment';
import { DisplayState } from '@display/display.state';
import { FormState } from '@form/form.state';
import { LayoutState } from '@layout/layout.state';
import { ResumeState } from '@resume/resume.state';
import { PagesComponent } from './pages/pages.component';
import { DetailsInputComponent } from './inputs/details-input/details-input.component';
import { ContactInputComponent } from './inputs/contact-input/contact-input.component';
import { SocialsInputComponent } from './inputs/socials-input/socials-input.component';
import { ExperiencesInputComponent } from './inputs/experiences-input/experiences-input.component';
import { SkillsInputComponent } from './inputs/skills-input/skills-input.component';
import { CertificationsInputComponent } from './inputs/certifications-input/certifications-input.component';
import { SectionComponent } from './pages/section/section.component';

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxsModule.forRoot([DisplayState, FormState, LayoutState, ResumeState], {
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
