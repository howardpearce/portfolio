/* Global functions can be placed here */
function switchColorsToLight() {
  // get root element which holds the CSS variables
  var root = document.querySelector(":root");
  // set them to be light color scheme
  root.style.setProperty("--bg-color", "#D9D9D9");
  root.style.setProperty("--navbar-color", "rgba(217,217,217,0.85)");
  root.style.setProperty("--bg-color-translucent", "rgba(217,217,217,0.85)");
  root.style.setProperty("--bg-card-color", "#C9C9C9");
  root.style.setProperty("--primary-color", "#1E1E1E");
  root.style.setProperty("--hero-text-color", "#000000");
  root.style.setProperty("--accent-color", "#CB450C");
  currentColorIsLight = true;
}

function switchColorsToDark() {
  // get root element which holds the CSS variables
  var root = document.querySelector(":root");
  // set them to be light color scheme
  root.style.setProperty("--bg-color", "#1E1E1E");
  root.style.setProperty("--navbar-color", "rgba(30,30,30,0.85)");
  root.style.setProperty("--bg-color-translucent", "rgba(30,30,30,0.85)");
  root.style.setProperty("--bg-card-color", "#252525");
  root.style.setProperty("--primary-color", "#D9D9D9");
  root.style.setProperty("--hero-text-color", "#FFFFFF");
  root.style.setProperty("--accent-color", "#CB450C");
  currentColorIsDark = true;
}
