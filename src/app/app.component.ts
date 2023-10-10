import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import {
  ResumeCertificationModel,
  ResumeExperienceModel,
  ResumeSkillModel,
  ResumeState,
  ResumeStateModel,
  ResumeSocialModel
} from './resume.state';
import {
  FormCertificationModel,
  FormExperienceModel,
  FormSkillModel,
  FormState,
  FormStateModel,
  FormSocialModel
} from './form.state';
import { Form } from './form.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  formName$: Observable<string>;
  formTitle$: Observable<string>;
  formSummary$: Observable<string>;
  formPhone$: Observable<string>;
  formEmail$: Observable<string>;
  formLocation$: Observable<string>;
  formSocials$: Observable<Array<FormSocialModel>>;
  formExperiences$: Observable<Array<FormExperienceModel>>;
  formSkills$: Observable<Array<FormSkillModel>>;
  formCertifications$: Observable<Array<FormCertificationModel>>;

  name$: Observable<string>;
  title$: Observable<string>;
  summary$: Observable<string>;
  phone$: Observable<string>;
  email$: Observable<string>;
  location$: Observable<string>;
  socials$: Observable<Array<ResumeSocialModel>>;
  experiences$: Observable<Array<ResumeExperienceModel>>;
  skills$: Observable<Array<ResumeSkillModel>>;
  certifications$: Observable<Array<ResumeCertificationModel>>;

  constructor(private store: Store) {
    this.formName$ = this.store.select(state => state.form.name);
    this.formTitle$ = this.store.select(state => state.form.title);
    this.formSummary$ = this.store.select(state => state.form.summary);
    this.formPhone$ = this.store.select(state => state.form.phone);
    this.formEmail$ = this.store.select(state => state.form.email);
    this.formLocation$ = this.store.select(state => state.form.location);
    this.formSocials$ = this.store.select(state => state.form.socials);
    this.formExperiences$ = this.store.select(state => state.form.experiences);
    this.formSkills$ = this.store.select(state => state.form.skills);
    this.formCertifications$ = this.store.select(state => state.form.certifications);

    this.name$ = this.store.select(state => state.resume.name);
    this.title$ = this.store.select(state => state.resume.title);
    this.summary$ = this.store.select(state => state.resume.summary);
    this.phone$ = this.store.select(state => state.resume.phone);
    this.email$ = this.store.select(state => state.resume.email);
    this.location$ = this.store.select(state => state.resume.location);
    this.socials$ = this.store.select(state => state.resume.socials);
    this.experiences$ = this.store.select(state => state.resume.experiences);
    this.skills$ = this.store.select(state => state.resume.skills);
    this.certifications$ = this.store.select(state => state.resume.certifications);
  }

  public onNameInput(event: Event): void {
    const name = this.getInputValue(event);
    this.store.dispatch(new Form.NameUpdate(name));
  }

  public onTitleInput(event: Event): void {
    const title = this.getInputValue(event);
    this.store.dispatch(new Form.TitleUpdate(title));
  }

  public onSummaryInput(event: Event): void {
    const summary = this.getInputValue(event);
    this.store.dispatch(new Form.SummaryUpdate(summary));
  }

  public onPhoneInput(event: Event): void {
    const phone = this.getInputValue(event);
    this.store.dispatch(new Form.PhoneUpdate(phone));
  }

  public onEmailInput(event: Event): void {
    const email = this.getInputValue(event);
    this.store.dispatch(new Form.EmailUpdate(email));
  }

  public onLocationInput(event: Event): void {
    const location = this.getInputValue(event);
    this.store.dispatch(new Form.LocationUpdate(location));
  }

  public handleSocialTrackBy(index: number): number {
    return index;
  }

  public onSocialCreate(): boolean {
    this.store.dispatch(new Form.Social.Create());
    return false;
  }

  public onSocialDelete(index: number): boolean {
    this.store.dispatch(new Form.Social.Delete(index));
    return false;
  }

  public onSocialNameInput(index: number, event: Event): void {
    const name = this.getInputValue(event);
    this.store.dispatch(new Form.Social.NameUpdate(index, name));
  }

  public onSocialUrlInput(index: number, event: Event): void {
    const url = this.getInputValue(event);
    this.store.dispatch(new Form.Social.UrlUpdate(index, url));
  }

  public handleExperienceTrackBy(index: number): number {
    return index;
  }

  public onExperienceCreate(): boolean {
    this.store.dispatch(new Form.Experience.Create());
    return false;
  }

  public onExperienceDelete(index: number): boolean {
    this.store.dispatch(new Form.Experience.Delete(index));
    return false;
  }

  public onExperienceTitleInput(index: number, event: Event): void {
    const title = this.getInputValue(event);
    this.store.dispatch(new Form.Experience.TitleUpdate(index, title));
  }

  public onExperienceOrganizationInput(index: number, event: Event): void {
    const organization = this.getInputValue(event);
    this.store.dispatch(new Form.Experience.OrganizationUpdate(index, organization));
  }

  public onExperienceDurationInput(index: number, event: Event): void {
    const duration = this.getInputValue(event);
    this.store.dispatch(new Form.Experience.DurationUpdate(index, duration));
  }

  public onExperienceLocationInput(index: number, event: Event): void {
    const location = this.getInputValue(event);
    this.store.dispatch(new Form.Experience.LocationUpdate(index, location));
  }

  public onExperienceDescriptionInput(index: number, event: Event): void {
    const description = this.getInputValue(event);
    this.store.dispatch(new Form.Experience.DescriptionUpdate(index, description));
  }

  public onExperienceSkillsInput(index: number, event: Event): void {
    const skills = this.getInputValue(event);
    this.store.dispatch(new Form.Experience.SkillsUpdate(index, skills));
  }

  public handleSkillTrackBy(index: number): number {
    return index;
  }

  public onSkillCreate(): boolean {
    this.store.dispatch(new Form.Skill.Create());
    return false;
  }

  public onSkillDelete(index: number): boolean {
    this.store.dispatch(new Form.Skill.Delete(index));
    return false;
  }

  public onSkillNameInput(index: number, event: Event): void {
    const name = this.getInputValue(event);
    this.store.dispatch(new Form.Skill.NameUpdate(index, name));
  }

  public onSkillProficiencyInput(index: number, event: Event): void {
    const proficiency = parseInt(this.getInputValue(event), 10);
    this.store.dispatch(new Form.Skill.ProficiencyUpdate(index, proficiency));
  }

  public handleCertificationTrackBy(index: number): number {
    return index;
  }

  public onCertificationCreate(): boolean {
    this.store.dispatch(new Form.Certification.Create());
    return false;
  }

  public onCertificationDelete(index: number): boolean {
    this.store.dispatch(new Form.Certification.Delete(index));
    return false;
  }

  public onCertificationTitleInput(index: number, event: Event): void {
    const title = this.getInputValue(event);
    this.store.dispatch(new Form.Certification.TitleUpdate(index, title));
  }

  public onCertificationOrganizationInput(index: number, event: Event): void {
    const organization = this.getInputValue(event);
    this.store.dispatch(new Form.Certification.OrganizationUpdate(index, organization));
  }

  public onCertificationYearInput(index: number, event: Event): void {
    const year = this.getInputValue(event);
    this.store.dispatch(new Form.Certification.YearUpdate(index, year));
  }

  public onCertificationLocationInput(index: number, event: Event): void {
    const location = this.getInputValue(event);
    this.store.dispatch(new Form.Certification.LocationUpdate(index, location));
  }

  private getInputValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
