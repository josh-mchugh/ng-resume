import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationOrganizationComponent } from './certification-organization.component';

describe('CertificationOrganizationComponent', () => {
  let component: CertificationOrganizationComponent;
  let fixture: ComponentFixture<CertificationOrganizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificationOrganizationComponent],
    });
    fixture = TestBed.createComponent(CertificationOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
