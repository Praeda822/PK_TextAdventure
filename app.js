'use strict';

// Game scene logic
// Game scene logic
const scenes = {
  start: {
    text: `Welcome, adventurer. Before you begin your journey, we must determine your true nature. Answer the following questions truthfully, and your path will be revealed.`,
    options: {
      'Begin the quiz': 'question1',
    },
  },
  question1: {
    text: `You come across a wounded traveler on the road. Their eyes plead for help, but you notice they wear the emblem of a rival faction that has caused you great harm. What do you do?`,
    options: {
      'Help them and offer some of your provisions': 'q1_help',
      'Use this opportunity to pickpocket them': 'q1_pickpocket',
      'Leave them to their fate, believing in justice for their past transgressions':
        'q1_leave',
    },
  },
  q1_help: {
    text: `Your compassion transcends boundaries. Next question.`,
    action: () => {
      scores.mage++;
    },
    options: {
      Next: 'question2',
    },
  },
  q1_pickpocket: {
    text: `Your pragmatism seeks truth before action. Next question.`,
    action: () => {
      scores.thief++;
    },
    options: {
      Next: 'question2',
    },
  },
  q1_leave: {
    text: `Your resolve in justice is unyielding. Next question.`,
    action: () => {
      scores.warrior++;
    },
    options: {
      Next: 'question2',
    },
  },
  question2: {
    text: `You find a book of forbidden knowledge that promises immense power but warns of dire consequences. What do you do?`,
    options: {
      'Read the book, embracing the risk for the pursuit of knowledge':
        'q2_read',
      'Burn the book, removing the temptation and protecting others': 'q2_burn',
      'Hide the book, saving it for when you might need its power': 'q2_hide',
    },
  },
  q2_read: {
    text: `Your thirst for knowledge knows no bounds. Next question.`,
    action: () => {
      scores.mage++;
    },
    options: {
      Next: 'question3',
    },
  },
  q2_burn: {
    text: `Your sense of duty prioritizes the greater good. Next question.`,
    action: () => {
      scores.warrior++;
    },
    options: {
      Next: 'question3',
    },
  },
  q2_hide: {
    text: `Your cunning ensures future possibilities. Next question.`,
    action: () => {
      scores.thief++;
    },
    options: {
      Next: 'question3',
    },
  },
  question3: {
    text: `You are offered a position of great power and influence, but accepting it means compromising your most cherished principles. What do you do?`,
    options: {
      'Accept the position, believing you can do more good from within':
        'q3_accept',
      'Refuse the position, staying true to your principles': 'q3_refuse',
      'Accept the position with the intent to undermine it from within':
        'q3_undermine',
    },
  },
  q3_accept: {
    text: `Your ambition seeks to balance power with morality. Final question.`,
    action: () => {
      scores.warrior++;
      scores.mage++;
    },
    options: {
      Next: 'question4',
    },
  },
  q3_refuse: {
    text: `Your integrity remains unshaken. Final question.`,
    action: () => {
      scores.mage++;
    },
    options: {
      Next: 'question4',
    },
  },
  q3_undermine: {
    text: `Your strategic mind sees the long game. Final question.`,
    action: () => {
      scores.thief++;
    },
    options: {
      Next: 'question4',
    },
  },
  question4: {
    text: `You discover a hidden door in the basement of an old inn. Behind it lies either great treasure or a terrible curse. What do you do?`,
    options: {
      'Break it open and face whatever comes, believing in your strength':
        'q4_break',
      'Search for a key or mechanism to unlock it safely': 'q4_unlock',
      'Leave it alone and inform the innkeeper, respecting the unknown':
        'q4_inform',
    },
  },
  q4_break: {
    text: `Your boldness is noted. Next question.`,
    action: () => {
      scores.warrior++;
    },
    options: {
      Next: 'question5',
    },
  },
  q4_unlock: {
    text: `Your patience and caution are noted. Next question.`,
    action: () => {
      scores.mage++;
    },
    options: {
      Next: 'question5',
    },
  },
  q4_inform: {
    text: `Your respect for boundaries is noted. Next question.`,
    action: () => {
      scores.thief++;
    },
    options: {
      Next: 'question5',
    },
  },
  question5: {
    text: `A powerful artifact is guarded by a dragon. Do you...`,
    options: {
      'Fight the dragon to claim the artifact': 'q5_fight',
      'Sneak past the dragon to steal the artifact': 'q5_sneak',
      'Negotiate with the dragon to gain access to the artifact':
        'q5_negotiate',
    },
  },
  q5_fight: {
    text: `Your bravery knows no bounds. Next question.`,
    action: () => {
      scores.warrior++;
    },
    options: {
      Next: 'question6',
    },
  },
  q5_sneak: {
    text: `Your stealth is unmatched. Next question.`,
    action: () => {
      scores.thief++;
    },
    options: {
      Next: 'question6',
    },
  },
  q5_negotiate: {
    text: `Your wisdom guides you. Next question.`,
    action: () => {
      scores.mage++;
    },
    options: {
      Next: 'question6',
    },
  },
  question6: {
    text: `A rival challenges you to a duel. Do you...`,
    options: {
      'Accept the duel, confident in your abilities': 'q6_accept',
      'Refuse the duel, seeking a peaceful resolution': 'q6_refuse',
      'Trick the rival into withdrawing the challenge': 'q6_trick',
    },
  },
  q6_accept: {
    text: `Your courage is admirable. Let's see your results.`,
    action: () => {
      scores.warrior++;
    },
    options: {
      'See Results': 'results',
    },
  },
  q6_refuse: {
    text: `Your diplomacy shines. Let's see your results.`,
    action: () => {
      scores.mage++;
    },
    options: {
      'See Results': 'results',
    },
  },
  q6_trick: {
    text: `Your cunning is evident. Let's see your results.`,
    action: () => {
      scores.thief++;
    },
    options: {
      'See Results': 'results',
    },
  },
  results: {
    text: `Based on your answers, your class is: `,
    action: restartGame,
    options: {
      Restart: 'start',
    },
  },
};

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

// Function to reset the game state
function resetScores() {
  scores = { warrior: 0, mage: 0, thief: 0 };
}

// Function to restart game
function restartGame() {
  resetScores();
  displayScene('start');
}

// Function to determine the class based on scores
function determineClass() {
  const highestScore = Math.max(scores.warrior, scores.mage, scores.thief);
  let resultText = '';

  if (scores.warrior === highestScore) {
    resultText = 'Warrior';
  } else if (scores.mage === highestScore) {
    resultText = 'Mage';
  } else {
    resultText = 'Thief';
  }

  console.log(scores);
  storyElement.innerHTML += `<br><br><strong>${resultText}</strong>`;
}

// Function to display the current scene
function displayScene(sceneKey) {
  const scene = scenes[sceneKey];
  storyElement.innerHTML = scene.text;

  // Check if results is the current scene
  if (sceneKey === 'results') {
    determineClass();
  }

  // Clear previous choices
  choicesElement.innerHTML = '';

  // Display the choices
  Object.keys(scene.options).forEach(choiceText => {
    const button = document.createElement('button');
    button.textContent = choiceText;
    button.classList.add('game--button');
    button.onclick = () => {
      if (scene.action) scene.action();
      currentScene = scene.options[choiceText];
      displayScene(currentScene);
    };
    choicesElement.appendChild(button);
  });
}

// Start the game by displaying the initial scene
displayScene(currentScene);
