import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-header-summary',
  templateUrl: './header-summary.component.html',
  styleUrls: ['./header-summary.component.scss'],
})
export class HeaderSummaryComponent {
  @HostBinding('style.width') width = '100%';
}
