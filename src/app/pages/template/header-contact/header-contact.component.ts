import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-header-contact',
  templateUrl: './header-contact.component.html',
  styleUrls: ['./header-contact.component.scss'],
})
export class HeaderContactComponent {
  @HostBinding('style.width') width = '100%';
}
