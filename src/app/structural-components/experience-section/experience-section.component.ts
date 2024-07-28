import { Component, OnInit } from '@angular/core';
import { arcticWolfExperience, ultraExperience, prattExperience, dalhousieExperience } from 'src/app/structural-components/experience-section/experience';

@Component({
  selector: 'app-experience-section',
  templateUrl: './experience-section.component.html',
  styleUrls: ['./experience-section.component.css']
})

export class ExperienceSectionComponent implements OnInit {

  activeExperience = arcticWolfExperience;

  arcticWolfActive = true;
  ultraActive = false;
  prattActive = false;

  constructor() { }

  /**
   * Sets the currently visible experience on screen to be a different one.
   * @param num number corresponding to the experience to switch to (ultra = 1, pratt = 2, dal = 3)
   */
  switchActiveExperience( num: number) {
    // reset all experiences to be off
    this.ultraActive = false;
    this.prattActive = false;
    this.arcticWolfActive = false;
    switch (num) {
      // Ultra Maritime experience
      case 2: {
        this.activeExperience = ultraExperience;
        this.ultraActive = true;
        break;
      }
      // Pratt & Whitney experience
      case 3: {
        this.activeExperience = prattExperience;
        this.prattActive = true;
        break;
      }
      // Dalhousie Experience
      // case 4: {
      //   this.activeExperience = dalhousieExperience;
      //   this.dalActive = true;
      //   break;
      // }
      // Arctic Wolf Experience
      default: {
        this.activeExperience = arcticWolfExperience;
        this.arcticWolfActive = true;
        break;
      }
    }
  }

  ngOnInit(): void {}

}
