import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { ResumeExperienceModel } from './../../../resume.state';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent {
  experiences$: Observable<Array<ResumeExperienceModel>>;

  constructor(private store: Store) {
    this.experiences$ = this.store.select((state) => state.resume.experiences);
  }
}
