isElementLoaded('#years-of-experience').then((yearsContainer) => {
  var start = new Date("2020/01/01");
  var diff = new Date(Date.now() - start);
  yearsContainer.textContent = diff.getUTCFullYear() - 1970;
})
