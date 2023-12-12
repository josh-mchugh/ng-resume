import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencePositionComponent } from './experience-position.component';

describe('ExperiencePositionComponent', () => {
  let component: ExperiencePositionComponent;
  let fixture: ComponentFixture<ExperiencePositionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExperiencePositionComponent],
    });
    fixture = TestBed.createComponent(ExperiencePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
