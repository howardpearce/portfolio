import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSectionComponent } from './about-section.component';
import { PlusSignComponent } from './../../utility-components/plus-sign/plus-sign.component';

describe('AboutSectionComponent', () => {
  let component: AboutSectionComponent;
  let fixture: ComponentFixture<AboutSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutSectionComponent, PlusSignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
