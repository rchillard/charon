const CHARON_API = "https://api-endpoint";

// EVENT FUNCTION
function handleClick(event) {
  console.log(event);
  getStatus();
}

// UPDATE DISPLAY
function updatePage(status) {
  imageDisplay.classList.remove("hidden");
  if (status === "offline") {
    titleDisplay.textContent = "Charon waits at river's edge";
    imageDisplay.src = "assets/1280px-Gustave_Doré_-_Dante_Alighieri.jpg";
    buttonDisplay.textContent = "Pay the Ferryman";
    buttonDisplay.classList.remove("hidden");
    statusDisplay.textContent = "";
  } else {
    titleDisplay.textContent = "Charon paddles the River Styx";
    imageDisplay.src = "assets/1200px-Lytovchenko_Olexandr_Kharon.jpg";
    buttonDisplay.classList.add("hidden");
    statusDisplay.textContent =
      "The far shore appears out of the fog at " + status;
  }
}

// DETERMINE STATUS
function getStatus() {
  try {
    return fetch(charonAPI)
      .then(function(response) {
        console.log(response);
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        updatePage(data);
        return data;
      });
  } catch (err) {
    console.log(err);
    return err;
  }
}

// GATHER ELEMENTS
// Assumes only 1 element of each tag type on page
var titleDisplay = document.getElementById("title");
var imageDisplay = document.getElementById("portrait");
var statusDisplay = document.getElementById("status");
var buttonDisplay = document.getElementById("pay");

// Modify elements
buttonDisplay.addEventListener("click", handleClick);

// Call for initial status
getStatus();
