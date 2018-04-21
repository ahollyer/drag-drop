/****************************************************
  Set up basic game variables
****************************************************/
var gameBox = document.getElementById("game-box");
// The user begins the game with 3 giraffes.
var animalCounter = 3;
// To start, the user is allowed up to 10 animals at a time.
var maxAnimals = 10;
// Initialize the score counter
var score = 0;
// Create a set of animals to evolve
var animals = {
  animal_giraffe: { evolvesTo: "animal_penguin", pts: 100 },
  animal_penguin: { evolvesTo: "animal_bear", pts: 150 },
  animal_bear: { evolvesTo: "animal_crocodile", pts: 200 },
  animal_crocodile: { evolvesTo: "animal_chicken", pts: 300 },
};

/****************************************************
  Populate the game with more animals over time
****************************************************/
function makeAnimal(animalType) {
  // Create the animal img
  var newAnimalImg = document.createElement("img");
  newAnimalImg.setAttribute("src", `img/${animalType}.png`);
  // Create a draggable div container
  var newAnimal = document.createElement("div");
  newAnimal.classList.add("draggable", animalType);
  // Append a span (to show points) & the animal img to the div
  newAnimal.appendChild(document.createElement("span"));
  newAnimal.appendChild(newAnimalImg);
  return newAnimal;
}

// Add a new animal every 5 seconds until maxAnimals count is reached
setInterval(function() {
  if(animalCounter < maxAnimals) {
    gameBox.appendChild(makeAnimal("animal_giraffe"));
    animalCounter += 1;
  }
}, 5000);

/****************************************************
  Make animals draggable - uses Interact.js
****************************************************/
interact('.draggable').draggable({
    // enable inertial throwing
    inertia: true,
    // keep the images within the area of the their parental div (#game-box)
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
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
  // translate the element
  target.style.webkitTransform =
  target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';
  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

// TODO: Find a more concise solution than defining event
// handlers for each type of animal separately.
/****************************************************
  Allow like animals to be combined - uses Interact.js
****************************************************/
interact('.animal_giraffe').dropzone({
  // only accept elements matching this CSS selector
  accept: '.animal_giraffe',
  // Require a 20% element overlap for a drop to be possible
  overlap: 0.2,
  ondrop: function (event) {
    // Remove dropzone element
    event.relatedTarget.parentNode.removeChild(event.relatedTarget);
    // Change dropped element class and img attributes
    event.target.classList.forEach(c => {
      if(c.includes('animal')) {
        var animal = animals[c];
        event.target.classList.replace(c, animal.evolvesTo)
        event.target.lastElementChild.setAttribute("src", `img/${animal.evolvesTo}.png`)
        var textEl = event.target.querySelector('span');
        textEl.textContent = animal.pts;
        animalCounter -= 1;
        score += animal.pts;
      }
    });
  },
});

interact('.animal_penguin').dropzone({
  // only accept elements matching this CSS selector
  accept: '.animal_penguin',
  // Require a 20% element overlap for a drop to be possible
  overlap: 0.2,
  ondrop: function (event) {
    // Remove dropzone element
    event.relatedTarget.parentNode.removeChild(event.relatedTarget);
    // Change dropped element class and img attributes
    event.target.classList.forEach(c => {
      if(c.includes('animal')) {
        var animal = animals[c];
        event.target.classList.replace(c, animal.evolvesTo)
        event.target.lastElementChild.setAttribute("src", `img/${animal.evolvesTo}.png`)
        var textEl = event.target.querySelector('span');
        textEl.textContent = animal.pts;
        animalCounter -= 1;
        score += animal.pts;
      }
    });
  },
});

interact('.animal_bear').dropzone({
  // only accept elements matching this CSS selector
  accept: '.animal_bear',
  // Require a 20% element overlap for a drop to be possible
  overlap: 0.2,
  ondrop: function (event) {
    // Remove dropzone element
    event.relatedTarget.parentNode.removeChild(event.relatedTarget);
    // Change dropped element class and img attributes
    event.target.classList.forEach(c => {
      if(c.includes('animal')) {
        var animal = animals[c];
        event.target.classList.replace(c, animal.evolvesTo)
        event.target.lastElementChild.setAttribute("src", `img/${animal.evolvesTo}.png`)
        var textEl = event.target.querySelector('span');
        textEl.textContent = animal.pts;
        animalCounter -= 1;
        score += animal.pts;
      }
    });
  },
});

interact('.animal_crocodile').dropzone({
  // only accept elements matching this CSS selector
  accept: '.animal_crocodile',
  // Require a 20% element overlap for a drop to be possible
  overlap: 0.2,
  ondrop: function (event) {
    // Remove dropzone element
    event.relatedTarget.parentNode.removeChild(event.relatedTarget);
    // Change dropped element class and img attributes
    event.target.classList.forEach(c => {
      if(c.includes('animal')) {
        var animal = animals[c];
        event.target.classList.replace(c, animal.evolvesTo)
        event.target.lastElementChild.setAttribute("src", `img/${animal.evolvesTo}.png`)
        var textEl = event.target.querySelector('span');
        textEl.textContent = animal.pts;
        animalCounter -= 1;
        score += animal.pts;
      }
    });
  },
});
