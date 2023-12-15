import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-header-skill',
  templateUrl: './header-skill.component.html',
  styleUrls: ['./header-skill.component.scss'],
})
export class HeaderSkillComponent {
  @HostBinding('style.width') width = '100%';
}
