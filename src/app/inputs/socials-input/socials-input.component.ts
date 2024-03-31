import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { FormSocial, FormState } from '@form/form.state';
import { Form } from '@form/form.actions';

@Component({
  selector: 'app-socials-input',
  templateUrl: './socials-input.component.html',
  styleUrls: ['./socials-input.component.scss'],
})
export class SocialsInputComponent {
  formSocials$: Observable<FormSocial[]>;

  constructor(private store: Store) {
    this.formSocials$ = this.store.select(FormState.getSocials());
  }

  public handleSocialTrackBy(index: number): number {
    return index;
  }

  public onSocialCreate(): boolean {
    this.store.dispatch(new Form.Social.Create());
    return false;
  }

  public onSocialDelete(id: string): boolean {
    this.store.dispatch(new Form.Social.Delete(id));
    return false;
  }

  public onSocialNameInput(id: string, event: Event, index: number): void {
    const name = (event.target as HTMLInputElement).value;
    this.store.dispatch(new Form.Social.NameUpdate(id, name, index));
  }

  public onSocialUrlInput(id: string, event: Event, index: number): void {
    const url = (event.target as HTMLInputElement).value;
    this.store.dispatch(new Form.Social.UrlUpdate(id, url, index));
  }
}
