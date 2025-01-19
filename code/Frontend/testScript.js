// script.js
const pianoRoll = document.getElementById("piano-roll");
const playButton = document.getElementById("play-button");

const notes = []; // Array to hold notes

// Create the grid
for (let i = 0; i < 7; i++) {
  for (let j = 0; j < 16; j++) {
    const noteBlock = document.createElement("div");
    noteBlock.className = "note";
    noteBlock.dataset.note = `${i}-${j}`;
    noteBlock.addEventListener("click", () => toggleNote(noteBlock));
    pianoRoll.appendChild(noteBlock);
  }
}

// Toggle note placement
function toggleNote(noteBlock) {
  const index = notes.indexOf(noteBlock.dataset.note);
  if (index > -1) {
    notes.splice(index, 1); // Remove if already present
    noteBlock.style.backgroundColor = "lightblue";
  } else {
    notes.push(noteBlock.dataset.note); // Add new note
    noteBlock.style.backgroundColor = "orange"; // Indicate placement
  }
}

// Play the melody
playButton.addEventListener("click", () => {
  playMelody();
});

function playMelody() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  notes.forEach((note, index) => {
    const [row, col] = note.split("-").map(Number);
    const frequency = 200 + row * 100; // Example frequency calculation
    const startTime = audioContext.currentTime + index * 0.5; // Delay for each note

    const oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + 0.4); // Note duration
  });
}
