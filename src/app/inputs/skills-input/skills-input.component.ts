import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { FormSkillModel } from './../../shared/state/form.state';
import { Form } from './../../shared/state/form.actions';

@Component({
  selector: 'app-skills-input',
  templateUrl: './skills-input.component.html',
  styleUrls: ['./skills-input.component.scss'],
})
export class SkillsInputComponent {
  formSkills$: Observable<Array<FormSkillModel>>;

  constructor(private store: Store) {
    this.formSkills$ = this.store.select((state) => state.form.skills);
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
    const name = (event.target as HTMLInputElement).value;
    this.store.dispatch(new Form.Skill.NameUpdate(index, name));
  }

  public onSkillProficiencyInput(index: number, event: Event): void {
    const proficiency = parseInt((event.target as HTMLInputElement).value, 10);
    this.store.dispatch(new Form.Skill.ProficiencyUpdate(index, proficiency));
  }
}
