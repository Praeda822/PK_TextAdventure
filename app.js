'use strict';

// Selectors
const storyElement = document.querySelector('.game__story');
const choicesElement = document.querySelector('.game__choices');

// Initial game state
let currentScene = 'start';

// Game scene logic
const scenes = {
  start: {
    text: `"Where am I?" You find yourself in a dimly lit room, the air thick with the scent of incense. Shadows dance on the walls, cast by a flickering candle on an ornate table.<br><br>
           Across from you stands an enigmatic figure draped in robes, his face hidden beneath a hood. "Welcome," he intones, his voice echoing as if from a great distance. "You are in the Hall of Forgotten Memories. Your journey begins here."`,
    options: {
      'Ask who the figure is': 'askFigure',
      'Look around the room': 'lookAround',
    },
  },
  askFigure: {
    text: `The figure raises a hand, revealing intricate tattoos spiraling down his arm. "I am a keeper of truths and secrets," he replies. "Your past, present, and future are intertwined in ways you cannot yet fathom. But fear not, for each choice you make will guide you toward your destiny."`,
    options: {
      'Inquire about your past': 'inquirePast',
      'Ask about your future': 'inquireFuture',
      'Leave the room': 'leaveRoom',
    },
  },
  lookAround: {
    text: `The room is filled with artifacts from countless eras: ancient scrolls, mysterious artifacts, and relics of forgotten times. Each object seems to whisper its own story, waiting for someone to listen.<br><br>
           A large mirror catches your eye. As you approach, your reflection begins to shimmer, revealing glimpses of places and faces you cannot remember but feel an inexplicable connection to.`,
    options: {
      'Touch the mirror': 'touchMirror',
      'Examine the artifacts': 'examineArtifacts',
      'Leave the room': 'leaveRoom',
    },
  },
  inquirePast: {
    text: `"Your past is a mosaic of choices and actions," the figure explains. "You have walked many paths, and each has left its mark upon your soul. To understand your past is to unlock the secrets of your very essence." He gestures toward a large book on the table.<br><br>
           "This tome contains the chronicles of your life. Read, and remember."`,
    options: {
      'Read the book': 'readBook',
      'Ask about your future': 'inquireFuture',
      'Leave the room': 'leaveRoom',
    },
  },
  inquireFuture: {
    text: `The figure's eyes seem to pierce through the shadows. "The future is ever-changing, shaped by your choices. It is a tapestry yet to be woven. To glimpse what lies ahead, you must seek the Oracle of Echoes in the Valley of Shadows. There, you will find answers, but beware—the path is fraught with peril."`,
    options: {
      'Accept the quest to seek the Oracle': 'acceptQuest',
      'Decline and seek another way': 'declineQuest',
      'Leave the room': 'leaveRoom',
    },
  },
  touchMirror: {
    text: `As your fingers brush the mirror's surface, the world around you dissolves into a whirlwind of colors and sensations. You are pulled into a vortex, emerging in a strange, ethereal landscape. Before you stands a towering figure with eyes like burning stars.<br><br>
           "Welcome, seeker," the figure rumbles. "You have crossed the threshold of reality. Here, you will face trials that will test your very soul."`,
    options: {
      'Accept the trials': 'acceptTrials',
      'Return to the room': 'returnToRoom',
    },
  },
  examineArtifacts: {
    text: `You carefully examine the artifacts, each one telling a story of its own. A dagger encrusted with gems, a chalice of strange liquid, a scroll written in an ancient language. As you touch one of the artifacts, a vision floods your mind: a vast desert, a hidden temple, and a figure shrouded in light.<br><br>
           "These relics hold power," the figure's voice echoes in your mind. "Choose wisely, for they will aid you on your journey."`,
    options: {
      'Take the dagger': 'takeDagger',
      'Take the chalice': 'takeChalice',
      'Take the scroll': 'takeScroll',
    },
  },
  readBook: {
    text: `You open the book, its pages filled with intricate illustrations and text in a language you somehow understand. As you read, memories flood back: battles fought, loves lost, moments of triumph and despair. You see yourself standing at a crossroads, each path leading to a different fate.<br><br>
           "Your past shapes your future," the figure's voice whispers. "Learn from it, and choose your path wisely."`,
    options: {
      'Continue reading': 'continueReading',
      'Close the book and reflect': 'closeBook',
      'Leave the room': 'leaveRoom',
    },
  },
  acceptQuest: {
    text: `You nod, determination in your eyes. "I will seek the Oracle," you say. The figure smiles, handing you a map. "Follow this path through the Valley of Shadows. Trust in yourself, and you will find what you seek."<br><br>
           As you step outside, the world seems both familiar and alien. The journey ahead is daunting, but you feel a newfound sense of purpose guiding you.`,
    options: {
      'Begin your journey': 'beginJourney',
      'Stay and prepare': 'stayPrepare',
      'Return to the room': 'returnToRoom',
    },
  },
  declineQuest: {
    text: `You shake your head. "I am not ready," you say. The figure nods, understanding in his eyes. "The path is not for everyone. Seek your own way, and perhaps destiny will find you when you are ready."`,
    options: {
      'Look around the room': 'lookAround',
      'Leave the room': 'leaveRoom',
    },
  },
  acceptTrials: {
    text: `You stand tall, ready to face whatever comes. The towering figure nods. "Very well. Your first trial begins now." The landscape shifts around you, transforming into a vast, arid desert. A storm brews on the horizon, and you feel a sense of urgency.<br><br>
           "Survive the storm, and you will prove your worth," the figure's voice echoes.`,
    options: {
      'Face the storm': 'faceStorm',
      'Seek shelter': 'seekShelter',
      'Return to the room': 'returnToRoom',
    },
  },
  returnToRoom: {
    text: `The world around you fades, and you find yourself back in the dimly lit room. The figure watches you, a hint of a smile on his lips. "The journey is not over," he says. "Every step brings you closer to understanding."`,
    options: {
      'Ask who the figure is': 'askFigure',
      'Look around the room': 'lookAround',
    },
  },
  takeDagger: {
    text: `You take the dagger, feeling its weight in your hand. It feels right, as if it was meant for you. The figure's voice echoes in your mind. "The dagger will guide you through darkness and despair. Trust in its power."<br><br>
           A vision of a hidden temple flashes before your eyes. You know what you must do.`,
    options: {
      'Seek the hidden temple': 'seekTemple',
      'Leave the room': 'leaveRoom',
    },
  },
  takeChalice: {
    text: `You take the chalice, its liquid shimmering in the dim light. The figure's voice echoes in your mind. "The chalice holds the elixir of truth. Drink, and you will see beyond the veil of reality."<br><br>
           A vision of a vast desert flashes before your eyes. You know what you must do.`,
    options: {
      'Drink the elixir': 'drinkElixir',
      'Leave the room': 'leaveRoom',
    },
  },
  takeScroll: {
    text: `You take the scroll, unrolling it carefully. The ancient text seems to glow with an inner light. The figure's voice echoes in your mind. "The scroll holds the wisdom of the ages. Read, and you will understand."<br><br>
           A vision of a hidden temple flashes before your eyes. You know what you must do.`,
    options: {
      'Read the scroll': 'readScroll',
      'Leave the room': 'leaveRoom',
    },
  },
  continueReading: {
    text: `You delve deeper into the book, uncovering secrets long forgotten. Each page reveals more about your past lives, your triumphs, and your failures. You see yourself standing before a great throne, a crown in your hand. "You are the architect of your destiny," the figure's voice whispers.<br><br>
           "Embrace your role and shape the future."`,
    options: {
      'Embrace your destiny': 'embraceDestiny',
      'Close the book and reflect': 'closeBook',
      'Leave the room': 'leaveRoom',
    },
  },
  closeBook: {
    text: `You close the book, your mind racing with newfound knowledge. The figure nods, as if understanding your thoughts. "The journey is within you," he says. "Each choice you make is a step toward your true self."<br><br>
           You feel a sense of peace, knowing that your path is becoming clearer.`,
    options: {
      'Reflect on your journey': 'reflectJourney',
      'Leave the room': 'leaveRoom',
    },
  },
  seekTemple: {
    text: `With the dagger in hand, you set out to find the hidden temple. The journey is arduous, the desert vast and unforgiving. But the dagger seems to guide you, its blade glowing faintly as you approach your destination.<br><br>
           At last, you stand before the entrance to the temple, its ancient doors creaking open as if welcoming you.`,
    options: {
      'Enter the temple': 'enterTemple',
      'Turn back': 'turnBack',
    },
  },
  drinkElixir: {
    text: `You drink from the chalice, the liquid cool and refreshing. As it flows through you, your vision sharpens, revealing truths hidden from mortal eyes. You see the path before you, leading to a hidden temple in the heart of the desert.<br><br>
           "Go forth, and discover your destiny," the figure's voice whispers.`,
    options: {
      'Seek the hidden temple': 'seekTemple',
      'Leave the room': 'leaveRoom',
    },
  },
  readScroll: {
    text: `You read the scroll, the ancient text illuminating your mind. The wisdom of the ages flows into you, revealing secrets and mysteries long forgotten. You see the path before you, leading to a hidden temple in the heart of the desert.<br><br>
           "Go forth, and discover your destiny," the figure's voice whispers.`,
    options: {
      'Seek the hidden temple': 'seekTemple',
      'Leave the room': 'leaveRoom',
    },
  },
  embraceDestiny: {
    text: `You feel a surge of power and understanding. The memories of your past lives coalesce into a single moment of clarity. You are the architect of your fate, and the path before you is clear.<br><br>
           "The journey continues," the figure says, "but now you walk it with purpose."`,
    options: {
      'Begin your journey': 'beginJourney',
      'Reflect on your journey': 'reflectJourney',
      'Leave the room': 'leaveRoom',
    },
  },
  reflectJourney: {
    text: `You sit quietly, reflecting on the choices you've made and the paths you've walked. Each decision has led you here, to this moment of clarity. The future is unwritten, but you are ready to face it with courage and wisdom.<br><br>
           "The journey is yours," the figure says. "May you find what you seek."`,
    options: {
      'Begin your journey': 'beginJourney',
      'Leave the room': 'leaveRoom',
    },
  },
  beginJourney: {
    text: `With newfound purpose, you step out into the world. The path ahead is challenging, but you are ready. Every step brings you closer to your destiny, and you feel a deep sense of peace and determination.<br><br>
           The journey has just begun, but you know that you will face it with courage and wisdom.`,
    options: {
      Continue: 'continueJourney',
    },
  },
  faceStorm: {
    text: `You brace yourself against the storm, feeling its fury and power. The wind howls, and the sand stings your skin, but you stand firm. The storm is a trial, a test of your resolve.<br><br>
           "You are stronger than the storm," the figure's voice echoes in your mind. "Endure, and you will emerge victorious."`,
    options: {
      'Endure the storm': 'endureStorm',
      'Seek shelter': 'seekShelter',
    },
  },
  seekShelter: {
    text: `You look for shelter, finding a small cave nearby. As you take refuge, you feel a sense of safety and calm. The storm rages outside, but you are protected.<br><br>
           "Sometimes, seeking shelter is the wisest choice," the figure's voice echoes in your mind. "Rest, and gather your strength."`,
    options: {
      'Rest and wait out the storm': 'waitStorm',
      'Return to the room': 'returnToRoom',
    },
  },
  endureStorm: {
    text: `You stand your ground, facing the storm with unwavering determination. The wind and sand batter you, but you endure. Slowly, the storm begins to subside, and you emerge stronger for having faced it head-on.<br><br>
           "You have proven your strength," the figure's voice echoes. "Now, continue on your path."`,
    options: {
      'Continue your journey': 'continueJourney',
      'Return to the room': 'returnToRoom',
    },
  },
  waitStorm: {
    text: `You wait out the storm in the safety of the cave. As the wind howls outside, you find a moment of peace and reflection. When the storm finally passes, you step outside, ready to continue your journey.<br><br>
           "Rest has given you strength," the figure's voice echoes. "Now, continue on your path."`,
    options: {
      'Continue your journey': 'continueJourney',
      'Return to the room': 'returnToRoom',
    },
  },
  enterTemple: {
    text: `You step into the temple, its ancient halls filled with a sense of reverence and mystery. The air is cool, and the walls are adorned with symbols and murals depicting the history of the world.<br><br>
           At the center of the temple stands an altar, upon which rests a glowing orb. You feel a powerful connection to it, as if it holds the answers to all your questions.`,
    options: {
      'Approach the altar': 'approachAltar',
      'Explore the temple': 'exploreTemple',
      'Turn back': 'turnBack',
    },
  },
  turnBack: {
    text: `You hesitate, the weight of the journey pressing down on you. Perhaps you are not ready to face what lies ahead. You turn back, knowing that the path will always be there, waiting for you when you are ready.<br><br>
           "The journey is yours to take," the figure's voice echoes. "Return when you are ready."`,
    options: {
      'Return to the room': 'returnToRoom',
      'Reflect on your journey': 'reflectJourney',
    },
  },
  approachAltar: {
    text: `You approach the altar, the glowing orb pulsing with an otherworldly light. As you reach out to touch it, a surge of energy flows through you, revealing visions of the past, present, and future.<br><br>
           "The answers you seek are within you," the figure's voice whispers. "Embrace your destiny, and the truth will be revealed."`,
    options: {
      'Embrace your destiny': 'embraceDestiny',
      'Explore the temple': 'exploreTemple',
    },
  },
  exploreTemple: {
    text: `You explore the temple, each step revealing more about its ancient secrets. The murals tell stories of heroes and gods, of battles and sacrifices. You feel a deep connection to this place, as if you have been here before.<br><br>
           "The temple holds many secrets," the figure's voice echoes. "Explore, and discover your truth."`,
    options: {
      'Approach the altar': 'approachAltar',
      'Turn back': 'turnBack',
    },
  },
  continueJourney: {
    text: `With newfound strength and determination, you continue your journey. The path ahead is filled with challenges and mysteries, but you are ready to face them.<br><br>
           "The journey is long, but the rewards are great," the figure's voice echoes. "May you find what you seek."`,
    options: {
      Continue: 'beginJourney',
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
