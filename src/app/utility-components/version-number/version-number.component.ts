import { Component, OnInit } from '@angular/core';
import packageInfo from "../../../../package.json";

@Component({
  selector: 'app-version-number',
  templateUrl: './version-number.component.html',
  styleUrls: ['./version-number.component.css']
})
export class VersionNumberComponent implements OnInit {

  version: string = packageInfo.version;

  constructor() { }

  ngOnInit(): void {

  }

}
