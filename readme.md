### My Text Adventure Game

Welcome to my Text Adventure Game! This interactive story allows players to make choices that determine their character's path and ultimate class. The game consists of a series of questions where each decision affects the player's progression and final outcome.

## How to Play

1. **Start the Game**: The game begins with an introductory scene that sets the stage for your adventure.
2. **Make Choices**: As you progress, you'll be presented with various scenarios and choices. Each choice will affect your scores in different categories: warrior, mage, or thief.
3. **Determine Your Class**: At the end of the game, your final class will be determined based on your highest score in one of the three categories.

**Game Structure**

The game starts with a welcoming message and a prompt to begin a quiz that will reveal the player's true nature. The journey unfolds through a series of scenarios where the player must choose how to respond to various challenges. Each choice increases the player's score in one of three categories: warrior, mage, or thief. At the end of the game, the player's class is determined based on their scores.

### Scenes and Choices

The game is structured into different scenes, each representing a scenario with multiple choices. Here is an overview of the key scenes and choices:

**Sample Questions and Responses**

```
question1: {
    text: `You come across a wounded traveler on the road. Their eyes plead for help, but you notice they wear the emblem of a rival faction that has caused you great harm. What do you do?`,
    options: {
        'Help them and offer some of your provisions':
        'q1_help',
        'Use this opportunity to pickpocket them':
        'q1_pickpocket',
        'Leave them to their fate, believing in justice for their past transgressions': 'q1_leave',
    },
},
```

The game continues with similar questions, each offering multiple choices that affect the players scores in different ways. Here are a few more examples:

**_Question 2_**:
You find a book of forbidden knowledge that promises immense power but warns of dire consequences. What do you do?<br><br>
**1**. Read the book, embracing the risk for the pursuit of knowledge: Increases mage score.<br>
**2**. Burn the book, removing the temptation and protecting others: Increases warrior score.<br>
**3**. Hide the book, saving it for when you might need its power: Increases thief score.<br>

**_Question 3_**:
You are offered a position of great power and influence, but accepting it means compromising your most cherished principles. What do you do?<br><br>
**1.** Accept the position, believing you can do more good from within: Increases warrior and mage scores.<br>
**2.** Refuse the position, staying true to your principles: Increases mage score.<br>
**3.** Accept the position with the intent to undermine it from within: Increases thief score.<br>

**_Question 4_**:
You discover a hidden door in the basement of an old inn. Behind it lies either great treasure or a terrible curse. What do you do?<br><br>

**1.** Break it open and face whatever comes, believing in your strength: Increases warrior score.<br>
**2.** Search for a key or mechanism to unlock it safely: Increases mage score.<br>
**3.** Leave it alone and inform the innkeeper, respecting the unknown: Increases thief score.<br>

This ultimately culminates in the players'score being counted up and that score is then reflected on an ending scene being **Warrior**, **Thief**, and/or **Mage** (_respectively_).

```
// Class-selection Logic
  let classResult;
  if (scores.warrior === highestScore) {
    classResult = 'warrior';
  } else if (scores.mage === highestScore) {
    classResult = 'mage';
  } else {
    classResult = 'thief';
  }

  const { text, desc } = classInfo[classResult];

  // Debugger to check if scores is holding
  console.log(scores);
  storyElement.innerHTML += `<br><br><strong>${text}</strong><br><br>
  ${desc}`;
```

#### The little function that could

And here is how my function that is responsible for picking, and displaying, my scenes in the app works, because it's literally only ever had to reformatted _ONCE_:

```
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
    const nextScene = scene.options[choiceText];
    const button = createButton(choiceText, nextScene, scene.action);
    choicesElement.appendChild(button);
  });
}
```

My function starts by using the _sceneKey_ to retrieve the corresponding scene object from the _scenes_ object.

```
const scene = scenes[sceneKey];
```

Then, my _storyElement_ is updated with the text property of the current scene. This updates the main narrative area of the game with the current scene's story text.

```
storyElement.innerHTML = scene.text;
```

If the _sceneKey_ is _'results'_, the function calls _determineClass()_, and this function calculates and displays the player's class based on their scores.

```
if (sceneKey === 'results') {
  determineClass();
}
```

Next _choicesElement_ is cleared of any previous choices to ensure that only the choices relevant to the current scene are displayed.

```
choicesElement.innerHTML = '';
```

Finally, and most **importantly**, my function interates over each key in the _options_ object of the current scene, and each key represents a choice text that the player can select

For each choice, my _nextScene_ is determined from the options object using the choice text as the key.

Then, a button is created using the _createButton_ function, passing the choice text, next scene, and any action associated with the current scene (_if an action is present_) and then the button is appended to the _choicesElement_, making it visible to the player.
