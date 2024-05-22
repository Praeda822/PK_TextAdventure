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
You find a book of forbidden knowledge that promises immense power but warns of dire consequences. What do you do?
**1**. Read the book, embracing the risk for the pursuit of knowledge: Increases mage score.
**2**. Burn the book, removing the temptation and protecting others: Increases warrior score.
**3**. Hide the book, saving it for when you might need its power: Increases thief score.

**_Question 3_**:
You are offered a position of great power and influence, but accepting it means compromising your most cherished principles. What do you do?
**1.** Accept the position, believing you can do more good from within: Increases warrior and mage scores.
**2.** Refuse the position, staying true to your principles: Increases mage score.
**3.** Accept the position with the intent to undermine it from within: Increases thief score.

**_Question 4_**:
You discover a hidden door in the basement of an old inn. Behind it lies either great treasure or a terrible curse. What do you do?

**1.** Break it open and face whatever comes, believing in your strength: Increases warrior score.
**2.** Search for a key or mechanism to unlock it safely: Increases mage score.
**3.** Leave it alone and inform the innkeeper, respecting the unknown: Increases thief score.

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
