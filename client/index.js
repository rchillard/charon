const CHARON_API = "http://localhost:3000/dev";

// Determine Status of Server
function getStatus() {
  fetch(CHARON_API)
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      updatePage(data);
      return data;
    })
    .catch(err => {
      console.log(err);
      updatePage("error");
      return err;
    });
}

// Turn the Server On
function summonCharon(pass) {
  console.log(pass);
  fetch(CHARON_API, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
    method: "POST",
    body: JSON.stringify({
      passphrase: pass
    })
  })
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      updatePage(data);
      return data;
    })
    .catch(err => {
      console.log(err);
      updatePage("error");
      return err;
    });
}

// UPDATE DISPLAY
function updatePage(status) {
  imageDisplay.classList.remove("hidden");
  if (status === "offline" || status === "error") {
    titleDisplay.textContent = "Charon waits at river's edge";
    imageDisplay.src = "assets/1280px-Gustave_Doré_-_Dante_Alighieri.jpg";
    formDisplay.classList.remove("hidden");
    statusDisplay.textContent = "What word reveals the underworld?";
  } else if (status === "Charon only appears with the right word.") {
    titleDisplay.textContent = "Charon waits at river's edge";
    imageDisplay.src = "assets/1280px-Gustave_Doré_-_Dante_Alighieri.jpg";
    formDisplay.classList.remove("hidden");
    statusDisplay.textContent = "Charon only appears with the right word.";
    passDisplay.value = "";
  } else {
    titleDisplay.textContent = "Charon paddles the River Styx";
    imageDisplay.src = "assets/1200px-Lytovchenko_Olexandr_Kharon.jpg";
    formDisplay.classList.add("hidden");
    statusDisplay.textContent =
      "The far shore appears out of the fog: " + status;
  }
}

// GATHER ELEMENTS
// Assumes only 1 element of each tag type on page
var titleDisplay = document.getElementById("title");
var imageDisplay = document.getElementById("portrait");
var statusDisplay = document.getElementById("status");
var formDisplay = document.getElementById("pay");
var passDisplay = document.getElementById("passphrase");

// Call for initial status
getStatus();
