/* Global functions can be placed here */
function switchColorsToLight() {
  // get root element which holds the CSS variables
  var root = document.querySelector(":root");
  // set them to be light color scheme
  root.style.setProperty("--bg-color", "#D9D9D9");
  root.style.setProperty("--navbar-color", "rgba(217,217,217,0.85)");
  root.style.setProperty("--bg-color-translucent", "rgba(217,217,217,0.85)");
  root.style.setProperty("--bg-card-color", "#C9C9C9");
  root.style.setProperty("--bg-card-color-highlight", "#B9B9B9");
  root.style.setProperty("--about-image-background", "#AAAAAA")
  root.style.setProperty("--primary-color", "#1E1E1E");
  root.style.setProperty("--hero-text-color", "#000000");
  root.style.setProperty("--accent-color", "#CB450C");
  ani.grid.setColor(COLOR_MODE.LIGHT)
}

function switchColorsToDark() {
  // get root element which holds the CSS variables
  var root = document.querySelector(":root");
  // set them to be light color scheme
  root.style.setProperty("--bg-color", "#1E1E1E");
  root.style.setProperty("--navbar-color", "rgba(30,30,30,0.85)");
  root.style.setProperty("--bg-color-translucent", "rgba(30,30,30,0.85)");
  root.style.setProperty("--bg-card-color", "#252525");
  root.style.setProperty("--bg-card-color-highlight", "#2D2D2D");
  root.style.setProperty("--bg-card-color-highlight-bright", "#555555")
  root.style.setProperty("--about-image-background", "#999999")
  root.style.setProperty("--primary-color", "#D9D9D9");
  root.style.setProperty("--hero-text-color", "#FFFFFF");
  root.style.setProperty("--accent-color", "#CB450C");
  ani.grid.setColor(COLOR_MODE.DARK)
}
