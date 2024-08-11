'use strict'

function renderScore() {
  const elScore = document.querySelector('.score-game')
  elScore.innerText = gGame.score
}

function addScore(num) {
  gGame.score += num
}
