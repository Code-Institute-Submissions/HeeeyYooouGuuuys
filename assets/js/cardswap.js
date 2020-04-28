// Modals

// About modal

// Get the modal
let modal = document.getElementById("aboutModal");

// target "About" Nav-item
let btn = document.getElementById("aboutButton");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 

// Credit Modal

// Get the modal
let creditModal = document.getElementById("creditModal");

// target "About" Nav-item
let creditBtn = document.getElementById("creditButton");

// Get the <span> element that closes the modal
// let span = document.getElementsByClassName("close")[0];

// open the modal
creditBtn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == creditModal) {
    modal.style.display = "none";
  }
} 

// Audio //

let bgm = document.getElementById("bgm");
let isPlaying = false;
let musicButtonToggle = document.getElementById("music-button")

function togglePlay() {
  if (isPlaying) {
    bgm.pause()
  } else {
    bgm.play();
  }
};
bgm.onplaying = function() {
  isPlaying = true;
  musicButtonToggle.innerHTML = "Music: on";
};
bgm.onpause = function() {
  isPlaying = false;
  musicButtonToggle.innerHTML = "Music: off"
};





