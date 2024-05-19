'use strict';

// Selectors
const storyElement = document.querySelector('.game__story');
const choicesElement = document.querySelector('.game__choices');

// Initial game state
let currentScene = 'start';
let scores = {
  warrior: 0,
  mage: 0,
  thief: 0,
};

// Game scene logic
const scenes = {
  start: {
    text: `Welcome, adventurer. Before you begin your journey, we must determine your true nature. Answer the following questions truthfully, and your path will be revealed.`,
    options: {
      'Begin the quiz': 'question1',
    },
  },
};

// Function to display the current scene
function displayScene(sceneKey) {
  // Fetch the current scene object based on the sceneKey
  const scene = scenes[sceneKey];

  // Update the story element with the text of the current scene
  storyElement.innerHTML = scene.text;

  // Clear previous choices
  choicesElement.innerHTML = '';

  // Display choices
  Object.keys(scene.options).forEach(choiceText => {
    const button = document.createElement('button');
    button.textContent = choiceText;
    button.classList.add('game--button');
    button.onclick = () => {
      currentScene = scene.options[choiceText];
      displayScene(currentScene);
    };
    choicesElement.appendChild(button);
  });
}

// Start the game by displaying the initial scene
displayScene(currentScene);
