function ready() {
  let cards = Array.from(document.getElementsByClassName("card"));
  let gameStartOverlay = document.getElementById("game-start-overlay");
  let gameOverOverlay = document.getElementById("game-over-overlay");
  let game = new CardSwap();
  let audio = new AudioEvents();
  let modal = document.getElementsByClassName("modal");
  let modalBtn = document.getElementsByClassName("modalOpen");
  let span = document.getElementsByClassName("close");
  let reset = document.getElementById("reset-button");
  let muteButton = document.getElementById("music-button-game");
  let isMuted = true;

// click eventlistener added to all cards //
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      game.cardFlip(card);
    });
  });
// click eventlistener added to overlays and game buttons after page is loaded //
  window.onload = function () {
    if ((reset, muteButton)) {
      reset.addEventListener("click", () => {
        game.stopTimer();
        game.resetGame();
      });
      if (gameStartOverlay) {
        gameStartOverlay.addEventListener("click", function () {
          gameStartOverlay.classList.remove("visible");
          game.startGame();
        });
        if (gameOverOverlay) {
          gameOverOverlay.addEventListener("click", function () {
            gameOverOverlay.classList.remove("visible");
            game.resetGame();
          });
        }
      }
      muteButton.addEventListener("click", function () {
        if (isMuted) {
          game.muteAllAudio();
          audio.musicPause();
          muteButton.innerHTML = "AUDIO: OFF";
        } else {
          game.unMuteAllAudio();
          muteButton.innerHTML = "AUDIO: ON";
        }
        isMuted = !isMuted;
      });
    }
  };

  // Open modals on click
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
    if (event.target === modal[0]) {
      modal[0].style.display = "none";
    }
    if (event.target === modal[1]) {
      modal[1].style.display = "none";
    }
  };
}

class CardSwap {
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
    this.counter = 0; // move counter
    this.totalMoves.innerHTML = "MOVES: " + this.counter;
    this.matchedCards = []; // empty array for matched crds to be added to
    this.timer = 0;
    this.totalTime.innerHTML = "TIME: " + this.timer;
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
      this.totalTime.innerHTML = "TIME: " + this.timer;
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
      this.totalMoves.innerHTML = "MOVES: " + this.counter;
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
  cardMatch(firstCard, secondCard) {
    this.matchedCards.push(firstCard);
    this.matchedCards.push(secondCard);
    this.audioEvents.cardMatch();
    if (this.matchedCards.length === this.cards.length) this.gameOver();
  }
  cardMismatch(firstCard, secondCard) {
    this.busy = true;
    this.audioEvents.cardNomatch();
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
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
      this.starRating();

  }
  //refreshes page fully on reset or game over overlay click
  resetGame() {
    window.location.reload();
  }

  starRating() {
    if (this.counter > 22 && this.counter < 30) {
      this.stars[2].classList.add("d-none");
      this.starRatingText.innerHTML = "GNARLY, BUT YOU CAN DO EET!";
    } else if (this.counter > 30) {
      this.stars[1].classList.add("d-none");
      this.stars[2].classList.add("d-none");
      this.starRatingText.innerHTML = "WHAT A DRAG! YOU'LL BE BACK?";
    }
  }
  muteAllAudio() {
    this.audioEvents.gameSuccessAudio.volume = 0;
    this.audioEvents.flipAudio.volume = 0;
    this.audioEvents.cardMatchAudio.volume = 0;
    this.audioEvents.cardNoMatchAudio.volume = 0;
    this.audioEvents.BGM.volume = 0;
  }
  unMuteAllAudio() {
    this.audioEvents.gameSuccessAudio.volume = 0.15;
    this.audioEvents.flipAudio.volume = 1;
    this.audioEvents.cardMatchAudio.volume = 1;
    this.audioEvents.cardNoMatchAudio.volume = 1;
    this.audioEvents.BGM.volume = 0.15;
  }
}

class AudioEvents {
  constructor() {
    this.gameSuccessAudio = new Audio("assets/audio/success.wav");
    this.flipAudio = new Audio("assets/audio/card-flip.wav");
    this.cardMatchAudio = new Audio("assets/audio/coin.wav");
    this.cardNoMatchAudio = new Audio("assets/audio/incorrect.wav");
    this.BGM = new Audio("assets/audio/Chiptronical.mp3");
    this.BGM.volume = 0.15;
    this.BGM.loop = true;
    this.gameSuccessAudio.volume = 0.15;
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
    this.BGM.play();
  }
  musicPause() {
    this.BGM.pause();
  }
}

// checks for load state of DOM and loads ready function if complete//

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
  console.log("ready");
}

