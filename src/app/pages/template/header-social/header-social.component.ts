import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-header-social',
  templateUrl: './header-social.component.html',
  styleUrls: ['./header-social.component.scss'],
})
export class HeaderSocialComponent {
  @HostBinding('style.width') width = '100%';
}
