// UTILITY FUNCTIONS
function toggleMode(status) {
  if (status === "offline") {
    offlineDisplay.classList.remove("hidden")
    onlineDisplay.classList.add("hidden")
  } else {
    offlineDisplay.classList.remove("hidden")
    onlineDisplay.classList.add("hidden")
  }
}

// EVENT FUNCTIONS
function handleClick(event) {
  console.log(event)
  getStatus()
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
      // Need to handle online and offline state here
      if (data === "offline") {
        offlineDisplay.classList.remove("hidden")
        onlineDisplay.classList.add("hidden")
      } else {
        offlineDisplay.classList.add("hidden")
        onlineDisplay.classList.remove("hidden")
        // Only update ip.textContext if online
        ip.textContent = data;
      }
      return data;
    });
}

var ip = getStatus();