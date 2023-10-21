import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { FormCertificationModel } from './form.state';
import { Form } from './form.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  formCertifications$: Observable<Array<FormCertificationModel>>;

  constructor(private store: Store) {
    this.formCertifications$ = this.store.select(
      (state) => state.form.certifications,
    );
  }

  public handleCertificationTrackBy(index: number): number {
    return index;
  }

  public onCertificationCreate(): boolean {
    this.store.dispatch(new Form.Certification.Create());
    return false;
  }

  public onCertificationDelete(index: number): boolean {
    this.store.dispatch(new Form.Certification.Delete(index));
    return false;
  }

  public onCertificationTitleInput(index: number, event: Event): void {
    const title = this.getInputValue(event);
    this.store.dispatch(new Form.Certification.TitleUpdate(index, title));
  }

  public onCertificationOrganizationInput(index: number, event: Event): void {
    const organization = this.getInputValue(event);
    this.store.dispatch(
      new Form.Certification.OrganizationUpdate(index, organization),
    );
  }

  public onCertificationYearInput(index: number, event: Event): void {
    const year = this.getInputValue(event);
    this.store.dispatch(new Form.Certification.YearUpdate(index, year));
  }

  public onCertificationLocationInput(index: number, event: Event): void {
    const location = this.getInputValue(event);
    this.store.dispatch(new Form.Certification.LocationUpdate(index, location));
  }

  private getInputValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
