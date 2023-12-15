import { Component, HostBinding, Input } from '@angular/core';
import { ResumeSkillModel } from '@shared/state/resume.state';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
})
export class SkillComponent {
  @HostBinding('style.width') width = '100%';
  @Input() skill!: ResumeSkillModel;
}
