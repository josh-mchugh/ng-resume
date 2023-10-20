import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { ResumeCertificationModel } from './../resume.state';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent {
  certifications$: Observable<Array<ResumeCertificationModel>>;

  constructor(private store: Store) {
    this.certifications$ = this.store.select(
      (state) => state.resume.certifications,
    );
  }
}
