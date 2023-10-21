import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialsInputComponent } from './socials-input.component';

describe('SocialsInputComponent', () => {
  let component: SocialsInputComponent;
  let fixture: ComponentFixture<SocialsInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocialsInputComponent],
    });
    fixture = TestBed.createComponent(SocialsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
