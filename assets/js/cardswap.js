// Modals

// Get the modal
let modal = document.getElementsByClassName('modal');

// Get the button that opens the modal
let btn = document.getElementsByClassName("modalOpen");


// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close");

// When the user clicks the button, open the modal 
btn[0].onclick = function() {
    modal[0].style.display = "block";
}

btn[1].onclick = function() {
    modal[1].style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span[0].onclick = function() {
    modal[0].style.display = "none";
}

span[1].onclick = function() {
    modal[1].style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal[0]) {
        modal[0].style.display = "none";
    }
    if (event.target == modal[1]) {
        modal[1].style.display = "none";
    }
};

// Game //

// jQuery to hide difficulty-text and gameBox cards when difficulty button clicked//
$('#gameBox').hide();
$('.difficulty-button').on('click',
  function() {
    $('.difficulty-text, #gameBox').toggle();
  }
);

// flip card on click functionality

let card = document.querySelectorAll(".card")

function cardFlip() {
    this.classList.toggle("flipped");
}

card.forEach(card => card.addEventListener("click", cardFlip))

// Audio //

let bgm = document.getElementById("bgm");
let isPlaying = false;
let musicButtonToggle = document.getElementById("music-button")
let musicButtonToggleGame = document.getElementById("music-button-game")

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
  musicButtonToggleGame.innerHTML = "Music: on";
};
bgm.onpause = function() {
  isPlaying = false;
  musicButtonToggle.innerHTML = "Music: off";
  musicButtonToggleGame.innerHTML = "Music: off"
};









