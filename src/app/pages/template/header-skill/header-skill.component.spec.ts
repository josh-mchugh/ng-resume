import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSkillComponent } from './header-skill.component';

describe('HeaderSkillComponent', () => {
  let component: HeaderSkillComponent;
  let fixture: ComponentFixture<HeaderSkillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderSkillComponent],
    });
    fixture = TestBed.createComponent(HeaderSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
