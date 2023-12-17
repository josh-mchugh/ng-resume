import { Component, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { ResumeCertificationModel } from '@shared/state/resume.state';

@Component({
  selector: 'app-certification-list',
  templateUrl: './certification-list.component.html',
  styleUrls: ['./certification-list.component.scss'],
})
export class CertificationListComponent {
  @HostBinding('style.width') width = '100%';
  certifications$: Observable<ResumeCertificationModel[]>;

  constructor(private store: Store) {
    this.certifications$ = this.store.select(
      (state) => state.resume.certifications,
    );
  }

  public handleTrackBy(index: number): number {
    return index;
  }
}
