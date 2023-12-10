import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-header-experience',
  templateUrl: './header-experience.component.html',
  styleUrls: ['./header-experience.component.scss'],
})
export class HeaderExperienceComponent {
  @HostBinding('style.width') width = '100%';
}
