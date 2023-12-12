import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-experience-position',
  templateUrl: './experience-position.component.html',
  styleUrls: ['./experience-position.component.scss'],
})
export class ExperiencePositionComponent {
  @Input() title!: string;
  @Input() duration!: string;
}
