'use strict'

function renderScore() {
  const elScore = document.querySelector('.score-game')
  elScore.innerText = gGame.score.toFixed(2)
}

function addScore(num) {
  gGame.score += num
}
