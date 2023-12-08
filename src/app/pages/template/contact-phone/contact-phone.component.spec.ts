import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPhoneComponent } from './contact-phone.component';

describe('ContactPhoneComponent', () => {
  let component: ContactPhoneComponent;
  let fixture: ComponentFixture<ContactPhoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactPhoneComponent],
    });
    fixture = TestBed.createComponent(ContactPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
