import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { ResumeCertificationModel } from './../../../resume.state';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss'],
})
export class CertificationsComponent {
  certifications$: Observable<Array<ResumeCertificationModel>>;

  constructor(private store: Store) {
    this.certifications$ = this.store.select(
      (state) => state.resume.certifications,
    );
  }
}
