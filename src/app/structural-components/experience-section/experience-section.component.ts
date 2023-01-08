import { Component, OnInit } from '@angular/core';
import { ultraExperience, prattExperience, dalhousieExperience } from 'src/app/structural-components/experience-section/experience';

@Component({
  selector: 'app-experience-section',
  templateUrl: './experience-section.component.html',
  styleUrls: ['./experience-section.component.css']
})

export class ExperienceSectionComponent implements OnInit {

  activeExperience = ultraExperience;

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
        this.activeExperience = prattExperience;
        this.prattActive = true;
        break;
      }
      // Dalhousie Experience
      case 3: {
        this.activeExperience = dalhousieExperience;
        this.dalActive = true;
        break;
      }
      // Ultra Experience (Where I'm currently working)
      default: {
        this.activeExperience = ultraExperience;
        this.ultraActive = true;
        break;
      }
    }
  }

  ngOnInit(): void {}

}
