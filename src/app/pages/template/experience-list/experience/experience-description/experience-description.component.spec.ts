import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceDescriptionComponent } from './experience-description.component';

describe('ExperienceDescriptionComponent', () => {
  let component: ExperienceDescriptionComponent;
  let fixture: ComponentFixture<ExperienceDescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExperienceDescriptionComponent],
    });
    fixture = TestBed.createComponent(ExperienceDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
