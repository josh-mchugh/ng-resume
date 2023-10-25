import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { FormCertificationModel } from '@shared/state/form.state';
import { Form } from '@shared/state/form.actions';

@Component({
  selector: 'app-certifications-input',
  templateUrl: './certifications-input.component.html',
  styleUrls: ['./certifications-input.component.scss'],
})
export class CertificationsInputComponent {
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
    const title = (event.target as HTMLInputElement).value;
    this.store.dispatch(new Form.Certification.TitleUpdate(index, title));
  }

  public onCertificationOrganizationInput(index: number, event: Event): void {
    const organization = (event.target as HTMLInputElement).value;
    this.store.dispatch(
      new Form.Certification.OrganizationUpdate(index, organization),
    );
  }

  public onCertificationYearInput(index: number, event: Event): void {
    const year = (event.target as HTMLInputElement).value;
    this.store.dispatch(new Form.Certification.YearUpdate(index, year));
  }

  public onCertificationLocationInput(index: number, event: Event): void {
    const location = (event.target as HTMLInputElement).value;
    this.store.dispatch(new Form.Certification.LocationUpdate(index, location));
  }
}
