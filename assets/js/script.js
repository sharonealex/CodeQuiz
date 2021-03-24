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


var currentIndex = 0;
var question;
var numCorrect = 0;
var scores = [];
var secondsLeft = 60;
var timerInterval;

//prepare question List
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

//function to display question
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

function checkToProceed() {
  if (currentIndex != questionList.length - 1) {
    currentIndex++;
    displayQuestion();
  } 
  else {
    showResult();
    clearInterval(timerInterval)
    timeEl.textContent = "";
    //showHighestScore();
  }
}

function showResult() {
   //resultsBox.textContent =
  // if (localStorage.getItem("score")) {
  //   var getScores = JSON.parse(localStorage.getItem("score"));
  //   getScores.push(numCorrect);
  //   localStorage.setItem("score", JSON.stringify(getScores));
  // }

  resMsg.innerHTML = "Your score is " + numCorrect + "/" + questionList.length;
  resultsBox.removeAttribute("class");
 
   // "You won!! Score is " + numCorrect + "/" + questionList.length;
  questionBox.setAttribute("class", "hide");
  choicesBox.setAttribute("class", "hide");
  intro.setAttribute("class", "hide");
}

function showHighestScore() {
  if (localStorage.getItem("score")) {
    var getScores = JSON.parse(localStorage.getItem("score"));
    console.log(Math.max(...getScores));
    resultsBox.textContent = Math.max(...getScores);
  }
}

function sendMessage() {
  timeEl.textContent = " Time Over "; 
  resultsBox.textContent = "";
  questionBox.textContent = "";
  choicesBox.textContent = "";
  feedback.textContent = "";
}

function showHighScores(){
if (localStorage.getItem("score")) {
    var getScores = JSON.parse(localStorage.getItem("score"));
    getScores.push(numCorrect);
    localStorage.setItem("score", JSON.stringify(getScores));
}
}

submitEl.addEventListener("click", function () {
  showHighScores();
});
