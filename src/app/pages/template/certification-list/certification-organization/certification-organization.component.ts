import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-certification-organization',
  templateUrl: './certification-organization.component.html',
  styleUrls: ['./certification-organization.component.scss'],
})
export class CertificationOrganizationComponent {
  @HostBinding('style.width') width = '100%';
  @Input() organization!: string;
  @Input() location!: string;
}
