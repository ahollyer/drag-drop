// TODO: Make animals move around
// TODO: Add basic store functionality
// TODO: Add a discovered: false flag to animals so we can display a popup the first time
// TODO: Finish tutorial
// TODO: Consider breaking up functions further

/****************************************************
  Set up game variables
****************************************************/
const GAMEBOARD = document.getElementById("gameboard");
const SCOREBOARD = document.getElementById("scoreboard");
// The user begins the game with 3 giraffes, a 10-animal
// limit, and a new animal every 5 seconds.
var animalCounter = 3;
var maxAnimals = 10;
var makeAnimalInterval = 5000;
var score = 0;

/****************************************************
  Track the user's score
****************************************************/
function updateScore(pts, span) {
  score += pts;
  // Update scoreboard at top of screen
  SCOREBOARD.innerText = score;
  // In span, flash points earned with CSS animation
  span.classList.add("fade-in-out");
  span.textContent = `+$${pts}`;
}

/****************************************************
  Populate the game with more animals over time
****************************************************/
function makeAnimal(animalType) {
  // Create the animal img
  var newAnimalImg = document.createElement("img");
  newAnimalImg.setAttribute("src", `img/${animalType}.png`);
  // Create a span to show points earned
  var span = document.createElement("span");
  span.classList.add("fade-in-out", "is-paused");
  // Create a draggable div container
  var newAnimal = document.createElement("div");
  newAnimal.classList.add("draggable", animalType);
  // Append span & img to the draggable div
  newAnimal.appendChild(span);
  newAnimal.appendChild(newAnimalImg);
  return newAnimal;
}

// Add a new animal every interval until maxAnimals count is reached
function startPopulating() {
  setInterval(function() {
    if(animalCounter < maxAnimals) {
      GAMEBOARD.appendChild(makeAnimal("animal_giraffe"));
      animalCounter++;
    }
  }, makeAnimalInterval);
}
// TODO: Run this only once the tutorial window is closed.
startPopulating();

/****************************************************
  Move animals randomly around the gameboard
****************************************************/
// TODO: Trap animals into bounding box
var bobbleAnimal = document.getElementsByClassName(".bobble");

function setProperty(tx, ty, tz) {
  bobbleAnimal.style.transform = `translate3d(${tx}px, ${ty}px, ${tz}px)`;
}

function changeTranslateValues() {
  // Random number from -100 to 100
  var x = Math.floor(Math.random() * 201) - 100;
  var y = Math.floor(Math.random() * 201) - 100;
  var z = Math.floor(Math.random() * 201) - 100;
  setProperty(x, y, z);
}

// setInterval(changeTranslateValues, 500);

/****************************************************
  Make animals draggable - uses Interact.js
****************************************************/
interact('.draggable').draggable({
    // Enable inertial throwing
    inertia: true,
    // Keep animals within their parental div (#gameboard)
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    autoScroll: true,
    onmove: dragMoveListener,
});

function dragMoveListener(event) {
  var target = event.target;
  // Store the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
  // Translate the element
  target.style.webkitTransform =
  target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';
  // Update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

/****************************************************
  Make animals droppable - uses Interact.js
****************************************************/
// Require a 20% element overlap for animals to combine
const OVERLAP_AMOUNT = 0.2;
// TODO: Create a more concise solution than defining event
// handlers for each type of animal separately.
interact('.animal_giraffe').dropzone({
  // only accept elements matching this CSS selector
  accept: '.animal_giraffe',
  overlap: OVERLAP_AMOUNT,
  ondrop: function (event) {
    // Remove dropzone element
    removeAnimal(event.relatedTarget);
    // Evolve dropped element
    evolveAnimal(event.target);
  },
});

interact('.animal_penguin').dropzone({
  accept: '.animal_penguin',
  overlap: OVERLAP_AMOUNT,
  ondrop: function (event) {
    removeAnimal(event.relatedTarget);
    evolveAnimal(event.target);
  },
});

interact('.animal_bear').dropzone({
  accept: '.animal_bear',
  overlap: OVERLAP_AMOUNT,
  ondrop: function (event) {
    removeAnimal(event.relatedTarget);
    evolveAnimal(event.target);
  },
});

interact('.animal_crocodile').dropzone({
  accept: '.animal_crocodile',
  overlap: OVERLAP_AMOUNT,
  ondrop: function (event) {
    removeAnimal(event.relatedTarget);
    evolveAnimal(event.target);
  },
});

/****************************************************
  Allow animals to be removed and evolved
****************************************************/
function removeAnimal(animalDiv) {
  animalDiv.parentNode.removeChild(animalDiv);
  animalCounter--;
}

function evolveAnimal(animalDiv) {
  animalDiv.classList.forEach(c => {
    if(c.includes("animal")) {
      // Get animal object from classname in animal div
      var animalToEvolve = ANIMALS[c];
      // Change div class & img src to next evolutionary animal
      animalDiv.classList.replace(c, animalToEvolve.evolvesTo)
      animalDiv.lastElementChild.setAttribute("src", `img/${animalToEvolve.evolvesTo}.png`)
      // Reset point display span & update score
      var oldSpan = animalDiv.firstElementChild;
      var newSpan = document.createElement("span");
      animalDiv.replaceChild(newSpan, oldSpan);
      updateScore(animalToEvolve.pts, newSpan);
    }
  });
}

/****************************************************
  Tutorial at start of game
****************************************************/
var tutorialStep = 0;
var instruction = document.getElementById('tutorial-instruction');
var dismissButton = document.getElementById('tutorial-dismiss');

function updateTutorial() {
  tutorialStep++;
  switch(tutorialStep) {
    case 1:
      var arrow = document.querySelector(".tutorial-arrow");
      arrow.parentNode.removeChild(arrow);
      instruction.innerText = "Great! Match animals to make new critters (and earn money).";
      dismissButton.style.display = "inline-block";
      break;
    default:
      instruction.innerText = "Animal Fuser";
  }
}

function removeTutorialAnimal(animalDiv) {
  animalDiv.parentNode.removeChild(animalDiv);
}

function evolveTutorialAnimal(animalDiv) {
  animalDiv.classList.forEach(c => {
    if(c.includes("tutorial")) {
      // Get animal object from classname in animal div
      var animalToEvolve = TUTORIAL_ANIMALS[c];
      // Change div class & img src to next evolutionary animal
      animalDiv.classList.replace(c, animalToEvolve.evolvesTo)
      var evolvesToImg = animalToEvolve.evolvesTo.replace('tutorial', 'animal');
      console.log('evolvesToImg', evolvesToImg);
      animalDiv.lastElementChild.setAttribute("src", `img/${evolvesToImg}.png`)
      // Reset point display span & update score
      var oldSpan = animalDiv.firstElementChild;
      var newSpan = document.createElement("span");
      animalDiv.replaceChild(newSpan, oldSpan);
      // Even though it's just the tutorial, we'll let the user
      // earn points for fusing the tutorial animals
      updateScore(animalToEvolve.pts, newSpan);
    }
  });
}

interact('.tutorial_giraffe').dropzone({
  accept: '.tutorial_giraffe',
  overlap: OVERLAP_AMOUNT,
  ondrop: function (event) {
    removeTutorialAnimal(event.relatedTarget);
    evolveTutorialAnimal(event.target);
    updateTutorial();
  },
});
