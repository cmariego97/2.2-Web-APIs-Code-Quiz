// HTML section elements //
var welcomeDiv = document.getElementById("welcome");

// quiz section elements
var quizDiv = document.getElementById("quiz");
var questionEl = document.getElementById("question");
var choicesDiv = document.getElementById("choices");
var answerButtonEl = document.querySelectorAll("button.answerButton");
var answerEl = document.getElementById("answer");
var checkAnsEl = document.getElementById("checkAns");

// quiz end section elements
var gameoverDiv = document.getElementById("gameover");
var scoreEl = document.getElementById("result");
var inputIntialsEl = document.getElementById("initials");

var highscoresDiv = document.getElementById("highscores");
var highscoresEl = document.getElementById("scores");

// HTML button elements //
var scoreBtn = document.getElementById("viewscores");
var startBtn = document.getElementById("start");
var submitBtn = document.getElementById("submit");
var resetBtn = document.getElementById("reset");
var clearBtn = document.getElementById("clear");
var btnA = document.getElementById("0");
var btnB = document.getElementById("1");
var btnC = document.getElementById("2");
var btnD = document.getElementById("3");

// Other Variable Elements //
var quizTimer = document.getElementById("timer");
var secondsLeft = 60;
var timerInterval;
// how many answers have been answered
var questionCount = 0;
// var finalQindex = quizQs.length;
var currentQindex = 0;
var correct;
var score = 0;

// quiz questions array //
var quizQs = [
    { // Q#1
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["A. <javascript>", "B. <scripting>", "C. <script>", "D. <js>"],
        correctAnswer: choices[2],
    },
    { // Q#2
        question: "Commonly used data types do NOT include:",
        choices: ["A. booleans", "B. alerts", "C. strings", "D. numbers"],
        correctAnswer: choices[0],
    },
    { // Q#3
      question: "Where is the correct place to insert a javascript in HTML?",
      choices: ["A. The <body> section", "B. Either the <head> and <body> sections", "C. The <head> section", "D. The <scripts> section"],
      correctAnswer: choices[0],
    }
];

// function - timer
function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        quizTimer.textContent = "Time Left: " + secondsLeft;

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            quizDiv.style.display = "none";
            gameoverDiv.style.display = "block";
            showResults();
        }
    }, 1000);
}

// function - start quiz w/ timer and cycle questions
function startQuiz() {
    welcomeDiv.style.display = "none";
    quizDiv.style.display = "block";
    questionCount = 0;
    setTime();
    setQuiz(0);
};

// function - generate quiz questions
function setQuiz(id) {
    if (id < quizQs.length) {
        questionEl.textContent = quizQs[id].question;
        btnA.textContent = quizQs[id].choices[0];
        btnB.textContent = quizQs[id].choices[1];
        btnC.textContent = quizQs[id].choices[2];
        btnD.textContent = quizQs[id].choices[3];
    }
}

// function - user chose option
function checkAnswer(answer) {

    // user selected choice
    var userChoice = answer;
    var correctAnswer = quizQs[questionCount].correctAnswer;

    // answer check message - append
    checkAnsEl.style.display = "block";
    var p = document.createElement("p");
    checkAnsEl.appendChild(p);

    // if user's choice is === correct Answer
    if (userChoice === correctAnswer) {
        userScore += 1;
        p.textContent = "Yay! You got that right! \\^0^//";
    } else if (userChoice !== correctAnswer) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Uh oh! That was wrong!!! >w<";
    }

    // check message time out
    setTimeout(function() {
        p.style.display = "none";
    }, 1000)
}

// function - show results
function showResults () {
    quizDiv.style.display = "none";
    gameoverDiv.style.display = "block";
}

// function - submit/add score
function submitScore(event) {
    event.preventDefault();    
}

// function - view highscores
function viewScores() {
    welcomeDiv.style.display = "none";
    quizDiv.style.display = "none";
    gameoverDiv.style.display = "none";
    highscoresDiv.style.display = "block";
    var storedScoreList = JSON.parse(localStorage.getItem("scoreList"))
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

// function - reset or play again
function playAgain() {
    highscoresDiv.style.display = "none";
    welcomeDiv.style.display = "block";
    quizTimer.textContent = "Time Left: 60s";
}

// function - clear scores
function clearScores() {
    localStorage.clear();   
}

// event listener - start //
startBtn.addEventListener("click", startQuiz);

// event listenter - answer button + check answer //
answerButtonEl.forEach(item => {
    item.addEventListener("click", checkAnswer);
});

// event listener - submit/add score //
submitBtn.addEventListener("click", submitScore)

// event listener - view highscores //
scoreBtn.addEventListener("click", viewScores);

// event listener - reset or play again
resetBtn.addEventListener("click", playAgain);

// event listener = clear scores
clearBtn.addEventListener("click", clearScores);
