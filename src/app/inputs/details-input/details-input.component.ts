import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { Form } from '@form/form.actions';

@Component({
  selector: 'app-details-input',
  templateUrl: './details-input.component.html',
  styleUrls: ['./details-input.component.scss'],
})
export class DetailsInputComponent {
  formName$: Observable<string>;
  formTitle$: Observable<string>;
  formSummary$: Observable<string>;

  constructor(private store: Store) {
    this.formName$ = this.store.select((state) => state.form.name);
    this.formTitle$ = this.store.select((state) => state.form.title);
    this.formSummary$ = this.store.select((state) => state.form.summary);
  }

  public onNameInput(event: Event): void {
    const name = (event.target as HTMLInputElement).value;
    this.store.dispatch(new Form.NameUpdate(name));
  }

  public onTitleInput(event: Event): void {
    const title = (event.target as HTMLInputElement).value;
    this.store.dispatch(new Form.TitleUpdate(title));
  }

  public onSummaryInput(event: Event): void {
    const summary = (event.target as HTMLInputElement).value;
    this.store.dispatch(new Form.SummaryUpdate(summary));
  }
}
