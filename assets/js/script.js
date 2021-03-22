//get all divs and store into variables
var questionBox = document.querySelector(".questionBox");
var choicesBox = document.querySelector(".choicesBox");
var startButtonEl = document.querySelector(".start");
var feedback = document.querySelector(".feedback");
var introsection = document.querySelector(".intro");
var resultsBox = document.querySelector("#results");
var choicebtn;
var currentIndex = 0;
var question;
var questionEl = document.createElement("p");
var numCorrect = 0;
var numWrong = 0;
var scores = [];

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
    startButtonEl.setAttribute("class", "hide")
    displayQuestion();
})





//function to display question
function displayQuestion() {
  choicesBox.textContent = "";
  //feedback.textContent = "";
  question = questionList[currentIndex].question;
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
    if(this.textContent === questionList[currentIndex]["answer"]){
     feedback.textContent = questionList[currentIndex]["feedback"][0];
     numCorrect ++;
    }
    else{
     feedback.textContent = questionList[currentIndex]["feedback"][1];
     numWrong;
    }
    setTimeout(function(){
        feedback.textContent = "";
    }, 800);
    checkToProceed();
}

function checkToProceed(){
    if(currentIndex != questionList.length-1){
        currentIndex++;
        displayQuestion();
      }
      else {
          
          showResult();
          showHighestScore();
          
      }
}

function showResult(){
    if(localStorage.getItem("score")){
        var getScores = JSON.parse(localStorage.getItem("score"));
        getScores.push(numCorrect);
        localStorage.setItem("score", JSON.stringify(getScores))
    }
    resultsBox.removeAttribute("class")
    resultsBox.textContent = "You won!! Score is " + numCorrect + "/" + questionList.length;
    questionBox.setAttribute("class", "hide");
    choicesBox.setAttribute("class", "hide");
}

function showHighestScore(){
    if(localStorage.getItem("score")){
        var getScores = JSON.parse(localStorage.getItem("score"));
        console.log(Math.max(...getScores))
    resultsBox.textContent = Math.max(...getScores)
        
    }
    }




