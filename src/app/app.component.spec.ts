import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import { AboutSectionComponent } from './structural-components/about-section/about-section.component';
import { ContactSectionComponent } from './structural-components/contact-section/contact-section.component';
import { ExperienceSectionComponent } from './structural-components/experience-section/experience-section.component';
import { YearsDisplayComponent } from './structural-components/experience-section/years-display/years-display.component';
import { HeroSectionComponent } from './structural-components/hero-section/hero-section.component';
import { NavbarComponent } from './structural-components/navbar/navbar.component';
import { FooterComponent } from './structural-components/footer/footer.component';

import { ColorSwitcherComponent } from './utility-components/color-switcher/color-switcher.component';
import { PlusSignComponent } from './utility-components/plus-sign/plus-sign.component';
import { PreloaderComponent } from './utility-components/preloader/preloader.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        NavbarComponent,
        ColorSwitcherComponent,
        HeroSectionComponent,
        ContactSectionComponent,
        AboutSectionComponent,
        ExperienceSectionComponent,
        PlusSignComponent,
        FooterComponent,
        PreloaderComponent,
        YearsDisplayComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'portfolio'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Howard Pearce');
  });

  it('should render title', () => {
    const compiled = getCompiledDOM();
    expect(compiled.querySelector('#logotype')?.textContent).toContain('HOWARDPEARCE.CA');
  });

  it('has an about section', () => {
    const compiled = getCompiledDOM();
    const aboutTitle = compiled.querySelector('#about-title')
    expect(aboutTitle?.textContent).toContain('ABOUT ME');
  });

  it('has an experience section', () => {
    const compiled = getCompiledDOM();
    const experienceTitle = compiled.querySelector('#experience-title')
    const experienceContentTitle = compiled.querySelector('#experience-content-title')
    expect(experienceTitle?.textContent).toContain('PROFESSIONAL EXPERIENCE');
    expect(experienceContentTitle?.textContent).toContain('Software Developer @ Ultra Maritime');
  });

  function getCompiledDOM() {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    return (fixture.nativeElement as HTMLElement);
  }
});
