//select all divs and store into variables
var questionBox = document.querySelector(".questionBox");
var choicesBox = document.querySelector(".choicesBox");
var startButtonEl = document.querySelector(".start");
var feedback = document.querySelector(".feedback");
var resultsBox = document.querySelector("#results");
var timeEl = document.querySelector(".time");
var questionEl = document.createElement("p");
var intro = document.querySelector(".intro");
var submitEl = document.querySelector("#submit");
var resMsg = document.querySelector("#res");
var initials = document.querySelector("#initials");
var currentIndex = 0;
var question;
var numCorrect = 0;
var scores = [];
var secondsLeft = 60;
var timerInterval;


//Prepare question List

var questionList = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["<scripting>", "<javascript>", "<js>", "<script>"],
    answer: "<script>",
    feedback: ["That's Right!", "Nope Wrong!"],
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    choices: ["body", "head", "both body and head", "none"],
    answer: "both body and head",
    feedback: ["That's Right!", "Nope Wrong!"],
  },
  {
    question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choices: ["<script name='xxx.js'>", "<script href='xxx.js'>", "<script src='xxx.js'>", "none"],
    answer: "<script name='xxx.js'>",
    feedback: ["That's Right!", "Nope Wrong!"],
  },
  {
    question: "The external JavaScript file must contain the script tag.",
    choices: ["True", "False"],
    answer: "False",
    feedback: ["That's Right!", "Nope Wrong!"],
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    choices: ["alertBox('Hello World')", "msg('Hello World')", "alert('Hello World')", "msgBox('Hello World')"],
    answer: "alert('Hello World')",
    feedback: ["That's Right!", "Nope Wrong!"],
  },
];

//Event Handler for start button

startButtonEl.addEventListener("click", function () {
  startButtonEl.setAttribute("class", "hide");
  timerInterval = setInterval(function () {
  secondsLeft--;
  timeEl.setAttribute("class", "topright");
  timeEl.textContent = "Time: " + secondsLeft;

  if (secondsLeft != 0) {
      displayQuestion();
  } else {
      clearInterval(timerInterval);
      sendMessage();
    }
  }, 500);
});

//Function to display question 
function displayQuestion() {
  choicesBox.textContent = "";
  question = questionList[currentIndex].question;
  questionEl.innerHTML = question;
  questionBox.appendChild(questionEl);
  var choices = questionList[currentIndex].choices;
  choices.forEach(function (choice) {
    var choiceButton = document.createElement("button");
    choiceButton.textContent = choice;
    choicesBox.appendChild(choiceButton);
    choiceButton.setAttribute("class", "show");
    choiceButton.addEventListener("click", validate);
  });
}

//Validates the user selected entry
function validate() {
  if (this.textContent === questionList[currentIndex]["answer"]) {
    feedback.setAttribute("class", "showText");
    feedback.textContent = questionList[currentIndex]["feedback"][0];
    numCorrect++;
  } 
  else {
    feedback.setAttribute("class", "showText");
    feedback.textContent = questionList[currentIndex]["feedback"][1];
  }
  setTimeout(function () {
    feedback.textContent = "";
    feedback.setAttribute("class", "hide");
  }, 800);
  checkToProceed();
}
//Checks limits of question list to proceed
function checkToProceed() {
  if (currentIndex != questionList.length - 1) {
    currentIndex++;
    displayQuestion();
  } 
  else {
    showResult();
    clearInterval(timerInterval)
    timeEl.textContent = "";
    showHighestScore();
  }
}
//Shows result screen
function showResult() {
  resMsg.innerHTML = "Your score is " + numCorrect + "/" + questionList.length;
  resultsBox.removeAttribute("class");
  questionBox.setAttribute("class", "hide");
  choicesBox.setAttribute("class", "hide");
  intro.setAttribute("class", "hide");
}

//Show Highest scores
function showHighestScore() {
  if (localStorage.getItem("score")) {
    var getScores = JSON.parse(localStorage.getItem("score"));
    console.log(Math.max(...getScores));
    resultsBox.textContent = Math.max(...getScores);
  }
}

//Sends message in the event of a timeout
function sendMessage() {
  timeEl.textContent = " Time Over!! "; 
  resultsBox.textContent = "";
  questionBox.textContent = "";
  choicesBox.textContent = "";
  feedback.textContent = "";
}

//Shows high scores in table with initials
function showHighScores(){
 // console.log(localStorage.getItem("scoreChart") + "local storage");
 localStorage.setItem("obj1", JSON.stringify({sdfd:"sdfd"})); 
 var obj1 = JSON.parse(localStorage.getItem("obj1"));
 console.log(JSON.stringify(obj1));
 //var testVar3 = JSON.parse(localStorage.getItem("scoreChart"));
 
 //console.log(testVar3);
if (localStorage.getItem("scoreChart")) {
   console.log("if here");
  // console.log(JSON.parse(localStorage.getItem("scoreChart")));
  //   var getScores = JSON.parse(localStorage.getItem("scoreChart")); //array
  //   console.log(initials.innerHTML);
  //   scoreInitial = {
  //     initial: "",
  //     score: numCorrect
  //   }
  //   getScores.push(scoreInitial)
  //  // getScores.push(numCorrect);
  //   localStorage.setItem("scoreChart", JSON.stringify(getScores));
}
else{
   console.log("inside else");
  var getScores = [];
  scoreInitial = {
    initial: "hi",
    score: numCorrect
   }
   getScores.push(scoreInitial);
   console.log(JSON.stringify(getScores));
  localStorage.setItem("scoreChart", JSON.stringify(getScores));
}
}

submitEl.addEventListener("click", function () {
  showHighScores();
});
