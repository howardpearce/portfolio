import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceSectionComponent } from './experience-section.component';
import { YearsDisplayComponent } from './years-display/years-display.component';
import { PlusSignComponent } from './../../utility-components/plus-sign/plus-sign.component';

import { ultraExperience, prattExperience, dalhousieExperience } from 'src/app/structural-components/experience-section/experience';

describe('ExperienceSectionComponent', () => {

  let component: ExperienceSectionComponent;
  let fixture: ComponentFixture<ExperienceSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienceSectionComponent, PlusSignComponent, YearsDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has correct default data', () => {
      // check all the default data is corrected
      expect(component.activeExperience.title).toBe(ultraExperience.title);
      expect(component.activeExperience.date).toBe(ultraExperience.date);
      expect(component.activeExperience.description).toBe(ultraExperience.description);
      expect(component.activeExperience.bullets[0]).toBe(ultraExperience.bullets[0]);
      expect(component.activeExperience.bullets[1]).toBe(ultraExperience.bullets[1]);
      expect(component.activeExperience.bullets[2]).toBe(ultraExperience.bullets[2]);
      expect(component.activeExperience.bullets[3]).toBe(ultraExperience.bullets[3]);
      expect(component.activeExperience.bullets[4]).toBe(ultraExperience.bullets[4]);
      expect(component.activeExperience.tags[0]).toBe(ultraExperience.tags[0]);
      expect(component.activeExperience.tags[1]).toBe(ultraExperience.tags[1]);
      expect(component.activeExperience.tags[2]).toBe(ultraExperience.tags[2]);
      expect(component.activeExperience.tags[3]).toBe(ultraExperience.tags[3]);
      expect(component.activeExperience.tags[4]).toBe(ultraExperience.tags[4]);
      expect(component.ultraActive).toBe(true);
      expect(component.prattActive).toBe(false);
      expect(component.dalActive).toBe(false);
    }
  );

  it('can switch data', () => {
      // Just need to test that switching causes a change in the elements, do not need to look at the contents too hard.
      component.switchActiveExperience(1);
      expect(component.activeExperience.title).toBe(ultraExperience.title);
      expect(component.activeExperience.date).toBe(ultraExperience.date);
      expect(component.activeExperience.description).toBe(ultraExperience.description);
      expect(component.ultraActive).toBe(true);
      expect(component.prattActive).toBe(false);
      expect(component.dalActive).toBe(false);
      component.switchActiveExperience(2);
      expect(component.activeExperience.title).toBe(prattExperience.title);
      expect(component.activeExperience.date).toBe(prattExperience.date);
      expect(component.activeExperience.description).toBe(prattExperience.description);
      expect(component.ultraActive).toBe(false);
      expect(component.prattActive).toBe(true);
      expect(component.dalActive).toBe(false);
      component.switchActiveExperience(3);
      expect(component.activeExperience.title).toBe(dalhousieExperience.title);
      expect(component.activeExperience.date).toBe(dalhousieExperience.date);
      expect(component.activeExperience.description).toBe(dalhousieExperience.description);
      expect(component.ultraActive).toBe(false);
      expect(component.prattActive).toBe(false);
      expect(component.dalActive).toBe(true);
    }
  );
});
