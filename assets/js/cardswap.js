function ready() {
  let cards = Array.from(document.getElementsByClassName("card"));
  let overlay = Array.from(document.getElementsByClassName("overlay"));
  let game = new cardSwap();
  let modal = document.getElementsByClassName("modal");
  let modalBtn = document.getElementsByClassName("modalOpen");
  let span = document.getElementsByClassName("close");
  let reset = document.getElementById("reset-button");
  //   let mute = document.getElementById("music-button-game");
  //   let isMuted = true;
  let muteButton = document.getElementById("music-button-game");
  let isMuted = true;

  overlay.forEach((overlay) => {
    overlay.addEventListener("click", () => {
      overlay.classList.remove("visible");
      game.startGame();
    });
  });
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      game.cardFlip(card);
    });
  });
  window.onload = function () {
    if ((reset, muteButton)) {
      reset.addEventListener("click", () => {
        game.stopTimer();
        game.resetGame();
      });
      muteButton.addEventListener("click", function () {
        if (isMuted) {
          game.muteAllAudio();
          muteButton.innerHTML = "Audio: OFF";
        } else {
          game.unMuteAllAudio();
          muteButton.innerHTML = "Audio: ON";
        }
        isMuted = !isMuted;
      });
    }
    //     mute.addEventListener("click", () => {
    //    if (game.isMuted === true) {
    //       game.isMuted = false;
    //       game.unMuteAllAudio();
    //       console.log(this);
    //     }
    //     else if (game.isMuted === false) {
    //       game.isMuted = true;
    //       game.muteAllAudio();
    //     }

    //   })
  };

  // Open modals
  modalBtn[0].onclick = function () {
    modal[0].style.display = "block";
  };
  modalBtn[1].onclick = function () {
    modal[1].style.display = "block";
  };

  // close modal on x
  span[0].onclick = function () {
    modal[0].style.display = "none";
  };
  span[1].onclick = function () {
    modal[1].style.display = "none";
  };
  // click outside modal close
  window.onclick = function (event) {
    if (event.target == modal[0]) {
      modal[0].style.display = "none";
    }
    if (event.target == modal[1]) {
      modal[1].style.display = "none";
    }
  };

  //     audioMuteToggle()
  //         // let isMuted = false;
  //         let btn = document.getElementById('music-button-game');
  //         btn.addEventListener('click', event => {
  //   if (isMuted) {
  //     this.audioEvents.unMuteAllAudio();
  //   } else {
  //     this.audioEvents.muteAllAudio();
  //   }
  // }, false);
}

class cardSwap {
  constructor() {
    this.cards = Array.from(document.getElementsByClassName("card"));
    this.totalTime = document.getElementsByClassName("totalTime").item(0);
    this.totalMoves = document.getElementsByClassName("totalMoves").item(0);
    this.endFlips = document.getElementById("end-flips");
    this.endTime = document.getElementById("end-time");
    this.stars = Array.from(document.getElementsByClassName("star-span"));
    this.starRatingText = document.getElementById("star-rating-text");
    this.audioToggle = document.getElementById("music-button-game");
  }
  startGame() {
    this.counter = 0;
    this.totalMoves.innerHTML = "Moves: " + this.counter;
    this.matchedCards = [];
    this.timer = 0;
    this.totalTime.innerHTML = "Time: " + this.timer;
    this.audioEvents = new AudioEvents();
    this.audioEvents.musicStart();
    // this.shuffleCards();
    this.busy = false;
    this.cardToCheck = null;
    this.resetCards();
    setTimeout(() => {
      this.startTimer();
    }, 200);
  }

  resetCards() {
    for (var i = 0; i < this.cards.length; i++) {
      this.cards[i].classList.remove("flipped");
    }
  }

  startTimer() {
    setInterval(() => {
      this.timer++;
      this.totalTime.innerHTML = "Time: " + this.timer;
    }, 1000);
  }

  stopTimer() {
    for (var i = 0; i < 99999; i++) window.clearInterval(i);
  }

  //     shuffleCards() {
  //     for(let i = this.cards.length - 1; i > 0; i--) {
  //         let randomIndex = Math.floor(Math.random() * (i+1));
  //         this.cards[randomIndex].style.order = i;
  //         this.cards[i].style.order = randomIndex;
  //     }

  // }

  cardFlip(card) {
    if (this.canFlipCard(card)) {
      card.classList.add("flipped");
      this.audioEvents.cardFlipAudio();
      this.counter += 1;
      this.totalMoves.innerHTML = "Moves: " + this.counter;

      if (this.cardToCheck) this.checkForCardMatch(card);
      else this.cardToCheck = card;
    }
  }

