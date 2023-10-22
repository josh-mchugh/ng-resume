import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { FormExperienceModel } from './../../shared/state/form.state';
import { Form } from './../../shared/state/form.actions';

@Component({
  selector: 'app-experiences-input',
  templateUrl: './experiences-input.component.html',
  styleUrls: ['./experiences-input.component.scss'],
})
export class ExperiencesInputComponent {
  formExperiences$: Observable<Array<FormExperienceModel>>;

  constructor(private store: Store) {
    this.formExperiences$ = this.store.select(
      (state) => state.form.experiences,
    );
  }

  public handeExperiencesTrackBy(index: number): number {
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
    const title = (event.target as HTMLInputElement).value;
    this.store.dispatch(new Form.Experience.TitleUpdate(index, title));
  }

  public onExperienceOrganizationInput(index: number, event: Event): void {
    const organization = (event.target as HTMLInputElement).value;
    this.store.dispatch(
      new Form.Experience.OrganizationUpdate(index, organization),
    );
  }

  public onExperienceDurationInput(index: number, event: Event): void {
    const duration = (event.target as HTMLInputElement).value;
    this.store.dispatch(new Form.Experience.DurationUpdate(index, duration));
  }

  public onExperienceLocationInput(index: number, event: Event): void {
    const location = (event.target as HTMLInputElement).value;
    this.store.dispatch(new Form.Experience.LocationUpdate(index, location));
  }

  public onExperienceDescriptionInput(index: number, event: Event): void {
    const description = (event.target as HTMLInputElement).value;
    this.store.dispatch(
      new Form.Experience.DescriptionUpdate(index, description),
    );
  }

  public onExperienceSkillsInput(index: number, event: Event): void {
    const skills = (event.target as HTMLInputElement).value;
    this.store.dispatch(new Form.Experience.SkillsUpdate(index, skills));
  }
}
