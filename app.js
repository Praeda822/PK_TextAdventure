"use strict";

// Selectors
const storyElement = document.getElementById("story");
const userInput = document.getElementById("user-input");
const submitButton = document.getElementById("submit-button");
const resultElement = document.getElementById("result");

// Initial game state
let currentScene = "start";

// Game scene logic
// Rough as guts for now - will write up tmrw
const scenes = {
  start: {
    text: "You find yourself in a dark forest. There are paths to the north, south, east, and west.",
    options: {
      north: "northPath",
      south: "southPath",
      east: "eastPath",
      west: "westPath",
    },
  },
  northPath: {
    text: "You see a large cave entrance. Do you want to enter?",
    options: {
      enter: "cave",
      back: "start",
    },
  },
  southPath: {
    text: "You come across a tranquil lake. Do you want to swim or go back?",
    options: {
      swim: "lake",
      back: "start",
    },
  },
  eastPath: {
    text: "You encounter a dense forest. Do you want to explore or go back?",
    options: {
      explore: "forest",
      back: "start",
    },
  },
  westPath: {
    text: "You find an abandoned village. Do you want to search or go back?",
    options: {
      search: "village",
      back: "start",
    },
  },
  cave: {
    text: "The cave is dark and you hear strange noises. Do you want to proceed or go back?",
    options: {
      proceed: "deepCave",
      back: "northPath",
    },
  },
  lake: {
    text: "The water is refreshing. You feel rejuvenated. Do you want to go back?",
    options: {
      back: "southPath",
    },
  },
  forest: {
    text: "You find a hidden treasure chest. Do you want to open it or go back?",
    options: {
      open: "treasure",
      back: "eastPath",
    },
  },
  village: {
    text: "The village is eerily silent. You find a map to a secret location. Do you want to follow it or go back?",
    options: {
      follow: "secretLocation",
      back: "westPath",
    },
  },
  deepCave: {
    text: "You find a sleeping dragon. Do you want to fight or go back?",
    options: {
      fight: "dragonFight",
      back: "cave",
    },
  },
  treasure: {
    text: "The chest contains gold and jewels. You win!",
    options: {
      restart: "start",
    },
  },
  secretLocation: {
    text: "You find an ancient artifact. You win!",
    options: {
      restart: "start",
    },
  },
  dragonFight: {
    text: "The dragon wakes up and you have no chance. You lose!",
    options: {
      restart: "start",
    },
  },
};

// Function to display the current scene
function displayScene(sceneKey) {
  // Fetch the current scene object based on the sceneKey
  const scene = scenes[sceneKey];

  // Update the story element with the text of the current scene
  storyElement.textContent = scene.text;

  // Clear any previous result message
  resultElement.textContent = "";

  // Clear the options
  userInput.value = "";

  // Set focus to the input field for user convenience
  userInput.focus();
}

// Function to handle user input
function handleInput() {
  // Capture the user input, trim whitespace, and convert to lowercase
  const userChoice = userInput.value.trim().toLowerCase();

  // Fetch the current scene object
  const scene = scenes[currentScene];

  // Check if the user input matches any options in the current scene
  if (scene.options[userChoice]) {
    // Update the current scene based on user choice
    currentScene = scene.options[userChoice];

    // Display the new scene
    displayScene(currentScene);
  } else {
    // Show an error message if the user input is invalid
    resultElement.textContent = "Invalid command. Please try again.";
  }
}

// Event listener for the submit button
submitButton.addEventListener("click", handleInput);

// Event listener for Enter key
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleInput();
  }
});

// Start the game by displaying the initial scene
displayScene(currentScene);
