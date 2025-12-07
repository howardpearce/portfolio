import { Component, OnInit } from '@angular/core';
declare function switchColorsToLight():any;

@Component({
  selector: 'app-hero-section',
  standalone: false,
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
