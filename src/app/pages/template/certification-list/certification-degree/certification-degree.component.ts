import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-certification-degree',
  templateUrl: './certification-degree.component.html',
  styleUrls: ['./certification-degree.component.scss'],
})
export class CertificationDegreeComponent {
  @HostBinding('style.width') width = '100%';
  @Input() title!: string;
  @Input() year!: string;
}
