import { Component, HostBinding, Input } from '@angular/core';
import { ResumeExperienceModel } from '@shared/state/resume.state';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent {
  @HostBinding('style.width') width = '100%';
  @Input() experience!: ResumeExperienceModel;

  public handleTrackBy(index: number): number {
    return index;
  }
}
