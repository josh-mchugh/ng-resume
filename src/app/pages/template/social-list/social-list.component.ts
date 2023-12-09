import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { ResumeSocialModel } from '@shared/state/resume.state';

@Component({
  selector: 'app-social-list',
  templateUrl: './social-list.component.html',
  styleUrls: ['./social-list.component.scss'],
})
export class SocialListComponent {
  socials$: Observable<ResumeSocialModel[]>;

  constructor(private store: Store) {
    this.socials$ = this.store.select((state) => state.resume.socials);
  }

  public handleTrackBy(index: number): number {
    return index;
  }
}
