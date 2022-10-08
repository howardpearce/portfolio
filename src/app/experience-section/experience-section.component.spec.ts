import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceSectionComponent } from './experience-section.component';

describe('ExperienceSectionComponent', () => {
  let component: ExperienceSectionComponent;
  let fixture: ComponentFixture<ExperienceSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienceSectionComponent ]
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
    expect(component.experience.title).toBe("Graduate Software Developer @ Ultra Maritime");
    expect(component.experience.date).toBe("January 2020 - Present");
    expect(component.experience.description).toBe("I have cultivated valuable software development and software design experience during my work at Ultra. My work primarily consists of application software development and design within Agile Methodology.");
    expect(component.experience.bullets[0]).toBe("Designed and developed micro-service for Serial Communication.");
    expect(component.experience.bullets[1]).toBe("Collaborate with other team members in an Agile workflow.");
    expect(component.experience.bullets[2]).toBe("Participate in entire software project lifecycle.");
    expect(component.experience.bullets[3]).toBe("Write technical documentation and perform requirements derivation.");
    expect(component.experience.bullets[4]).toBe("Certified SCRUM Master.");
    expect(component.experience.tags[0]).toBe("C++");
    expect(component.experience.tags[1]).toBe("Java");
    expect(component.experience.tags[2]).toBe("Python");
    expect(component.experience.tags[3]).toBe("Docker");
    expect(component.experience.tags[4]).toBe("Jenkins");
  });

  it('can switch data', () => {
    // Just need to test that switching causes a change in the elements, do not need to look at the contents too hard.
    component.switchActiveExperience(1);
    expect(component.experience.title).toBe("Graduate Software Developer @ Ultra Maritime");
    expect(component.experience.date).toBe("January 2020 - Present");
    expect(component.experience.description).toBe("I have cultivated valuable software development and software design experience during my work at Ultra. My work primarily consists of application software development and design within Agile Methodology.");
    component.switchActiveExperience(2);
    expect(component.experience.title).toBe("Co-op Student @ Pratt & Whitney Canada");
    expect(component.experience.date).toBe("April 2020 - August 2020");
    expect(component.experience.description).toBe("I developed multiple web applications while working at Pratt & Whitney to do analytics on user data for required training courses. This was in order to increase training compliance and provide a user interface for their human resources team.");
    component.switchActiveExperience(3);
    expect(component.experience.title).toBe("Computer Science Student @ Dalhousie University");
    expect(component.experience.date).toBe("September 2016 - December 2020");
    expect(component.experience.description).toBe("I many useful theoretical Computer Science concepts at Dalhousie. I acquired a Bachelors Degree in Computer Science with a specialization in Artificial Intelligence. I also was able to gain invaluable practical experience by participating in their co-op program as well.");  });
});
