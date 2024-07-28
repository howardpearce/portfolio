function emailToClipboard(address){
  navigator.clipboard.writeText(address)
}

function toggleEmailCopy() {
  var emailToggle = document.getElementById('emailToggle')
  if (emailToggle.classList.contains('fa-solid')) {
    emailToggle.classList.remove("fa-solid")
    emailToggle.classList.add("fa-regular")
  } else {
    emailToggle.classList.remove("fa-regular")
    emailToggle.classList.add("fa-solid")
  }
}

function showCopyText() {
  var copyText = document.getElementById('copyText')
  copyText.classList.remove("transparent")
  setTimeout((copyText) => {
    this.copyText.classList.add("transparent")
  }, 1000);
}
