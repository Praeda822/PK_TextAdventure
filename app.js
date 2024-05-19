'use strict';

// Selectors
const storyElement = document.querySelector('.game__story');
const choicesElement = document.querySelector('.game__choices');

// Initial game state
let currentScene = 'start';

// Game scene logic
// Rough as guts for now - will write up tmrw
const scenes = {
  start: {
    text: '"The Lord High who?" You stare at your friends, Patrick and Rachel Smith. Rachel scowls, The Lord High Executioner", she repeats. "We told you about him already, are you even listening!?"',
    options: {
      'Head outside and go for a bike ride, your new friends have gone crazy':
        'outside',
      'Stay longer and listen to what the siblings have to say': 'listen',
    },
  },
  outside: {
    text: "You decide to head outside for a bike ride. The fresh air clears your mind, but you can't shake the feeling that something important is happening...",
    options: {
      'Return to the house and talk to your friends': 'start',
      'Keep riding your bike': 'ride',
    },
  },
  listen: {
    text: "You stay and listen to what Rachel and Patrick have to say. They explain that the Lord High Executioner is a key figure in the hidden world they've discovered...",
    options: {
      'Ask more about the hidden world': 'hiddenWorld',
      'Dismiss their story and leave': 'outside',
    },
  },
};

// Function to display the current scene
function displayScene(sceneKey) {
  // Fetch the current scene object based on the sceneKey
  const scene = scenes[sceneKey];

  // Update the story element with the text of the current scene
  storyElement.textContent = scene.text;

  // Clear previous choices
  choicesElement.innerHTML = '';

  // Display choices
  Object.keys(scene.options).forEach(choiceText => {
    const button = document.createElement('button');
    button.textContent = choiceText;
    button.classList.add('choice-button');
    button.onclick = () => {
      currentScene = scene.options[choiceText];
      displayScene(currentScene);
    };
    choicesElement.appendChild(button);
  });
}

// Start the game by displaying the initial scene
displayScene(currentScene);
