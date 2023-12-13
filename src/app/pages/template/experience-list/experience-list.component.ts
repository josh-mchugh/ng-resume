import { Component, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { ResumeExperienceModel } from '@shared/state/resume.state';

@Component({
  selector: 'app-experience-list',
  templateUrl: './experience-list.component.html',
  styleUrls: ['./experience-list.component.scss'],
})
export class ExperienceListComponent {
  @HostBinding('style.width') width = '100%';
  experiences$: Observable<ResumeExperienceModel[]>;

  constructor(private store: Store) {
    this.experiences$ = this.store.select((state) => state.resume.experiences);
  }

  public handleTrackBy(index: number): number {
    return index;
  }
}
