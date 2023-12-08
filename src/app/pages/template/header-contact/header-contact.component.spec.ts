import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderContactComponent } from './header-contact.component';

describe('HeaderContactComponent', () => {
  let component: HeaderContactComponent;
  let fixture: ComponentFixture<HeaderContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderContactComponent],
    });
    fixture = TestBed.createComponent(HeaderContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
