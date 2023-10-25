import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { AppComponent } from './app.component';

import { environment } from './../environments/environment';
import { ResumeState } from '@shared/state/resume.state';
import { FormState } from '@shared/state/form.state';
import { LayoutState } from '@shared/state/layout.state';
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
import { SocialsInputComponent } from './inputs/socials-input/socials-input.component';
import { ExperiencesInputComponent } from './inputs/experiences-input/experiences-input.component';
import { SkillsInputComponent } from './inputs/skills-input/skills-input.component';
import { CertificationsInputComponent } from './inputs/certifications-input/certifications-input.component';
import { SectionComponent } from './pages/section/section.component';
import { ColumnComponent } from './pages/column/column.component';
import { RowComponent } from './pages/row/row.component';

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
    SocialsInputComponent,
    ExperiencesInputComponent,
    SkillsInputComponent,
    CertificationsInputComponent,
    SectionComponent,
    ColumnComponent,
    RowComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
