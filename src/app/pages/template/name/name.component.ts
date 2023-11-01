import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { SegmentModel } from '@shared/state/layout.state';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss'],
})
export class NameComponent {
  @Input() segments!: Array<SegmentModel>;

  name$: Observable<string>;
  title$: Observable<string>;

  constructor(private store: Store) {
    this.name$ = this.store.select((state) => state.resume.name);
    this.title$ = this.store.select((state) => state.resume.title);
  }
}
