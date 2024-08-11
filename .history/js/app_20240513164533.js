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
// function setMinesInBoard(board) {
//   const mines = getRandomMines(board.length, board[0].length)

//   console.log('mines:', mines)

//   for (var i = 0; i < mines.length; i++) {
//     const currPosI = mines[i].posI
//     const currPosJ = mines[i].posJ

//     board[currPosI][currPosJ].isMine = true
//     // mines.shift()
//   }

//   return
// }

function setMinesInBoard(board) {
  const randomNums = []
  var counter = 0
  const rows = board.length
  const colss = board[0].length

  while (randomNums.length < gGame.countOfMines) {
    const num = getRandomInt(0, rows * cols)

    if (randomNums.includes(num)) continue
    else {
      randomNums.push(num)
    }
  }

  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (randomNums.includes(counter)) {
        gBoard[i][j].isMine = true
      }
      counter++
    }
  }
}
// init value of all cell on board
function setValueCell(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      const currCell = board[i][j]
      const value = getCountMinesNeg(i, j, board)
      currCell.countOfMinesNegs = value
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
