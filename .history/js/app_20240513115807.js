'use strict'

const MINE = '💣'
const FLAG = '🚩'
const EMPTY = ''

var gBoard
var gGame

function onInit() {
  console.log('onInit')
  gGame = {
    isOn: false,
    countOfMines: 2,
    countOfFlag: 0,
    level: 4,
    boardSize: { rows: 4, cols: 4 },
  }
  gBoard = createBoard()
  renderBoard()
}

function createBoard() {
  var board = []

  for (var i = 0; i < gGame.boardSize.rows; i++) {
    board[i] = []
    for (var j = 0; j < gGame.boardSize.cols; j++) {
      board[i][j] = {
        isMine: false,
        isShow: true,
        minesNegsCount: 0,
      }
    }
  }

  setMinesInBoard(board)
  setMinesCountCell(board)

  return board
}

function renderBoard() {}

// next level to change insert random mines
function setMinesInBoard(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if ((i === 1 && j == 1) || (i === 3 && j == 2)) board[i][j].isMine = true
    }
  }
  return
}

function setMinesCountCell(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      const currCell = board[i][j]
      const value = countMinesNegs(i, j, board)
    }
  }
}

// neighbors Loop
function countMinesNegs(idxI, idxJ, board) {
  for (i = idxI - 1; i < idxI + 1; i++) {
    if (i < 0 || i >= board.length) continue
    for (var j = idxJ - 1; j < idxJ + 1; j++) {
      if (j < 0 || j >= board[idxI].length) continue
      if (i === idxI && j == idxJ) continue

      if (board[i][j].isMine) board[idxI][idxJ].countOfMines++
    }
  }

  return
}
