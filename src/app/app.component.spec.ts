import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AboutSectionComponent } from './about-section/about-section.component';
import { AppComponent } from './app.component';
import { ColorSwitcherComponent } from './color-switcher/color-switcher.component';
import { ContactSectionComponent } from './contact-section/contact-section.component';
import { ExperienceSectionComponent } from './experience-section/experience-section.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { NavbarComponent } from './navbar/navbar.component';

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
        ExperienceSectionComponent
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
    expect(app.title).toEqual('portfolio');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#logotype')?.textContent).toContain('HOWARDPEARCE.CA');
  });
});
