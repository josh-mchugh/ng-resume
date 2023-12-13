import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-experience-position',
  templateUrl: './experience-position.component.html',
  styleUrls: ['./experience-position.component.scss'],
})
export class ExperiencePositionComponent {
  @HostBinding('style.width') width = '100%';
  @Input() title!: string;
  @Input() duration!: string;
}
