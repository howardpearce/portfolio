import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-switcher',
  templateUrl: './color-switcher.component.html',
  styleUrls: ['./color-switcher.component.css']
})
export class ColorSwitcherComponent implements OnInit {

  isDarkActive = true;
  isLightActive = false;

  constructor() { }

  setDarkActive() {
    this.isLightActive = false;
    this.isDarkActive = true;
  }

  setLightActive() {
    this.isDarkActive = false;
    this.isLightActive = true;
  }

  ngOnInit(): void {
  }

}
