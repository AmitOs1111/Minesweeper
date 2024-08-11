'use strict'

function onLevelGame(elBtn) {
  console.log('elBtn', elBtn.innerText)

  switch (elBtn.innerText) {
    case 'Beginner':
      console.log('Beginner')
      break
    case 'Medium':
      console.log('Medium')
      break
    case 'Expert':
      console.log('Expert')
      break
  }
}
