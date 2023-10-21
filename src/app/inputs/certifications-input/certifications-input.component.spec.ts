import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationsInputComponent } from './certifications-input.component';

describe('CertificationsInputComponent', () => {
  let component: CertificationsInputComponent;
  let fixture: ComponentFixture<CertificationsInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificationsInputComponent],
    });
    fixture = TestBed.createComponent(CertificationsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
