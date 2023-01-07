import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceSectionComponent } from './experience-section.component';
import { YearsDisplayComponent } from './years-display/years-display.component';
import { PlusSignComponent } from './../../utility-components/plus-sign/plus-sign.component';

import { Experience } from 'src/app/structural-components/experience-section/experience';


describe('ExperienceSectionComponent', () => {
  let component: ExperienceSectionComponent;
  let fixture: ComponentFixture<ExperienceSectionComponent>;

  let ultraExperience = new Experience(
    "Software Developer @ Ultra Maritime",
    "January 2021 - January 2023",
    "I have cultivated valuable software development and software design experience during my work at Ultra. My work primarily consisted of application software development and software architecture design within an Agile Methodology.",
    [
      "Designed and developed micro-service for RS-485 Communication.",
      "Collaborated with team members in an Agile workflow.",
      "Participated in entire software project lifecycle.",
      "Wrote technical documentation and performed requirements derivation.",
      "Performed software architectural design for project PDR and CDR."
    ],
    [ "C++","Java","Python","Docker","Jenkins" ]
  );

  let prattExperience = new Experience(
    "Co-op Student @ Pratt & Whitney Canada",
    "April 2020 - August 2020",
    "I developed multiple web applications while working at Pratt & Whitney to do analytics on user data for required training courses. This facilitated an increase in training compliance and provided a user interface for their human resources team.",
    [
      "Created multiple Data Analytics applications using PHP and C#.",
      "Wrote supporting documentation for applications I created.",
      "Employed UX and design principles to create data visualizations for non-technical users."
    ],
    [ "PHP", "ASP", "C#", "JavaScript" ]
  );

  let dalhousieExperience = new Experience(
    "Student @ Dalhousie University",
    "September 2016 - December 2020",
    "I learned many useful theoretical Computer Science concepts at Dalhousie. I graduated with a Bachelors Degree in Computer Science with a specialization in Artificial Intelligence and co-op program designation.",
    [
      "Vice President of Ethical Hacking Student Society (D.E.H.S).",
      "Implemented and learned about foundational Algorithms and Data Structures.",
      "Gained experience and knowledge in Data Science and Machine Learning",
      "1 year and 4 months of work experience gained in co-op program."
    ],
    [ "Machine Learning", "C++", "Java", "Data Structures", "Algorithms" ]
  );

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
