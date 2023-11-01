import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { SegmentModel } from '@shared/state/layout.state';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  @Input() segments!: Array<SegmentModel>;

  summary$: Observable<string>;

  constructor(private store: Store) {
    this.summary$ = this.store.select((state) => state.resume.summary);
  }
}
