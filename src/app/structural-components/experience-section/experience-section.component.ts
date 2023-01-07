import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience-section',
  templateUrl: './experience-section.component.html',
  styleUrls: ['./experience-section.component.css']
})

export class ExperienceSectionComponent implements OnInit {

  ultraExperience = new Experience(
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

  prattExperience = new Experience(
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

  dalhousieExperience = new Experience(
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

  activeExperience = this.ultraExperience;

  ultraActive = true;
  prattActive = false;
  dalActive = false;

  constructor() { }

  /**
   * Sets the currently visible experience on screen to be a different one.
   * @param num number corresponding to the experience to switch to (ultra = 1, pratt = 2, dal = 3)
   */
  switchActiveExperience( num: number) {
    // reset all experiences to be off
    this.ultraActive = false;
    this.prattActive = false;
    this.dalActive = false;
    switch (num) {
      // Pratt & Whitney experience
      case 2: {
        this.activeExperience = this.prattExperience;
        this.prattActive = true;
        break;
      }
      // Dalhousie Experience
      case 3: {
        this.activeExperience = this.dalhousieExperience;
        this.dalActive = true;
        break;
      }
      // Ultra Experience (Where I'm currently working)
      default: {
        this.activeExperience = this.ultraExperience;
        this.ultraActive = true;
        break;
      }
    }
  }

  ngOnInit(): void {}

}

/**
 * Contains all the information required to display a work experience on screen
 */
class Experience {
  title: string;
  date: string;
  description: string;
  bullets: string[];
  tags: string[];

  /**
   * Create a new experience
   * @param title Title of the experience
   * @param date Date that the experience occurred as a string
   * @param description Description of the experience
   * @param bullets Bullet list of action statements that summarize what was done during experience
   * @param tags Bullet list of the technologies used during the experience
   */
  constructor(title: string, date: string, description: string, bullets: string[], tags: string[]) {
    this.title = title;
    this.date = date;
    this.description = description;
    this.bullets = bullets;
    this.tags = tags;
  }
}
