//get all divs and store into variables
var questionBox = document.querySelector(".questionBox");
var choicesBox = document.querySelector(".choicesBox");
var startButtonEl = document.querySelector(".start");
var feedback = document.querySelector(".feedback");
var introsection = document.querySelector(".intro");
var choicebtn;
var currentIndex = 0;

//prepare question List
var questionList = [
    {
        question: "What is javascript?",
        choices: ["aa1", "bb1", "cc1"],
        answer: "aa1",
        feedback: ["Correct", "Wrong"]

    },
    {
        question: "What is DOM traverse?",
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
startButtonEl.addEventListener('click',  function(){
    
    displayQuestion();
})





//function to display question
function displayQuestion() {

  var question = questionList[currentIndex].question;
  var questionEl = document.createElement("p");
  questionEl.innerHTML = question;
  questionBox.appendChild(questionEl);
  var choices = questionList[currentIndex].choices;
  choices.forEach(function(choice){
   var choiceButton = document.createElement("button");
   choiceButton.textContent = choice;
   choicesBox.appendChild(choiceButton);
   choiceButton.addEventListener('click', validate)
   
  })
}

function validate(){
    if(this.textContent === questionList[0]["answer"]){
     feedback.textContent = questionList[0]["feedback"][0];
     checkToProceed();
    }
    else{
     feedback.textContent = questionList[0]["feedback"][1];
     checkToProceed();
    }
}

function checkToProceed(){
    if(questionList[currentIndex] != questionList.length-1){
        currentIndex++;
        choiceButton.textContent = "";
        displayQuestion();
      }
      else {
          showResult();
      }
}

function showResult(){
    alert("you won");
}



