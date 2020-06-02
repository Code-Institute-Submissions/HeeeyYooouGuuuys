
function ready() {
    let cards = Array.from(document.getElementsByClassName("card"));
    let overlay = Array.from(document.getElementsByClassName("overlay"));
    let game = new cardSwap;
    let modal = document.getElementsByClassName('modal');
    let modalBtn = document.getElementsByClassName("modalOpen");
    let span = document.getElementsByClassName("close");
    // let isMuted = false;
    // let audioMute = document.getElementById("music-button-game");

    
    overlay.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.cardFlip(card);
        });
    });

    document.getElementById("reset-button").addEventListener("click", event => {
        game.stopTimer();
        game.resetGame();
});

// Open modals
modalBtn[0].onclick = function() {
    modal[0].style.display = "block";
}
modalBtn[1].onclick = function() {
    modal[1].style.display = "block";
}

// close modal on x
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



    audioMuteToggle() 
        let isMuted = false;
        let btn = document.getElementById('music-button-game');
        btn.addEventListener('click', event => {
  if (isMuted) {
    this.audioEvents.unMuteAllAudio();  
  } else {
    this.audioEvents.muteAllAudio();
  }
}, false);
    }



class cardSwap {
    constructor() {
        this.cards = Array.from(document.getElementsByClassName("card"));
        this.totalTime = (document.getElementsByClassName("totalTime")).item(0);
        this.totalMoves = (document.getElementsByClassName("totalMoves")).item(0);  
        this.endFlips = document.getElementById("end-flips"); 
        this.endTime = document.getElementById("end-time");
        this.isMuted = false;
        
        
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
   this.cards[i].classList.remove('flipped');
    }
}

        startTimer() {        
        setInterval(() => {
            this.timer ++;
            this.totalTime.innerHTML = "Time: " + this.timer;
        }, 1000);
    }
        stopTimer() {
            for (var i = 0; i < 99999; i++)
        window.clearInterval(i);
        }

    //     shuffleCards() {   
    //     for(let i = this.cards.length - 1; i > 0; i--) {
    //         let randomIndex = Math.floor(Math.random() * (i+1));
    //         this.cards[randomIndex].style.order = i;
    //         this.cards[i].style.order = randomIndex;
    //     }

    // }

        cardFlip(card) {
            if(this.canFlipCard(card)) {
            card.classList.add("flipped");
            this.audioEvents.cardFlipAudio();
            this.counter += 1;
            this.totalMoves.innerHTML = "Moves: " + this.counter;
            
            if(this.cardToCheck)
                this.checkForCardMatch(card);
            else
                this.cardToCheck = card;
            }
        }
        
    

    checkForCardMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else
            this.cardMismatch(card, this.cardToCheck);

            this.cardToCheck = null;
    }
    getCardType(card) {
        return card.getElementsByClassName("card-front")[0].src;
    }
    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        this.audioEvents.cardMatch();
        if(this.matchedCards.length === this.cards.length)
        this.gameOver();
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
            return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
        gameOver() {
            this.stopTimer();
            this.audioEvents.gameSuccess();
            document.getElementsByClassName("game-over-overlay")[0].classList.add("visible");
            this.endFlips.innerHTML = this.counter;
            this.endTime.innerHTML = this.timer;
        }
        resetGame() {
            this.counter = 0;
        this.totalMoves.innerHTML = "Moves: " + this.counter;
        this.matchedCards = [];
        this.timer = 0;
        this.totalTime.innerHTML = "Time: " + this.timer;
        this.audioEvents = new AudioEvents();
        // this.shuffleCards();
        this.busy = false;
        this.cardToCheck = null;
        this.resetCards();
        setTimeout(() => {
            this.startTimer();
        }, 200);
    }
    audioMuteToggle() {
        let isMuted = false;
        let btn = document.getElementById('music-button-game');
        btn.addEventListener('click', event => {
  if (isMuted) {
    this.audioEvents.unMuteAllAudio();  
  } else {
    this.audioEvents.muteAllAudio();
  }
}, false);
    }
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
        this.cardMatchAudio.play()
    }
    cardNomatch() {
        this.cardNoMatchAudio.play()
    }
    musicStart() {
        this.BGM.currentTime = 0;
        this.BGM.play()
    }
    // musicFade() {
    //     this.BGM.fadeOut = true;
    //     this.BGM.fadeOutDuration = 5;
    // }
    musicPause() {
        this.BGM.pause();
    }
    muteAllAudio() {
        this.isMuted = true;
        this.gameOverAudio.volume = 0;
        this.gameSuccessAudio.volume = 0;
        this.flipAudio.volume = 0;
        this.cardMatchAudio.volume = 0;
        this.cardNoMatchAudio.volume = 0;
        this.BGM.volume = 0;
    }
    unMuteAllAudio() {
        this.isMuted = false;
        this.gameOverAudio.volume = 1;
        this.gameSuccessAudio.volume = 1;
        this.flipAudio.volume = 1;
        this.cardMatchAudio.volume = 1;
        this.cardNoMatchAudio.volume = 1;
        this.BGM.volume = 1;
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
