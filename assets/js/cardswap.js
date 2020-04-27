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

// Audio //

var bgm = document.getElementById("chipAudio"); 

function playAudio() { 
  bgm.play(); 
} 

function pauseAudio() { 
  bgm.pause(); 
} 