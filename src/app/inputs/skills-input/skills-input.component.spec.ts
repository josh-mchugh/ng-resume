import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsInputComponent } from './skills-input.component';

describe('SkillsInputComponent', () => {
  let component: SkillsInputComponent;
  let fixture: ComponentFixture<SkillsInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillsInputComponent],
    });
    fixture = TestBed.createComponent(SkillsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
