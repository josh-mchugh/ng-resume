import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { ResumeSkillModel } from './../../../shared/state/resume.state';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent {
  skills$: Observable<Array<ResumeSkillModel>>;

  constructor(private store: Store) {
    this.skills$ = this.store.select((state) => state.resume.skills);
  }

  public handleSkillTrackBy(index: number): number {
    return index;
  }
}
