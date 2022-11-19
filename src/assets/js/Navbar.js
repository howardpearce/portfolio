
// is the provided HTML element visible by the user
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)

  );
}

// iterate over every link and remove it's active tag
function clearLinks() {
  links.forEach ( (link) => {
    link.classList.remove("highlight-text");
  });
  // repeat for mobile version of links
  mobileLinks.forEach ( (mobileLink) => {
    mobileLink.classList.remove("highlight-text");
  });
}

// declare these now so we can initialize + reference them later.

let homeSection, aboutSection, experienceSection, contactSection, sections;
let homeLink, aboutLink, experienceLink, contactLink, links;
let homeMobileLink, aboutMobileLink, experienceMobileLink, contactMobileLink, mobilelinks;

// gather references to all the HTML elements we will be looking at after the website loads.
document.addEventListener("DOMContentLoaded", (event) => {
  // sections to view
  homeSection = document.querySelector("#hero-container");
  aboutSection = document.querySelector("#about-container");
  experienceSection = document.querySelector("#experience-container");
  contactSection = document.querySelector("#contact-container");
  sections = new Array(homeSection, aboutSection, experienceSection, contactSection);
  // links to modify
  homeLink = document.querySelector("#home-link");
  aboutLink = document.querySelector("#about-link");
  experienceLink = document.querySelector("#experience-link");
  contactLink = document.querySelector("#contact-link");
  links = new Array(homeLink, aboutLink, experienceLink, contactLink);
  // the links for the mobile version of the site
  homeMobileLink = document.querySelector("#home-mobile-link");
  aboutMobileLink = document.querySelector("#about-mobile-link");
  experienceMobileLink = document.querySelector("#experience-mobile-link");
  contactMobileLink = document.querySelector("#contact-mobile-link");
  mobileLinks = new Array(homeMobileLink, aboutMobileLink, experienceMobileLink, contactMobileLink);
});

// whenever user scrolls
document.addEventListener('scroll', (event) => {
  sections.forEach ( (section, index) => {
    // select the section that is currently in the users viewport
    if (isInViewport(section)) {
      // remove the active link tag from every element
      clearLinks();
      // apply the active link tag to the currently visible one
      links[index].classList.add("highlight-text");
      mobileLinks[index].classList.add("highlight-text");
    }
  });
});

// receives a click event from the navbar links and scrolls to the element that was selected
function scrollUserTo(context) {
  // for full-width links
  links.forEach ( (link, index) => {
    if (context == link) {
      sections[index].scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  });
  // for mobile links
  mobileLinks.forEach ( (mobileLink, index) => {
    if (context == mobileLink) {
      sections[index].scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  });
}
