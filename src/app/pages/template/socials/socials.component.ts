import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { ResumeSocialModel } from './../../../resume.state';

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrls: ['./socials.component.scss'],
})
export class SocialsComponent {
  socials$: Observable<Array<ResumeSocialModel>>;

  constructor(private store: Store) {
    this.socials$ = this.store.select((state) => state.resume.socials);
  }
}
