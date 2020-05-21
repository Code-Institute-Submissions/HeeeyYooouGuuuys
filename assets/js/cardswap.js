"use strict";

let hasFlippedCard = false;
let firstCard, secondCard;

function ready() {
    let cards = Array.from(document.getElementsByClassName("card"));
    let overlay = Array.from(document.getElementsByClassName("overlay"));
    let game = new cardSwap;  
    
    overlay.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.cardFlip(card);
            // game.hasFlippedCard(card);
        });
    });
};


class cardSwap {
    constructor(totalTime, cards) {
        this.cards = Array.from(document.getElementsByClassName("card"));
        this.totalTime = (document.getElementsByClassName("totalTime")).item(0);
        this.totalMoves = (document.getElementsByClassName("totalMoves")).item(0);   
        // this.hasFlippedCard = false;
    }
    startGame() {
        // this.hasFlippedCard = false;
        this.counter = 0;
        this.matchedCards = [];
        this.timer = 0;
        this.audioEvents = new AudioEvents();
        this.audioEvents.musicStart();
        // this.shuffleCards();
        this.startTimer();

    }
        startTimer() {
        return setInterval(() => {
            this.timer += 1;
            this.totalTime.innerHTML = "Time: " + this.timer;
        }, 1000);
    }

    //     // shuffleCards() {   
    //     // for(let i = this.cards.length - 1; i > 0; i--) {
    //     //     let randIndex = Math.floor(Math.random() * 16);
    //     //     this.cards[randIndex].style.order = i;
    //     //     this.cards[i].style.order = randIndex;
    //     // }

    // }

        cardFlip(card) {
        card.classList.add("flipped");
        this.audioEvents.cardFlipAudio();
        this.counter += 1;
        this.totalMoves.innerHTML = "Moves: " + this.counter;
        
        if(!card.hasFlippedCard) {
            card.hasFlippedCard = true;
            firstCard = event.currentTarget;
        } else {
            card.hasFlippedCard = false;
            secondCard = event.currentTarget;

            console.log({firstCard, secondCard});
            console.log(firstCard.dataset.framework);

            if (firstCard.dataset.framework === secondCard.dataset.framework) {
                firstCard.removeEventListener("click");
                secondCard.removeEventListener("click");
            } else {
                setTimeout(() => {
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");
            }, 1500);
        }
        }
        
        
    }
        // this.cardMatch();

}

class AudioEvents {
    constructor() {
        this.gameOverAudio = new Audio("assets/audio/fail.wav");
        this.gameSuccessAudio = new Audio("assets/audio/success.wav");
        this.flipAudio = new Audio("assets/audio/card-flip.wav");
        this.cardMatchAudio = new Audio("assets/audio/coin.wav");
        this.cardNoMatchAudio = new Audio("assets/audio/incorrect.wav")
        this.BGM = new Audio("assets/audio/Chiptronical.ogg")
        this.BGM.volume  = 0.05;
        this.BGM.loop = true;
    }
    gameOver() {
        this.musicFade();
        this.gameOverAudio.play();
    }
    gameSuccess() {
        this.musicFade();
        this.gameSuccessAudio.play();
    }     
    cardFlipAudio() {
        this.flipAudio.play();
    }
    cardMatch() {
        this.cardMatchAudio.play()
    }
    cardNomatch() {
        this.cardNoMatchAudio.play()
    }
    musicStart() {
        this.BGM.play()
    }
    musicFade() {
        this.BGM.fadeOut = true;
        this.BGM.fadeOutDuration = 5;
    }
    musicPause() {
        this.BGM.pause();
    }
}

// checks for load state of DOM //

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
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

// Modals

let modal = document.getElementsByClassName('modal');
let btn = document.getElementsByClassName("modalOpen");
let span = document.getElementsByClassName("close");

// Open modal 
btn[0].onclick = function() {
    modal[0].style.display = "block";
}

btn[1].onclick = function() {
    modal[1].style.display = "block";
}
// close on x
span[0].onclick = function() {
    modal[0].style.display = "none";
}

span[1].onclick = function() {
    modal[1].style.display = "none";
}
// click outside modal close
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
/*$('#gameBox').hide();
$('#start-button').on('click',
  function() {
    $('.difficulty-text, #gameBox').toggle();
  }
);*/

// flip card on click functionality

// let card = document.querySelectorAll(".card")

/* function cardFlip() {
    this.classList.toggle("flipped");
    
} */

// card.forEach(card => card.addEventListener("click", cardFlip))

// Audio /
