
isElementLoaded('app-about-section').then((root) => {
  // IntersectionObserver that reveals textual elements as user scrolls
  var textObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  });

  var hiddenElements = document.querySelectorAll('.scroll-animated');
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
