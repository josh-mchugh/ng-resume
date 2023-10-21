import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { ResumeExperienceModel } from './../../../resume.state';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss'],
})
export class ExperiencesComponent {
  experiences$: Observable<Array<ResumeExperienceModel>>;

  constructor(private store: Store) {
    this.experiences$ = this.store.select((state) => state.resume.experiences);
  }

  public handleExperienceTrackBy(index: number): number {
    return index;
  }

  public handleExpereinceDescriptionTrackBy(index: number): number {
    return index;
  }

  public handleExperienceSkillTrackBy(index: number): number {
    return index;
  }
}
