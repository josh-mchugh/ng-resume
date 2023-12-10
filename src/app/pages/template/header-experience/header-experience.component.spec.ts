import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderExperienceComponent } from './header-experience.component';

describe('HeaderExperienceComponent', () => {
  let component: HeaderExperienceComponent;
  let fixture: ComponentFixture<HeaderExperienceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderExperienceComponent],
    });
    fixture = TestBed.createComponent(HeaderExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
