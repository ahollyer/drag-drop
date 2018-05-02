/****************************************************
  The available animals & their attributes
****************************************************/
const ANIMALS = {
  animal_giraffe: {
    evolvesTo: "animal_penguin",
    pts: 100,
    discovered: true
  },
  animal_penguin: {
    evolvesTo: "animal_bear",
    pts: 150,
    discovered: false
  },
  animal_bear: {
    evolvesTo: "animal_crocodile",
    pts: 200,
    discovered: false
  },
  animal_crocodile: {
    evolvesTo: "animal_chicken",
    pts: 300,
    discovered: false
  },
};

const TUTORIAL_ANIMALS = {
  tutorial_giraffe: {
    evolvesTo: "tutorial_penguin",
    pts: 100,
    discovered: true
  },
  tutorial_penguin: {
    evolvesTo: "tutorial_penguin",
    pts: 100,
    discovered: true
  },
};
