import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience-section',
  templateUrl: './experience-section.component.html',
  styleUrls: ['./experience-section.component.css']
})

export class ExperienceSectionComponent implements OnInit {

  experience = {
    title: "Software Developer @ Ultra Maritime",
    date: "January 2021 - January 2023",
    description: "I have cultivated valuable software development and software design experience during my work at Ultra. My work primarily consisted of application software development and software architecture design within an Agile Methodology.",
    bullets: [
      "Designed and developed micro-service for RS-485 Communication.",
      "Collaborated with team members in an Agile workflow.",
      "Participated in entire software project lifecycle.",
      "Wrote technical documentation and performed requirements derivation.",
      "Performed software architectural design for project PDR and CDR."
    ],
    tags: [
      "C++",
      "Java",
      "Python",
      "Docker",
      "Jenkins"
    ]
  };

  ultraActive = true;
  prattActive = false;
  dalActive = false;

  constructor() { }

  switchActiveExperience( num: number) {
    switch (num) {
      case 2: {
        this.experience.title = "Co-op Student @ Pratt & Whitney Canada";
        this.experience.date = "April 2020 - August 2020";
        this.experience.description = "I developed multiple web applications while working at Pratt & Whitney to do analytics on user data for required training courses. This facilitated an increase in training compliance and provided a user interface for their human resources team.";
        this.experience.bullets = [
          "Created multiple Data Analytics applications using PHP and C#.",
          "Wrote supporting documentation for applications I created.",
          "Employed UX and design principles to create data visualizations for non-technical users."
        ];
        this.experience.tags = ["PHP", "ASP", "C#", "JavaScript"];
        this.prattActive = true;
        this.dalActive = false;
        this.ultraActive = false;
        break;
      }
      case 3: {
        this.experience.title = "Student @ Dalhousie University";
        this.experience.date = "September 2016 - December 2020";
        this.experience.description = "I learned many useful theoretical Computer Science concepts at Dalhousie. I graduated with a Bachelors Degree in Computer Science with a specialization in Artificial Intelligence and co-op program designation.";
        this.experience.bullets = [
          "Vice President of Ethical Hacking Student Society (D.E.H.S).",
          "Implemented and learned about foundational Algorithms and Data Structures.",
          "Gained experience and knowledge in Data Science and Machine Learning",
          "1 year and 4 months of work experience gained in co-op program."
        ];
        this.experience.tags = ["Machine Learning", "C++", "Java", "Data Structures", "Algorithms"];
        this.prattActive = false;
        this.dalActive = true;
        this.ultraActive = false;
        break;
      }
      default: {
        this.experience.title = "Software Developer @ Ultra Maritime";
        this.experience.date = "January 2021 - January 2023";
        this.experience.description = "I have cultivated valuable software development and software design experience during my work at Ultra. My work primarily consisted of application software development and software architecture design within an Agile Methodology.";
        this.experience.bullets = [
          "Designed and developed micro-service for RS-485 Communication.",
          "Collaborated with team members in an Agile workflow.",
          "Participated in entire software project lifecycle.",
          "Wrote technical documentation and performed requirements derivation.",
          "Performed software architectural design for project PDR and CDR."
        ],
        this.experience.tags = ["C++", "Java", "Python", "Docker", "Jenkins"]
        this.prattActive = false;
        this.dalActive = false;
        this.ultraActive = true;
        break;
      }
    }
  }

  ngOnInit(): void {
  }

}
