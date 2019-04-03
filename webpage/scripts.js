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
var time = document.getElementById("ip");
payButton.addEventListener("click", handleClick)

// DETERMINE STATUS
function getStatus() {
  return fetch(
    "https://api-endpoint"
  )
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      ip.textContent = data;
      return data;
    });
}

var ip = getStatus();