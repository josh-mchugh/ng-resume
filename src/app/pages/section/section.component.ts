import { Component, Input } from '@angular/core';
import { SectionModel } from './../../shared/state/layout.state';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent {
  @Input() section!: SectionModel;
}
