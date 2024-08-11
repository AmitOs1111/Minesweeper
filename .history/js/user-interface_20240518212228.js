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

  //   onInit()
  onRestart()
}

function renderLevelBtn() {
  var strHTML = `
    <button class="${
      gGame.level === 1 ? 'borderLevel' : ''
    } border-game" onclick="onLevelGame(this)">Beginner</button>
    <button class="${
      gGame.level === 2 ? 'borderLevel' : ''
    } border-game" onclick="onLevelGame(this)">Medium</button>
    <button class="${
      gGame.level === 3 ? 'borderLevel' : ''
    } border-game" onclick="onLevelGame(this)">Expert</button>
    `

  const elBtn = document.querySelector('.down-header')
  elBtn.innerHTML = strHTML
}

function onSelectedCell(elCell) {
  if (!gGame.isOn) {
    // gIntervalId = setInterval(startTimer, 1000)
    gGame.isOn = true
    startStopwatch()
  }
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
    return
  } else if (contentCell === EMPTY) {
    openEmptyCell(pos.i, pos.j)
  }

  gBoard[pos.i][pos.j].isShow = true
  addScore(gBoard[pos.i][pos.j].countOfMinesNegs)
  renderCell(pos.i, pos.j, contentCell)
  renderScore()
  if (checkVictory()) {
    // stopTimer()
    stopStopwatch()
    openModalVictory()
  }
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
        addScore(currContent)
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
  stopStopwatch()
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      if (gBoard[i][j].isMine) {
        gBoard[i][j].isShow = true
        renderCell(i, j, MINE)
      }
    }
  }
  openModalBlewUp()
  return
}

function isImage(i) {
  return i instanceof HTMLImageElement
}

function onRightClicked(event) {
  event.preventDefault()
  console.log('event:', event)

  var pos
  var innerText
  if (isImage(event.target)) {
    console.log('yesss is image')
    // console.log(
    //   'event.target.offsetParent.classList[1].split(' - ')[1]:',
    //   event.target.offsetParent.classList[1].split('-')[1]
    // )
    pos = {
      i: +event.target.offsetParent.classList[1].split('-')[1],
      j: +event.target.offsetParent.classList[1].split('-')[2],
    }
    innerText = FLAG
  } else {
    pos = {
      i: +event.target.classList[1].split('-')[1],
      j: +event.target.classList[1].split('-')[2],
    }
    innerText = EMPTY
  }
  //   console.log(
  //     'event.target.split(' - ')[1]:',
  //     event.target.classList[1].split('-')[1]
  //   )
  //   console.log(event.target.classList[1])
  console.log(' pos:', pos)
  const currCell = gBoard[pos.i][pos.j]
  console.log('currCell:', currCell)
  console.log('innerText:', innerText)
  if (
    (currCell.isShow && innerText === FLAG) ||
    innerText === ` <img src=${FLAGIMG} alt="${FLAG}">`
  ) {
    currCell.isShow = false
    // event.target.innerText = EMPTY
    renderCell(pos.i, pos.j, EMPTY)
  } else if (!currCell.isShow && event.target.innerText === EMPTY) {
    currCell.isShow = true
    // event.target.innerText = FLAG
    renderCell(pos.i, pos.j, FLAG)
    // event.target.innerHTML = ` <img src=${FLAGIMG} alt="${FLAG}">`
  }

  if (checkVictory()) {
    stopStopwatch()
    openModalVictory()
  }
}
