var TIME_TEXT_ID = '#time-text';
// Cannot start until HTML has been rendered
isElementLoaded(TIME_TEXT_ID).then((timeText) =>{
  // create a function to update the time text every second
  setInterval(function () {
      let halifax_time = new Date().toLocaleString("en-US", { timeZone: "Canada/Atlantic" });
      let date = new Date(halifax_time);
      let hour = date.getHours().toString().padStart(2, "0");
      let minute = date.getMinutes().toString().padStart(2, "0");
      let second = date.getSeconds().toString().padStart(2, "0");
      timeText.innerHTML = (hour + ":" + minute + ":" + second);
    }, 1000);
  }
);


