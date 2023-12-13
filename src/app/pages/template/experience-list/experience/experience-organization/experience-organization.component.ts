import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-experience-organization',
  templateUrl: './experience-organization.component.html',
  styleUrls: ['./experience-organization.component.scss'],
})
export class ExperienceOrganizationComponent {
  @HostBinding('style.width') width = '100%';
  @Input() organization!: string;
  @Input() location!: string;
}
