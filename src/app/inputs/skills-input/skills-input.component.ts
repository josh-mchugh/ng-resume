import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { FormSkill, FormState } from '@shared/state/form.state';
import { Form } from '@shared/state/form.actions';

@Component({
  selector: 'app-skills-input',
  templateUrl: './skills-input.component.html',
  styleUrls: ['./skills-input.component.scss'],
})
export class SkillsInputComponent {
  formSkills$: Observable<FormSkill[]>;

  constructor(private store: Store) {
    this.formSkills$ = this.store.select(FormState.getSkills());
  }

  public handleSkillTrackBy(index: number): number {
    return index;
  }

  public onSkillCreate(): boolean {
    this.store.dispatch(new Form.Skill.Create());
    return false;
  }

  public onSkillDelete(id: string): boolean {
    this.store.dispatch(new Form.Skill.Delete(id));
    return false;
  }

  public onSkillNameInput(id: string, event: Event): void {
    const name = (event.target as HTMLInputElement).value;
    this.store.dispatch(new Form.Skill.NameUpdate(id, name));
  }

  public onSkillProficiencyInput(id: string, event: Event): void {
    const proficiency = parseInt((event.target as HTMLInputElement).value, 10);
    this.store.dispatch(new Form.Skill.ProficiencyUpdate(id, proficiency));
  }
}
