function openModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "block";
}

function closeModal(event) {
  var modal = event.path.find(el => el.className == "modal");
  modal.style.display = "none";
}

// When the user clicks away from the modal, close it
window.onclick = function(event) {
  if(event.target.className == "modal") {
    event.target.style.display = "none";
  }
}
