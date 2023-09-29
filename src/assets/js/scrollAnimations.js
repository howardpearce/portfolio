
isElementLoaded('.scroll-animated').then((animatedElements) => {

  var hiddenElements = document.querySelectorAll('.scroll-animated');

  // Hide all scroll animated elements
  for (el of hiddenElements) {
    el.classList.add('hide');
  }

  // IntersectionObserver that reveals textual elements as user scrolls
  // TODO: Once text is shown, make it stay.
  var textObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  });

  hiddenElements.forEach((el) => textObserver.observe(el));

  // IntersectionObserver specifically for the 'years' indicator in the about section
  var yearsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show-years');
      }
    });
  });

  hiddenElements = document.querySelectorAll('.years');
  hiddenElements.forEach((el) => yearsObserver.observe(el));
});
