import { Component, Input } from '@angular/core';
import { RowModel } from './../../shared/state/layout.state';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
})
export class RowComponent {
  @Input() row!: RowModel;
}
