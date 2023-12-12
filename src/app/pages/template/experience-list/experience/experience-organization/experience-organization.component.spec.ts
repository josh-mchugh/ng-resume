import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceOrganizationComponent } from './experience-organization.component';

describe('ExperienceOrganizationComponent', () => {
  let component: ExperienceOrganizationComponent;
  let fixture: ComponentFixture<ExperienceOrganizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExperienceOrganizationComponent],
    });
    fixture = TestBed.createComponent(ExperienceOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
