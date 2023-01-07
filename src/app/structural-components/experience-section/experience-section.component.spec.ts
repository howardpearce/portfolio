import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceSectionComponent } from './experience-section.component';
import { YearsDisplayComponent } from './years-display/years-display.component';
import { PlusSignComponent } from './../../utility-components/plus-sign/plus-sign.component';

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
    expect(component.experience.title).toBe("Software Developer @ Ultra Maritime");
    expect(component.experience.date).toBe("January 2021 - January 2023");
    expect(component.experience.description).toBe("I have cultivated valuable software development and software design experience during my work at Ultra. My work primarily consisted of application software development and software architecture design within an Agile Methodology.");
    expect(component.experience.bullets[0]).toBe("Designed and developed micro-service for RS-485 Communication.");
    expect(component.experience.bullets[1]).toBe("Collaborated with team members in an Agile workflow.");
    expect(component.experience.bullets[2]).toBe("Participated in entire software project lifecycle.");
    expect(component.experience.bullets[3]).toBe("Wrote technical documentation and performed requirements derivation.");
    expect(component.experience.bullets[4]).toBe("Performed software architectural design for project PDR and CDR.");
    expect(component.experience.tags[0]).toBe("C++");
    expect(component.experience.tags[1]).toBe("Java");
    expect(component.experience.tags[2]).toBe("Python");
    expect(component.experience.tags[3]).toBe("Docker");
    expect(component.experience.tags[4]).toBe("Jenkins");
  });

  it('can switch data', () => {
    // Just need to test that switching causes a change in the elements, do not need to look at the contents too hard.
    component.switchActiveExperience(1);
    expect(component.experience.title).toBe("Software Developer @ Ultra Maritime");
    expect(component.experience.date).toBe("January 2021 - January 2023");
    expect(component.experience.description).toBe("I have cultivated valuable software development and software design experience during my work at Ultra. My work primarily consisted of application software development and software architecture design within an Agile Methodology.");
    component.switchActiveExperience(2);
    expect(component.experience.title).toBe("Co-op Student @ Pratt & Whitney Canada");
    expect(component.experience.date).toBe("April 2020 - August 2020");
    expect(component.experience.description).toBe("I developed multiple web applications while working at Pratt & Whitney to do analytics on user data for required training courses. This facilitated an increase in training compliance and provided a user interface for their human resources team.");
    component.switchActiveExperience(3);
    expect(component.experience.title).toBe("Student @ Dalhousie University");
    expect(component.experience.date).toBe("September 2016 - December 2020");
    expect(component.experience.description).toBe("I learned many useful theoretical Computer Science concepts at Dalhousie. I graduated with a Bachelors Degree in Computer Science with a specialization in Artificial Intelligence and co-op program designation.");  });
});
