'use strict';

// For selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0'); // use the # to select the id. Use the .to select the class name
const score1El = document.getElementById('score--1'); // this works the exact same way as querySelector but can be a little faster but only if selecting thousands of elemenets at once

const current0El = document.querySelector('#current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice'); // selects the dice element.

const btnNew = document.querySelector('.btn--new'); // selecting all the button classes

const btnRoll = document.querySelector('.btn--roll');

const btnHold = document.querySelector('.btn--hold');


let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // 2. display dice
    diceEl.classList.remove('hidden'); // removes the hidden image
    diceEl.src = `dice-${dice}.png`; // now displays the dice png images

    // 3. check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // add dice to current score
      currentScore = currentScore + dice; // currentScore is 0 and than added to the dice roll
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch players
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
  // if so finish game if not switch to the next player
  // Switch Player
});

btnNew.addEventListener('click', init);
