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
    score: 0,
  }
  gBoard = createBoard()
  renderBoard(gBoard)
  renderLevelBtn()
}

function createBoard() {
  var board = []

  for (var i = 0; i < gGame.boardSize.rows; i++) {
    board[i] = []
    for (var j = 0; j < gGame.boardSize.cols; j++) {
      board[i][j] = {
        isMine: false,
        type: 'empty',
        isShow: false,
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
      const contentCell = getValueCell(i, j, board)
      const value = currCell.isShow ? contentCell : ''
      strHTML += `<td onclick="onSelectedCell(this)" class="cell cell-${i}-${j} ${className}">${value}</td>`
    }
    strHTML += `</tr>`
  }

  const elTbody = (document.querySelector('tbody').innerHTML = strHTML)
}

function renderCell(i, j, value) {
  const elCell = document.querySelector(`.cell-${i}-${j}`)
  elCell.innerText = value

  if (value === EMPTY) {
    elCell.classList.add('empty-open')
  }
}

function getClassName(cell) {
  if (cell.isMine) return 'mine'
  return cell.countOfMinesNegs
    ? `neighbor-${cell.countOfMinesNegs} neighbors${cell.countOfMinesNegs}`
    : 'empty'
}

function getValueCell(idxI, idxJ, board) {
  const currCell = board[idxI][idxJ]

  if (currCell.isMine) return MINE

  return currCell.countOfMinesNegs ? currCell.countOfMinesNegs : EMPTY
}

function setMinesInBoard(board) {
  const randomNums = []
  var counter = 0
  const rows = board.length
  const cols = board[0].length

  while (randomNums.length < gGame.countOfMines) {
    const num = getRandomInt(0, rows * cols)

    if (randomNums.includes(num)) continue
    else {
      randomNums.push(num)
    }
  }

  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (randomNums.includes(counter)) {
        board[i][j].isMine = true //-------- remove
        board[i][j].type = 'mine'
      }
      counter++
    }
  }
  return
}
// init value of all cell on board
function setValueCell(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      const currCell = board[i][j]
      const value = getCountMinesNeg(i, j, board)
      currCell.countOfMinesNegs = value
      if (currCell.countOfMinesNegs) currCell.type = 'neighbor'
    }
  }
  return
}
// neighbors Loop
function getCountMinesNeg(idxI, idxJ, board) {
  var counter = 0
  for (var i = idxI - 1; i <= idxI + 1; i++) {
    if (i < 0 || i >= board.length) {
      continue
    }
    for (var j = idxJ - 1; j <= idxJ + 1; j++) {
      if (j < 0 || j >= board[idxI].length) {
        continue
      }
      if (i === idxI && j === idxJ) {
        continue
      }

      if (board[i][j].isMine) {
        counter++
      }
    }
  }

  return counter
}

function checkVictory() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      const currCell = gBoard[i][j]
      if (!currCell.isShow) return false
    }
  }
  return true
}

function openModalVictory() {
  console.log('open modal victory')
  const elModal = document.querySelector('.modal-victory')
  elModal.classList.remove('hide')
}
function openBlewUp() {
  console.log('open modal blew up')
  const elModal = document.querySelector('.modal-blew-up')
  elModal.classList.remove('hide')
}

function onRestart() {
  document.querySelector('.modal-blew-up').classList.add('hide')
  document.querySelector('.modal-victory').classList.add('hide')
}
