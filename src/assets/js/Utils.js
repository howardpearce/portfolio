 // Cannot start until HTML has been rendered
 document.addEventListener("DOMContentLoaded", function () {
  // grab element that holds the clock text
  var timeText = document.querySelector("#time-text");
  // create a function to update the time text every second
  setInterval(function () {
    let halifax_time = new Date().toLocaleString("en-US", { timeZone: "Canada/Atlantic" });
    let date = new Date(halifax_time);
    let hour = date.getHours().toString().padStart(2, "0");
    let minute = date.getMinutes().toString().padStart(2, "0");
    let second = date.getSeconds().toString().padStart(2, "0");
    timeText.innerHTML = (hour + ":" + minute + ":" + second);
  }, 1000);
 });

// Cannot start until HTML has been rendered
// document.addEventListener("DOMContentLoaded", function () {
//   var annoyingContainer = document.querySelector("#experience-list-container");
//   var newWidth = document.querySelector(".experience-detail").clientWidth;
//   if (screen.width < 900) {
//     annoyingContainer.style.maxWidth = newWidth + "px";

//     var pixelValue = annoyingContainer.style.maxWidth.slice(0, -2);
//     console.log(pixelValue);
//     console.log(annoyingContainer.clientWidth)

//     if (annoyingContainer.clientWidth != parseInt(pixelValue)) {
//       document.querySelector("#right-arrow").style.display = "none";
//       document.querySelector("#left-arrow").style.display = "none";
//     }
//   }
// });
