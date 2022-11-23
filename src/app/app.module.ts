import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroSectionComponent } from './structural-components/hero-section/hero-section.component';
import { AboutSectionComponent } from './structural-components/about-section/about-section.component';
import { ExperienceSectionComponent } from './structural-components/experience-section/experience-section.component';
import { ContactSectionComponent } from './structural-components/contact-section/contact-section.component';
import { NavbarComponent } from './structural-components/navbar/navbar.component';
import { ColorSwitcherComponent } from './utility-components/color-switcher/color-switcher.component';
import { FooterComponent } from './structural-components/footer/footer.component';
import { PlusSignComponent } from './utility-components/plus-sign/plus-sign.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    ExperienceSectionComponent,
    ContactSectionComponent,
    NavbarComponent,
    ColorSwitcherComponent,
    FooterComponent,
    PlusSignComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
