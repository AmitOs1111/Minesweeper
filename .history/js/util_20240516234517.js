'use strict'

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) // The maximum is exclusive and the minimum is inclusive
}

// Define variables to hold the time values
var seconds = 0
var minutes = 0
var hours = 0

// Define a variable to hold the setInterval() function
var gIntervalId

// Function to start the stopwatch
function startStopwatch() {
  gIntervalId = setInterval(function () {
    seconds++
    if (seconds === 60) {
      seconds = 0
      minutes++
      if (minutes === 60) {
        minutes = 0
        hours++
      }
    }
    displayTime()
  }, 1000) // Update every second (1000 milliseconds)
}

// Function to display the current time
function displayTime() {
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`
  console.log(formattedTime) // You can replace this with code to display the time in your application
  document.querySelector('.timer-game').innerText = formattedTime
  return formattedTime
}

// Function to stop the stopwatch
function stopStopwatch() {
  clearInterval(gIntervalId)
}

// Function to reset the stopwatch
function resetStopwatch() {
  clearInterval(gIntervalId)
  seconds = 0
  minutes = 0
  hours = 0
  displayTime()
}

// Usage examples:
startStopwatch() // Start the stopwatch
// After some time, you can stop it
setTimeout(stopStopwatch, 5000) // Stop the stopwatch after 5 seconds
// Or reset it
setTimeout(resetStopwatch, 10000) // Reset the stopwatch after 10 seconds
