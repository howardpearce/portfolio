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
