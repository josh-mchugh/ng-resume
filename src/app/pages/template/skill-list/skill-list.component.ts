import { Component, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { ResumeSkillModel } from '@shared/state/resume.state';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss'],
})
export class SkillListComponent {
  @HostBinding('style') style = {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  };
  skills$: Observable<ResumeSkillModel[]>;

  constructor(private store: Store) {
    this.skills$ = this.store.select((state) => state.resume.skills);
  }

  public handleTrackBy(index: number): number {
    return index;
  }
}
