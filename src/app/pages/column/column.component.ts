import { Component, Input } from '@angular/core';
import { ColumnModel } from './../../shared/state/layout.state';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() column!: ColumnModel;
}
