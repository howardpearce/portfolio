function revealColorChanger() {
  var changer = document.querySelector("#switcher-container");
  var tab = document.querySelector("#touch-tab");
  if (tab.style.left == "90px") {
    tab.innerHTML = "<i style='color: var(--primary-color)' class='fa-solid fa-chevron-right'></i>";
    tab.style.left = "0px"
    changer.style.left = "-100px"
  } else {
    tab.innerHTML = "<i style='color: var(--primary-color); font-size: 20px;' class='fa-solid fa-xmark'></i>";
    tab.style.left = "90px"
    changer.style.left = "-10px"
  }
}