  checkForCardMatch(card) {
    if (this.getCardType(card) === this.getCardType(this.cardToCheck))
      this.cardMatch(card, this.cardToCheck);
    else this.cardMismatch(card, this.cardToCheck);

    this.cardToCheck = null;
  }
  getCardType(card) {
    return card.getElementsByClassName("card-front")[0].src;
  }
  cardMatch(card1, card2) {
    this.matchedCards.push(card1);
    this.matchedCards.push(card2);
    this.audioEvents.cardMatch();
    if (this.matchedCards.length === this.cards.length) this.gameOver();
  }
  cardMismatch(card1, card2) {
    this.busy = true;
    this.audioEvents.cardNomatch();
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      this.busy = false;
    }, 1000);
  }
  canFlipCard(card) {
    return (
      !this.busy &&
      !this.matchedCards.includes(card) &&
      card !== this.cardToCheck
    );
  }
  gameOver() {
    this.stopTimer();
    this.audioEvents.gameSuccess();
    document
      .getElementsByClassName("game-over-overlay")[0]
      .classList.add("visible");
    this.endFlips.innerHTML = this.counter;
    this.endTime.innerHTML = this.timer;
    setTimeout(() => {
      this.starRating();
    }, 10000);
  }
  resetGame() {
    this.counter = 0;
    this.totalMoves.innerHTML = "Moves: " + this.counter;
    this.matchedCards = [];
    this.timer = 0;
    this.totalTime.innerHTML = "Time: " + this.timer;
    // this.audioEvents = new AudioEvents();
    // this.shuffleCards();
    this.busy = false;
    this.cardToCheck = null;
    this.resetCards();
    setTimeout(() => {
      this.startTimer();
    }, 200);
  }

  starRating() {
    if (this.counter > 22 && this.counter < 30) {
      this.stars[2].classList.add("d-none");
      this.starRatingText.innerHTML = "this is the two star text";
    } else if (this.counter > 30) {
      this.stars[1].classList.add("d-none");
      this.stars[2].classList.add("d-none");
      this.starRatingText.innerHTML = "this is the one star text";
    }
  }
  muteAllAudio() {
    // this.isMuted = true;
    this.audioEvents.gameOverAudio.volume = 0;
    this.audioEvents.gameSuccessAudio.volume = 0;
    this.audioEvents.flipAudio.volume = 0;
    this.audioEvents.cardMatchAudio.volume = 0;
    this.audioEvents.cardNoMatchAudio.volume = 0;
    this.audioEvents.BGM.volume = 0;
    // this.audioToggle.innerHTML = "Audio: off";
  }
  unMuteAllAudio() {
    // this.isMuted = false;
    this.audioEvents.gameOverAudio.volume = 1;
    this.audioEvents.gameSuccessAudio.volume = 1;
    this.audioEvents.flipAudio.volume = 1;
    this.audioEvents.cardMatchAudio.volume = 1;
    this.audioEvents.cardNoMatchAudio.volume = 1;
    this.audioEvents.BGM.volume = 1;
    // this.audioToggle.innerHTML = "Audio: on";
  }
}

//     audioMuteToggle() {
//         let isMuted = false;

//         btn.addEventListener('click', event => {
//   if (isMuted) {
//     this.audioEvents.unMuteAllAudio();
//   } else {
//     this.audioEvents.muteAllAudio();
//   }
// }, false);
// }

class AudioEvents {
  constructor() {
    this.gameOverAudio = new Audio("assets/audio/fail.wav");
    this.gameSuccessAudio = new Audio("assets/audio/success.wav");
    this.flipAudio = new Audio("assets/audio/card-flip.wav");
    this.cardMatchAudio = new Audio("assets/audio/coin.wav");
    this.cardNoMatchAudio = new Audio("assets/audio/incorrect.wav");
    this.BGM = new Audio("assets/audio/Chiptronical.mp3");
    this.BGM.volume = 0.05;
    this.BGM.loop = true;
  }
  gameOver() {
    this.musicPause();
    this.gameOverAudio.play();
  }
  gameSuccess() {
    this.musicPause();
    this.BGM.currentTime = 0;
    this.gameSuccessAudio.play();
  }
  cardFlipAudio() {
    this.flipAudio.play();
  }
  cardMatch() {
    this.cardMatchAudio.play();
  }
  cardNomatch() {
    this.cardNoMatchAudio.play();
  }
  musicStart() {
    this.BGM.currentTime = 0;
    this.BGM.play();
  }
  musicPause() {
    this.BGM.pause();
  }
  //   muteAllAudio() {
  //     this.isMuted = true;
  //     this.gameOverAudio.volume = 0;
  //     this.gameSuccessAudio.pause();
  //     this.flipAudio.volume = 0;
  //     this.cardMatchAudio.pause();
  //     this.cardNoMatchAudio.volume = 0;
  //     this.BGM.pause();
  //   }
  //   unMuteAllAudio() {
  //     this.isMuted = false;
  //     this.gameOverAudio.volume = 1;
  //     this.gameSuccessAudio.volume = 1;
  //     this.flipAudio.volume = 1;
  //     this.cardMatchAudio.volume = 1;
  //     this.cardNoMatchAudio.volume = 1;
  //     this.BGM.volume = 1;
  //   }
}

// checks for load state of DOM //

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
  console.log("ready");
}

//BGM//

/*let bgm = document.getElementById("bgm");
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
// flip card on click functionality
// let card = document.querySelectorAll(".card")
/* function cardFlip() {
    this.classList.toggle("flipped");
    
} */

// card.forEach(card => card.addEventListener("click", cardFlip))

// Audio /

// if(!card.hasFlippedCard) {
//     card.hasFlippedCard = true;
//     firstCard = event.currentTarget;
// } else {
//     card.hasFlippedCard = false;
//     secondCard = event.currentTarget;

//     console.log({firstCard, secondCard});
//     console.log(firstCard.dataset.framework);

//     if (firstCard.dataset.framework === secondCard.dataset.framework) {
//         firstCard.removeEventListener("click");
//         secondCard.removeEventListener("click");
//     } else {
//         setTimeout(() => {
//         firstCard.classList.remove("flipped");
//         secondCard.classList.remove("flipped");
//     }, 1500);
// }
// }