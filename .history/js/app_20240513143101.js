'use strict'

const MINE = '💣'
const FLAG = '🚩'
const EMPTY = ''

var gBoard
var gGame

function onInit() {
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
  setValueCell(board)

  return board
}

function renderBoard(board) {
  var strHTML = ''

  for (var i = 0; i < board.length; i++) {
    strHTML += `<tr>`

    for (var j = 0; j < board[i].length; j++) {
      const currCell = board[i][j]
      const className = getClassName(currCell)
      const value = getValueCell(i, j, board)
      strHTML += `<td class="cell cell-${i}-${j} ${className}">${value}</td>`
    }
    strHTML += `</tr>`
  }

  const elTbody = (document.querySelector('tbody').innerHTML = strHTML)
}

function getClassName(cell) {
  if (cell.isMine) return 'mine'
  return cell.countOfMinesNegs ? 'neighbors' + cell.countOfMinesNegs : 'empty'
}

function getValueCell(idxI, idxJ, board) {
  const currCell = board[idxI][idxJ]

  if (currCell.isMine) return MINE

  return currCell.countOfMinesNegs ? currCell.countOfMinesNegs : EMPTY
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
function setValueCell(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      const currCell = board[i][j]
      const value = getCountMinesNegs(i, j, board)
      //   console.log('currCell+value:', currCell, value)
      currCell.countOfMinesNegs = value
    }
  }
  return
}
// neighbors Loop
function getCountMinesNegs(idxI, idxJ, board) {
  var counter = 0
  console.log('idxI:', idxI, 'idxJ:', idxJ)
  for (var i = idxI - 1; i <= idxI + 1; i++) {
    console.log('i:', i, 'j:', j)
    if (i < 0 || i > board.length) {
      console.log('skip1')
      continue
    }
    for (var j = idxJ - 1; j <= idxJ + 1; j++) {
      if (j < 0 || j >= board[idxI].length) {
        console.log('skip2')
        continue
      }
      if (i === idxI && j === idxJ) {
        console.log('skip3')
        continue
      }

      if (board[i][j].isMine) {
        counter++
        console.log('counter:', counter)
      }
    }
  }

  //   console.log(' counter:', counter)
  return counter
}
