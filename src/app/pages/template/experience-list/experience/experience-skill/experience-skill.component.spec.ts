import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceSkillComponent } from './experience-skill.component';

describe('ExperienceSkillComponent', () => {
  let component: ExperienceSkillComponent;
  let fixture: ComponentFixture<ExperienceSkillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExperienceSkillComponent],
    });
    fixture = TestBed.createComponent(ExperienceSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
