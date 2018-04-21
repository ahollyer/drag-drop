/****************************************************
  The available animals & their attributes
****************************************************/
const ANIMALS = {
  animal_giraffe: {
    evolvesTo: "animal_penguin",
    pts: 100
  },
  animal_penguin: {
    evolvesTo: "animal_bear",
    pts: 150
  },
  animal_bear: {
    evolvesTo: "animal_crocodile",
    pts: 200
  },
  animal_crocodile: {
    evolvesTo: "animal_chicken",
    pts: 300
  },
};
