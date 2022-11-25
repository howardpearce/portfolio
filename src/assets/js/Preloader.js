window.addEventListener("load", (event) => {
  // fade away preloader
  var preloader = document.querySelector("#preloader-body");
  setTimeout( () => {fadeTo(preloader, 0, 200)}, 2000 );
});

// copied the following stackoverflow link since there's not an easy way to fade out an element without Jquery
// https://stackoverflow.com/questions/68365106/fade-in-and-fade-out-using-pure-javascript-in-a-simple-way
function fadeTo(element, toValue = 0, duration = 200) {
  // Store our element's current opacity (or default to 1 if null)
  const fromValue = parseFloat(element.style.opacity) || 1;

  // Mark the start time (in ms). We use this to calculate a ratio
  // over time that applied to our supplied duration argument
  const startTime = Date.now();

  // Determines time (ms) between each frame. Sometimes you may not
  // want a full 60 fps for performance reasons or aesthetic
  const framerate = 1000 / 60; // 60fps

  // Store reference to interval (number) so we can clear it later
  let interval = setInterval(() => {
      const currentTime = Date.now();

      // This creates a normalized number between now vs when we
      // started and how far into our desired duration it goes
      const timeDiff = (currentTime - startTime) / duration;

      // Interpolate our values using the ratio from above
      const value = fromValue - (fromValue - toValue) * timeDiff;

      // If our ratio is >= 1, then we're done.. so stop processing
      if (timeDiff >= 1) {
          clearInterval(interval);
          interval = 0;
      }

      // Apply visual. Style attributes are strings.
      element.style.opacity = value.toString();
  }, framerate)
}
