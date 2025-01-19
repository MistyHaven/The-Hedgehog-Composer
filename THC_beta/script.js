//Piano Key Logic + Sounds
const pianoKeys = document.querySelectorAll(".piano-keys .key"),
  volumeSlider = document.querySelector(".volume-slider input"),
  keyCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [],
  audio = new Audio("tunes/a.wav"); //default, audio src is 'a' tune
notes = [];

const playTune = (key) => {
  audio.src = `tunes/${key}.wav`; //  Audio Source
  audio.play(); // Array holding Active Notes

  const clickedKey = document.querySelector(`[data-key="${key}"]`); //getting clicked key element
  clickedKey.classList.add("active");
  setTimeout(() => {
    //removing active class after 150 ms from the cloicked key event
    clickedKey.classList.remove("active");
  }, 150);
};

pianoKeys.forEach((key) => {
  allKeys.push(key.dataset.key); //adding data-key values to allKeys array
  //callign Playtune function with passing data key value as an argument
  key.addEventListener("click", () => playTune(key.dataset.key));
});

const handleVolume = (e) => {
  audio.volume = e.target.value; //passing range slider value as an audio volume
};

const showHideKeys = () => {
  //toggling hide class from each key on the checkbox click
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

const pressedKey = (e) => {
  if (allKeys.includes(e.key)) playTune(e.key); //if pressed key is in the key array => gets played
};

keyCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);

////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const pianoRoll = document.getElementById("piano-roll");
  const numColumns = 44;
  const numRows = 88;

  // Create the grid
  const alphabet = [
    "a",
    "w",
    "s",
    "e",
    "d",
    "f",
    "t",
    "g",
    "y",
    "h",
    "u",
    "j",
    "k",
    "o",
    "l",
    "p",
    ";",
  ];
  for (let i = 0; i < numRows * numColumns; i++) {
    const note = document.createElement("div");
    note.classList.add("note");
    note.addEventListener("click", () => {
      note.classList.toggle("active");
      const pos = Math.floor(i / numColumns); //not 16 since numColumns can change
      sound = alphabet[pos];
      audio = new Audio("tunes/a.wav");
      audio.src = `tunes/${sound}.wav`; // Create a new Audio object each time
      audio.play();

      notes.push(sound); //Error here ==> need notes to play piano note not sine
    });
    pianoRoll.appendChild(note);
  }

  // Handle clear button
  document.getElementById("clear-btn").addEventListener("click", () => {
    document.querySelectorAll(".note.active").forEach((note) => {
      note.classList.remove("active");
    });
    notes = []; //clear the list
  });
});

// PLAY BUTTON
document.getElementById("start-btn").addEventListener("click", () => {
  playMelody();
});

function playMelody() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const noteDuration = 541 / 4; // 541 = 1/4 note value, 541/4 = 16th note
  const playState = 1;

  notes.forEach((note, index) => {
    //const startTime = audioContext.currentTime + index * noteDuration; //calculate start time for each note
    //const audio = new Audio(`tunes/${note}.wav`);
    setTimeout(() => {
      const audio = new Audio(`tunes/${note}.wav`);
      audio.play();
    }, index * noteDuration);

    //schedule note to play at calculated start time
    //audio.currentTime = 0;
    // audio.play();
  });
  playState = 0;

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Task 1: Make sure that the playback uses piano keys (right tone) AND it counts the spaces in between.
  //i.e. Implement the note duration and pause functions to the playback feature. Make STOP and REPLAY buttons
  //Task 2: Expand piano roll, make it scrollable AND label each key
  //Task 3: Make the channel/layer function
  //Task 4: Create editing tools: switch from edit mode to select mode to delete mode, etc.
  //Task 6: Add soundfonts from the Genesis Collection
  //Task 7: Add effects and tools
  //Task 8: Implement Backend (exporting song, saving, clear everthing, midi)
  //Task 9: Add midi support
  //Task 10: Add Collaboration feauture (maybe users need to enter a code to join a specific project, like wooclap? Do they need to make an account? Figure it out)
  //Deadline: November 19, 2024
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

let currentAudio = null;

//STOP BUTTON
document.getElementById("stop-btn").addEventListener("click", () => {
  if (currentAudio || playState == 1) {
    currentAudio.pause();
    currentAudio.currentTime = 0; // reset to beginning
  }
});

//REPLAY BUTTON
document.getElementById("replay-btn").getEventListener("click", () => {
  playMelody();
});


//Watch crash course on javascript
//make new audio generator
    //starts, stops and replays songs.
    //Time in song indicator
    //Note and pause placement with different durations 
    //With soundfonts
    //Volume control.
    //Scrollablle piano/grid indicating the tones
    //Channel function (10 possible channels)
    //export song
    //save, delete and load songs (will there be a song library? => max 5)
    //effects
    //look at beepbox code and understand