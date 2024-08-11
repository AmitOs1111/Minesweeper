'use strict'

function renderScore() {
  const elScore = document.querySelector('.score-game')
  elScore.innerText = gGame.score.toFixed(3)
}

function addScore(num) {
  gGame.score += num
}
