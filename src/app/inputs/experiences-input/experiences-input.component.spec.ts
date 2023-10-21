import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencesInputComponent } from './experiences-input.component';

describe('ExperiencesInputComponent', () => {
  let component: ExperiencesInputComponent;
  let fixture: ComponentFixture<ExperiencesInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExperiencesInputComponent],
    });
    fixture = TestBed.createComponent(ExperiencesInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
