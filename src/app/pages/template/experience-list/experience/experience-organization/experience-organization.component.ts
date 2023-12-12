import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-experience-organization',
  templateUrl: './experience-organization.component.html',
  styleUrls: ['./experience-organization.component.scss'],
})
export class ExperienceOrganizationComponent {
  @Input() organization!: string;
  @Input() location!: string;
}
