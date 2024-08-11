'use strict'

const MINE = '💣'
const FLAG = '🚩'
const EMPTY = ''

//image
const MINEIMG = 'style/img/mine.png'
const FLAGIMG = 'style/img/flag.png'
var gBoard
var gUndo = []
var gGame = {
  isOn: false,
  countOfMines: 2,
  countOfFlag: 0,
  level: 4,
  boardSize: { rows: 4, cols: 4 },
  score: 0,
}
var gStartTime
var gIntervalId

function onInit() {
  gBoard = createBoard()
  renderBoard(gBoard)
  renderLevelBtn()
  //   if (gIntervalId) clearInterval(gIntervalId)
  resetStopwatch()
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
      strHTML += `<td onclick="onSelectedCell(this)" class="cell cell-${i}-${j} ${className} border-game">${value}</td>`
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
  if (value === FLAG) {
    value = `<img src=${FLAGIMG} alt="${FLAG}"></img>`
    const className = getClassName(gBoard[i][j])
    elCell.innerHTML = `<td onclick="onSelectedCell(this)" class="cell cell-${i}-${j} ${className} border-game">
    ${value}
    </td>`
  }
  if (value === MINE) {
    value = `<img src=${MINEIMG} alt="${MINE}"></img>`
    const className = getClassName(gBoard[i][j])
    elCell.innerHTML = `<td onclick="onSelectedCell(this)" class="cell cell-${i}-${j} ${className} border-game">
    ${value}
    </td>`
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
  const elModal = document.querySelector('.modal-victory')
  elModal.classList.remove('hide')

  const elTime = document.querySelector('.timer-game').innerText
  elModal.querySelector('h3 span').innerText = elTime

  elModal.querySelector('h2 span').innerText = gGame.score
}

function openModalBlewUp() {
  const elModal = document.querySelector('.modal-blew-up')
  elModal.classList.remove('hide')
}

function onRestart() {
  document.querySelector('.modal-blew-up').classList.add('hide')
  document.querySelector('.modal-victory').classList.add('hide')

  document.querySelector('.timer-game').innerText = '000'
  document.querySelector('.score-game').innerText = '000'

  gGame.isOn = false
  //   gStartTime = ''
  resetStopwatch()
  onInit()
}
