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
var initials = document.querySelector("#initials").value;
var currentIndex = 0;
var question;
var numCorrect = 0;
var scores = [];
var secondsLeft = 100;
var timerInterval;
var tabless = document.querySelector("#scoresTable");
var anchor = document.querySelector("a");




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

//Function to display question and dynamically add choice buttons

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

//Validates the user selected entry against the correct answer and returns feedback

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
//Shows result screen with score of the user
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

// Save user intial against their score in the local storage.

function saveUserAndScore(){
  var userInitial = document.querySelector("#initials").value;
  if (localStorage.getItem("scoreChart")) {
      var getScores = JSON.parse(localStorage.getItem("scoreChart")); //returns array
      scoreInitial = {
        initial: userInitial,
        score: numCorrect
      }
      getScores.push(scoreInitial)
      localStorage.setItem("scoreChart", JSON.stringify(getScores));
  }
  else{
    var getScores = [];
    scoreInitial = {
      initial: userInitial,
      score: numCorrect
     }
     getScores.push(scoreInitial);
    localStorage.setItem("scoreChart", JSON.stringify(getScores));
  }
}

function displayUserAndScore(){
  resultsBox.textContent = "";
  var fetchUserScores = JSON.parse(localStorage.getItem("scoreChart"))
  var scoresTable =  document.querySelector("#scoresTable");
  scoresTable.removeAttribute("class");
  for(var i = 0; i < fetchUserScores.length; i ++ ){
    var row = scoresTable.insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell1.innerHTML = fetchUserScores[i].initial;
  cell2.innerHTML = fetchUserScores[i].score;
  }

}

//Shows high scores in table with initials
function showHighScores(){
  saveUserAndScore();
  displayUserAndScore();
}

submitEl.addEventListener("click", function () {
  showHighScores();
});

function showAllScores(){
  timeEl.textContent = "";
  resultsBox.textContent = "";
  questionBox.textContent = "";
  choicesBox.textContent = "";
  feedback.textContent = "";
  displayUserAndScore();
}
