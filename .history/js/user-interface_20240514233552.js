'use strict'

function onLevelGame(elBtn) {
  //   console.log('elBtn', elBtn.innerText)

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
}
