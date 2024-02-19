import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { FormCertification, FormState } from '@shared/state/form.state';
import { Form } from '@shared/state/form.actions';

@Component({
  selector: 'app-certifications-input',
  templateUrl: './certifications-input.component.html',
  styleUrls: ['./certifications-input.component.scss'],
})
export class CertificationsInputComponent {
  formCertifications$: Observable<FormCertification[]>;

  constructor(private store: Store) {
    this.formCertifications$ = this.store.select(FormState.getCertifications());
  }

  public handleCertificationTrackBy(index: number): number {
    return index;
  }

  public onCertificationCreate(): boolean {
    this.store.dispatch(new Form.Certification.Create());
    return false;
  }

  public onCertificationDelete(id: string): boolean {
    this.store.dispatch(new Form.Certification.Delete(id));
    return false;
  }

  public onCertificationTitleInput(id: string, event: Event): void {
    const title = (event.target as HTMLInputElement).value;
    this.store.dispatch(new Form.Certification.TitleUpdate(id, title));
  }

  public onCertificationOrganizationInput(id: string, event: Event): void {
    const organization = (event.target as HTMLInputElement).value;
    this.store.dispatch(
      new Form.Certification.OrganizationUpdate(id, organization),
    );
  }

  public onCertificationYearInput(id: string, event: Event): void {
    const year = (event.target as HTMLInputElement).value;
    this.store.dispatch(new Form.Certification.YearUpdate(id, year));
  }

  public onCertificationLocationInput(id: string, event: Event): void {
    const location = (event.target as HTMLInputElement).value;
    this.store.dispatch(new Form.Certification.LocationUpdate(id, location));
  }
}
