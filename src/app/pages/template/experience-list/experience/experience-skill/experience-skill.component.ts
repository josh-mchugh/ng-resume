import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-experience-skill',
  templateUrl: './experience-skill.component.html',
  styleUrls: ['./experience-skill.component.scss'],
})
export class ExperienceSkillComponent {
  @Input() skill!: string;
}
