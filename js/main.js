// TODO: Make animals move around
// TODO: Add basic store functionality
// TODO:

/****************************************************
  Set up game variables
****************************************************/
var gameBox = document.getElementById("game-box");
var scoreBoard = document.getElementById("scoreboard");
// The user begins the game with 3 giraffes (see index.html)
var animalCounter = 3;
// To start, the user is allowed up to 10 animals at a time
var maxAnimals = 10;
// Initialize the score counter
var score = 0;

/****************************************************
  Track the user's score
****************************************************/
function updateScore(pts, span) {
  score += pts;
  // Update scoreboard at top of screen
  scoreBoard.innerText = score;
  // Flash points earned with CSS animation (see main.css)
  span.classList.add("fade-in-out")
  span.textContent = `+${pts}`;
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

// Add a new animal every 5 seconds until maxAnimals count is reached
setInterval(function() {
  if(animalCounter < maxAnimals) {
    gameBox.appendChild(makeAnimal("animal_giraffe"));
    animalCounter++;
  }
}, 5000);

/****************************************************
  Make animals draggable - uses Interact.js
****************************************************/
interact('.draggable').draggable({
    // Enable inertial throwing
    inertia: true,
    // Keep animals within their parental div (#game-box)
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
    if(c.includes('animal')) {
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
