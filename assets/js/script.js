//get all divs and store into variables
var questionBox = document.querySelector(".questionBox");
//var choicesBox = document.querySelector(".choicesBox");
var startButtonEl = document.querySelector(".start");
var feedback = document.querySelector(".feedback");
var introsection = document.querySelector(".intro");
var choicebtn;

//prepare question List
var questionList = [
    {
        question: "What is javascript?",
        choices: ["aa1", "bb1", "cc1"],
        answer: "aa1",
        feedback: ["Correct", "Wrong"]

    },
    {
        question: "What is javascript?",
        choices: ["aa2", "bb2", "cc2"],
        answer: "aa2",
        feedback: ["Correct", "Wrong"]
    },
    {
        question: "What is javascript?",
        choices: ["aa3", "bb3", "cc3"],
        answer: "aa3",
        feedback: ["Correct", "Wrong"]
    },
    {
        question: "What is javascript?",
        choices: ["aa4", "bb4", "cc4"],
        answer: "aa4",
        feedback: ["Correct", "Wrong"]
    },
];

//add event listener on the button
startButtonEl.addEventListener('click',  displayQuestion)

//choicebtn.addEventListener("click", getValue);
choicebtn = document.querySelector(".choiceButton");
console.log(choicebtn)

  function getValue() { 
   console.log(this.val())
   };



//function to display question
function displayQuestion() {
  var question = questionList[0].question;
  var questionEl = document.createElement("p");
  questionEl.innerHTML = question;
  questionBox.appendChild(questionEl);
  var choices = questionList[0].choices;
  choices.forEach(function(choice){
   var choiceButton = document.createElement("button");
   choiceButton.innerHTML = choice;
   choiceButton.setAttribute("class", "choiceButton");
   questionBox.appendChild(choiceButton);
  })
}

function validateAnswer(question){
//check if answer is correct
if(ans === question["answer"]){
feedback.innerHTML = question["feedback"][0];
} 
else {
    feedback.innerHTML = question["feedback"][0];
}

}


