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
  const contentCell = getContentCell(elCell.classList[2])
  const classLists = elCell.classList[1].split('-')
  const pos = {
    i: +classLists[1],
    j: +classLists[2],
  }

  if (gBoard[pos.i][pos.j].isShow) {
    console.log('no no is cell occupd!')
    return //check if clicked cell
  }

  if (contentCell === MINE) {
    blewUpGame()
  } else if (contentCell === EMPTY) {
    // console.log('empty')
    openEmptyCell(pos.i, pos.j)
  }
  //   } else if (!isNaN(contentCell)) {
  //     console.log('number')
  //   }

  gBoard[pos.i][pos.j].isShow = true
  renderCell(pos.i, pos.j, contentCell)
}

function openEmptyCell(idxI, idxJ) {
  for (var i = idxI - 1; i <= idxI + 1; i++) {
    if (i < 0 || i >= gBoard.length) continue
    for (var j = idxJ - 1; j <= idxJ + 1; j++) {
      if (i === idxI && j === idxJ) continue
      if (j < 0 || j >= gBoard[i].length) continue
      if (gBoard[i][j].isShow) continue
      if (gBoard[i][j].type === 'neighbor') {
        gBoard[i][j].isShow = true
        const currContent = gBoard[i][j].countOfMinesNegs
        renderCell(i, j, currContent)
      }
      if (gBoard[i][j].type === 'empty') {
        gBoard[i][j].isShow = true
        renderCell(i, j, EMPTY)
        openEmptyCell(i, j)
      }
    }
  }
}

function getContentCell(val) {
  var content = ''
  if (val === 'mine') content = MINE
  else if (val === 'empty') content = EMPTY
  else {
    content = +val.split('-')[1]
  }
  return content
}

function blewUpGame() {
  console.log('GAME OVER')

  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      if (gBoard[i][j].isMine) {
        gBoard[i][j].isShow = true
        renderCell(i, j, MINE)
      }
    }
  }

  return
}

function onRightClicked(event) {
  console.log('event:', event)
  console.log('right clicked!')
}
