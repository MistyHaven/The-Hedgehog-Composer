// script.js
const pianoContainer = document.querySelector(".piano");

const TOTAL_KEYS = 88; // Total number of piano keys

// Function to create piano keys
function createPianoKeys() {
  for (let i = 0; i < TOTAL_KEYS; i++) {
    // Create white key
    const whiteKey = document.createElement("div");
    whiteKey.classList.add("white-key");
    pianoContainer.appendChild(whiteKey);

    // Create black keys, skipping the correct positions
    if (i % 7 !== 2 && i % 7 !== 6) {
      const blackKey = document.createElement("div");
      blackKey.classList.add("black-key");
      blackKey.style.bottom = `${100}px`; // Position above the white key
      blackKey.style.left = `${i * 100 + 70}px`; // Adjust position based on the white key's index
      pianoContainer.appendChild(blackKey);
    }
  }
}

// Initialize piano keys on page load
createPianoKeys();
