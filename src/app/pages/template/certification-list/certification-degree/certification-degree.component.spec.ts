import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationDegreeComponent } from './certification-degree.component';

describe('CertificationDegreeComponent', () => {
  let component: CertificationDegreeComponent;
  let fixture: ComponentFixture<CertificationDegreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificationDegreeComponent],
    });
    fixture = TestBed.createComponent(CertificationDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
