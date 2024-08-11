'use strict'

function onLevelGame(elBtn) {
  switch (elBtn.innerText) {
    case 'Beginner':
      gGame.countOfMines = 2
      gGame.boardSize = { rows: 4, cols: 4 }
      gGame.level = 1
      break
    case 'Medium':
      gGame.countOfMines = 14
      gGame.boardSize = { rows: 8, cols: 12 }
      gGame.level = 2
      break
    case 'Expert':
      gGame.countOfMines = 25
      gGame.boardSize = { rows: 12, cols: 16 }
      gGame.level = 3
      break
  }

  gBoard = createBoard()
  renderBoard(gBoard)
  renderLevelBtn()
}

function renderLevelBtn() {
  var strHTML = `
    <button class="${
      gGame.level === 1 ? 'borderLevel' : ''
    }" onclick="onLevelGame(this)">Beginner</button>
    <button class="${
      gGame.level === 2 ? 'borderLevel' : ''
    }" onclick="onLevelGame(this)">Medium</button>
    <button class="${
      gGame.level === 3 ? 'borderLevel' : ''
    }" onclick="onLevelGame(this)">Expert</button>
    `

  const elBtn = document.querySelector('.down-header')
  elBtn.innerHTML = strHTML
}

function onSelectedCell(elCell) {
  const contentCell = elCell.innerText
  console.log('elCell:', elCell.classList[1])
  if (contentCell === MINE) {
    console.log('mine')
  } else if (contentCell === EMPTY) {
    console.log('empty')
  } else if (!isNaN(contentCell)) console.log('number')
}
