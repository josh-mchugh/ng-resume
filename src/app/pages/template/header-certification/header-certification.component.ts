import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-header-certification',
  templateUrl: './header-certification.component.html',
  styleUrls: ['./header-certification.component.scss'],
})
export class HeaderCertificationComponent {
  @HostBinding('style.width') width = '100%';
}
