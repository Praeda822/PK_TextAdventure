'use strict';

// Selectors
const storyElement = document.querySelector('.game__story');
const userInput = document.querySelector('.game__input');
const submitButton = document.querySelector('.game__button');
const resultElement = document.querySelector('.game__result');

// Initial game state
let currentScene = 'start';

// Game scene logic
// Rough as guts for now - will write up tmrw
const scenes = {
  start: {
    text: '"The Lord High who?" You stare at your friends, Patrick and Rachel Smith. Rachel scowls, The Lord High Executioner", she repeats. "We told you about him already, are you even listening!?"',
    options: {
      choice1:
        'Head outside and go for a bike ride, your new friends have gone crazy',
      choice2: 'Stay longer and listen to what the siblings have to say',
    },
  },
};

// Function to display the current scene
function displayScene(sceneKey) {
  // Fetch the current scene object based on the sceneKey
  const scene = scenes[sceneKey];

  // Update the story element with the text of the current scene
  storyElement.textContent = scene.text;
}

// Start the game by displaying the initial scene
displayScene(currentScene);
