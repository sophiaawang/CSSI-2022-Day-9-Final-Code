console.log("script running");
let resultId;
let personalityTrait;
let questionsAnswered = 0;

// Access all the figures with the card-image class
let pictures = document.querySelectorAll(".card-image");

// Each property represents a question category in the quiz.
// Use the Inspector to find the category names, which are the
// start of every figure's ID in the HTML.
let categoryPersonalityTraits = {
  color: ["logical", "creative", "logical", "creative"],
  vacation: ["extrovert", "introvert", "extrovert", "introvert"],
  pizza: ["creative", "logical", "creative", "logical"],
  house: ["introvert", "extrovert", "introvert", "extrovert"],
  fruit: ["logical", "creative", "logical", "creative"],
  activity: ["extrovert", "introvert", "extrovert", "introvert"],
};

let personalityTraitPoints = {
  logical: 0,
  creative: 0,
  introvert: 0,
  extrovert: 0,
};

// Makes every image clickable.
pictures.forEach((picture) => {
  picture.addEventListener("click", (e) => {
    if(questionsAnswered === 6) return;
    let clickedChoice = picture.id.split("-");
    
      // Extract the question category and index from the clicked choice.
    let questionCategory = clickedChoice[0];
    let indexInCategory = clickedChoice[1];
    console.log(`Category: ${questionCategory} Index: ${indexInCategory}`);
    
      // change/toggle the background yellow.
    picture.classList.remove("has-background-light");
    picture.classList.add("has-background-warning");
    let row = document.querySelectorAll(`.${questionCategory}`);
    row.forEach((pic) =>{
      if (pic.id !== picture.id && pic.classList.contains("has-background-warning")){
        pic.classList.remove("has-background-warning");
        pic.classList.add("has-background-light");
        //decrement pic attribute
        personalityTraitPoints[personalityTrait] -= 1;
      }
    });
    
    
    // Obtain and increment the personality trait based on the clickedChoice.
    personalityTrait = categoryPersonalityTraits[questionCategory][indexInCategory];
    personalityTraitPoints[personalityTrait] += 1;
    
    // ENDING 
    if (questionCategory === 'activity') {
      
      if (personalityTraitPoints.logical > personalityTraitPoints.creative){
        resultId = "#logical-";
      } else {
        resultId = "#creative-";
      }
      
      if (personalityTraitPoints.extrovert > personalityTraitPoints.introvert){
        resultId += "extrovert";
      } else {
        resultId += "introvert";
      }
      
      let result = document.querySelector(resultId);
      result.classList.remove("hidden");
      document.querySelector("#footer").classList.remove("hidden");

      // disable buttons
      questionsAnswered = personalityTraitPoints.logical + personalityTraitPoints.creative + personalityTraitPoints.introvert + personalityTraitPoints.extrovert;
      
    } else {
      // unhiding next one
      let nextId = "#" + questionCategory + "Prev";
      console.log(nextId);
      let next = document.querySelector(nextId);
      next.classList.remove("hidden");
    }
  });
});

// Resetting Game
const retakeButton = document.querySelector("#retakeButton");
retakeButton.addEventListener("click", e=> {
  //rehide everything
  document.querySelector("#colorPrev").classList.add("hidden");
  document.querySelector("#vacationPrev").classList.add("hidden");
  document.querySelector("#pizzaPrev").classList.add("hidden");
  document.querySelector("#housePrev").classList.add("hidden");
  document.querySelector("#fruitPrev").classList.add("hidden");
  document.querySelector("#footer").classList.add("hidden");
  document.querySelector(resultId).classList.add("hidden");
  //reset stuff
  personalityTraitPoints = { logical: 0, creative: 0, introvert: 0, extrovert: 0 };
  personalityTrait;
  console.log(personalityTrait);
  questionsAnswered = 0;
  //turn choices white again
  pictures.forEach((pic) =>{
      pic.classList.remove("has-background-warning");
  });
});
