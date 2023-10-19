import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { ResumeSocialModel } from './../../../resume.state';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
})
export class SocialComponent {
  socials$: Observable<Array<ResumeSocialModel>>;

  constructor(private store: Store) {
    this.socials$ = this.store.select((state) => state.resume.socials);
  }
}
