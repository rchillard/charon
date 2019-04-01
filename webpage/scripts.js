// UTILITY FUNCTIONS
function toggleMode() {
  offlineDisplay.classList.toggle("hidden")
  onlineDisplay.classList.toggle("hidden")
}

// EVENT FUNCTIONS
function handleClick(event) {
  console.log(event)
  toggleMode()
}

// GATHER ELEMENTS
var offlineDisplay = document.getElementById("offline")
var onlineDisplay = document.getElementById("online")
var payButton = document.getElementById("pay")
payButton.addEventListener("click", handleClick)