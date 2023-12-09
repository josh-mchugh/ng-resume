import { Component, Input } from '@angular/core';
import { ResumeSocialModel } from '@shared/state/resume.state';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
})
export class SocialComponent {
  @Input() social!: ResumeSocialModel;
}
