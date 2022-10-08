import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience-section',
  templateUrl: './experience-section.component.html',
  styleUrls: ['./experience-section.component.css']
})

export class ExperienceSectionComponent implements OnInit {

  experience = {
    title: "Graduate Software Developer @ Ultra Maritime",
    date: "January 2020 - Present",
    description: "I have cultivated valuable software development and software design experience during my work at Ultra. My work primarily consists of application software development and design within Agile Methodology.",
    bullets: [
      "Designed and developed micro-service for Serial Communication.",
      "Collaborate with other team members in an Agile workflow.",
      "Participate in entire software project lifecycle.",
      "Write technical documentation and perform requirements derivation.",
      "Certified SCRUM Master."
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
        this.experience.description = "I developed multiple web applications while working at Pratt & Whitney to do analytics on user data for required training courses. This was in order to increase training compliance and provide a user interface for their human resources team.";
        this.experience.bullets = [
          "Created multiple Data Analytics applications using PHP and C#.",
          "Wrote supporting documentation for applications I created.",
          "Emplyed UX and design principles to create data visualization for non-technical users."
        ];
        this.experience.tags = ["PHP", "ASP", "HTML", "JavaScript"];
        this.prattActive = true;
        this.dalActive = false;
        this.ultraActive = false;
        break;
      }
      case 3: {
        this.experience.title = "Computer Science Student @ Dalhousie University";
        this.experience.date = "September 2016 - December 2020";
        this.experience.description = "I many useful theoretical Computer Science concepts at Dalhousie. I acquired a Bachelors Degree in Computer Science with a specialization in Artificial Intelligence. I also was able to gain invaluable practical experience by participating in their co-op program as well.";
        this.experience.bullets = [
          "Vice President of Ethical Hacking Student Society.",
          "Collaborated on several group projects and strengthened my communication skills.",
          "Implemented and learned about foundational Algorithms and Data Structures.",
          "Gained experience and knowledge in Data Science and Machine Learning"
        ];
        this.experience.tags = ["Machine Learning", "C++", "Java", "Data Structures", "Algorithms"];
        this.prattActive = false;
        this.dalActive = true;
        this.ultraActive = false;
        break;
      }
      default: {
        this.experience.title = "Graduate Software Developer @ Ultra Maritime";
        this.experience.date = "January 2020 - Present";
        this.experience.description = "I have cultivated valuable software development and software design experience during my work at Ultra. My work primarily consists of application software development and design within Agile Methodology.";
        this.experience.bullets = [
            "Designed and developed micro-service for Serial Communication.",
            "Collaborate with other team members in an Agile workflow.",
            "Participate in entire software project lifecycle.",
            "Write technical documentation and perform requirements derivation.",
            "Certified SCRUM Master."
        ];
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
