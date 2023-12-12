import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-experience-description',
  templateUrl: './experience-description.component.html',
  styleUrls: ['./experience-description.component.scss'],
})
export class ExperienceDescriptionComponent {
  @Input() description!: string;
}
