import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { FormSocialModel } from '@shared/state/form.state';
import { Form } from '@shared/state/form.actions';

@Component({
  selector: 'app-socials-input',
  templateUrl: './socials-input.component.html',
  styleUrls: ['./socials-input.component.scss'],
})
export class SocialsInputComponent {
  formSocials$: Observable<Array<FormSocialModel>>;

  constructor(private store: Store) {
    this.formSocials$ = this.store.select((state) => state.form.socials);
  }

  public handleSocialTrackBy(index: number): number {
    return index;
  }

  public onSocialCreate(): boolean {
    this.store.dispatch(new Form.Social.Create());
    return false;
  }

  public onSocialDelete(index: number): boolean {
    this.store.dispatch(new Form.Social.Delete(index));
    return false;
  }

  public onSocialNameInput(index: number, event: Event): void {
    const name = (event.target as HTMLInputElement).value;
    this.store.dispatch(new Form.Social.NameUpdate(index, name));
  }

  public onSocialUrlInput(index: number, event: Event): void {
    const url = (event.target as HTMLInputElement).value;
    this.store.dispatch(new Form.Social.UrlUpdate(index, url));
  }
}
