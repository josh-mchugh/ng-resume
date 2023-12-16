import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCertificationComponent } from './header-certification.component';

describe('HeaderCertificationComponent', () => {
  let component: HeaderCertificationComponent;
  let fixture: ComponentFixture<HeaderCertificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderCertificationComponent],
    });
    fixture = TestBed.createComponent(HeaderCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
