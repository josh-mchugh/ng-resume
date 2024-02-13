import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { FormExperience, FormState } from '@shared/state/form.state';
import { Form } from '@shared/state/form.actions';

@Component({
  selector: 'app-experiences-input',
  templateUrl: './experiences-input.component.html',
  styleUrls: ['./experiences-input.component.scss'],
})
export class ExperiencesInputComponent {
  formExperiences$: Observable<FormExperience[]>;

  constructor(private store: Store) {
    this.formExperiences$ = this.store.select(FormState.getExperiences());
  }

  public handeExperiencesTrackBy(index: number): number {
    return index;
  }

  public onExperienceCreate(): boolean {
    this.store.dispatch(new Form.Experience.Create());
    return false;
  }

  public onExperienceDelete(id: string): boolean {
    this.store.dispatch(new Form.Experience.Delete(id));
    return false;
  }

  public onExperienceTitleInput(id: string, event: Event): void {
    const title = (event.target as HTMLInputElement).value;
    this.store.dispatch(new Form.Experience.TitleUpdate(id, title));
  }

  public onExperienceOrganizationInput(id: string, event: Event): void {
    const organization = (event.target as HTMLInputElement).value;
    this.store.dispatch(
      new Form.Experience.OrganizationUpdate(id, organization),
    );
  }

  public onExperienceDurationInput(id: string, event: Event): void {
    const duration = (event.target as HTMLInputElement).value;
    this.store.dispatch(new Form.Experience.DurationUpdate(id, duration));
  }

  public onExperienceLocationInput(id: string, event: Event): void {
    const location = (event.target as HTMLInputElement).value;
    this.store.dispatch(new Form.Experience.LocationUpdate(id, location));
  }

  public onExperienceDescriptionInput(id: string, event: Event): void {
    const description = (event.target as HTMLInputElement).value;
    this.store.dispatch(new Form.Experience.DescriptionUpdate(id, description));
  }

  public onExperienceSkillsInput(id: string, event: Event): void {
    const skills = (event.target as HTMLInputElement).value;
    this.store.dispatch(new Form.Experience.SkillsUpdate(id, skills));
  }
}
