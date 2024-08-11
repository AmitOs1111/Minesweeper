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
  renderBoard(gBoard)
}

function createBoard() {
  var board = []

  for (var i = 0; i < gGame.boardSize.rows; i++) {
    board[i] = []
    for (var j = 0; j < gGame.boardSize.cols; j++) {
      board[i][j] = {
        isMine: false,
        isShow: true,
        countOfMinesNegs: 0,
      }
    }
  }

  setMinesInBoard(board)
  setMinesCountCell(board)

  return board
}

function renderBoard(board) {
  var strHTML = ''

  for (var i = 0; i < board.length; i++) {
    strHTML += `<tr>`

    for (var j = 0; j < board[i].length; j++) {
      const currCell = board[i][j]
      const countNegs = currCell.countOfMinesNegs

      strHTML += `<td cell cell-${i}-${j} neighbors${countNegs}></td>`
    }
    strHTML += `</tr>`
  }

  //   const elTbody = document.querySelector('tbody').innerHTML = strHTML
}

// next level to change insert random mines
function setMinesInBoard(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if ((i === 1 && j == 1) || (i === 3 && j == 2)) board[i][j].isMine = true
    }
  }
  return
}
// init value of all cell on board
function setMinesCountCell(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      const currCell = board[i][j]
      const value = countMinesNegs(i, j, board)

      currCell.countOfMinesNegs = value
    }
  }
  return
}
// neighbors Loop
function countMinesNegs(idxI, idxJ, board) {
  var counter = 0

  for (var i = idxI - 1; i < idxI + 1; i++) {
    if (i < 0 || i >= board.length) continue
    for (var j = idxJ - 1; j < idxJ + 1; j++) {
      if (j < 0 || j >= board[idxI].length) continue
      if (i === idxI && j === idxJ) continue

      if (board[i][j].isMine) counter++
    }
  }

  console.log(' counter:', counter)
  return counter
}
