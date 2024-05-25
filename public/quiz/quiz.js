  
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAbZTj7J4QVWSCcGU48njI10bRxR8xPln8",
    authDomain: "quizwithdatabase.firebaseapp.com",
    databaseURL: "https://quizwithdatabase-default-rtdb.firebaseio.com",
    projectId: "quizwithdatabase",
    storageBucket: "quizwithdatabase.appspot.com",
    messagingSenderId: "764167018894",
    appId: "1:764167018894:web:cb418d5acca3c68cfd6cdf"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig)

var islamicQuestions = [
    {
        question: "Who was the first prophet in Islam?",
        option1: "Adam (AS)",
        option2: "Noah (AS)",
        option3: "Muhammad (SAW)",
        correctAns: "Muhammad (SAW)"
    },
    {
        question: "What is the first pillar of Islam?",
        option1: "Salah (Prayer)",
        option2: "Shahada (Faith)",
        option3: "Zakat (Charity)",
        correctAns: "Shahada (Faith)"
    },
    {
        question: "What is the name of the angel who brought revelations to Prophet Muhammad (SAW)?",
        option1: "Jibreel (Gabriel)",
        option2: "Israfeel",
        option3: "Mikaeel (Michael)",
        correctAns: "Jibreel (Gabriel)"
    },
    {
        question: "In which month do Muslims fast during Ramadan?",
        option1: "Rabi' al-Thani",
        option2: "Sha'ban",
        option3: "Ramadan",
        correctAns: "Ramadan"
    },
    {
        question: "What is the name of the Islamic pilgrimage to Mecca?",
        option1: "Hajj",
        option2: "Umrah",
        option3: "Ziyarat",
        correctAns: "Hajj"
    },
    {
        question: "What is the name of the Islamic holy book?",
        option1: "Bible",
        option2: "Torah",
        option3: "Quran",
        correctAns: "Quran"
    },
    {
        question: "What is the meaning of the Arabic word 'Islam'?",
        option1: "Peace",
        option2: "Submission",
        option3: "Faith",
        correctAns: "Submission"
    },
    {
        question: "Who was the wife of Prophet Muhammad (SAW) known as 'Mother of the Believers'?",
        option1: "Aisha (RA)",
        option2: "Khadijah (RA)",
        option3: "Safiyyah (RA)",
        correctAns: "Khadijah (RA)"
    },
    {
        question: "Which city is considered the holiest city in Islam?",
        option1: "Madinah",
        option2: "Jerusalem",
        option3: "Mecca",
        correctAns: "Mecca"
    },
    {
        question: "What is the Arabic term for the pilgrimage to Mecca that Muslims are required to make at least once in their lifetime?",
        option1: "Sawm",
        option2: "Salat",
        option3: "Hajj",
        correctAns: "Hajj"
    }
];

var ques = document.getElementById('ques')
var option1 = document.getElementById('option1')
var option2 = document.getElementById('option2')
var option3 = document.getElementById('option3')
var btn = document.getElementById('btn')
var timer = document.getElementById('time')
var index = 0
var score = 0
var min = 1
var sec = 59
var interval;

  
function startTimer() {
    clearInterval(interval);
    interval = setInterval(function() {
        timer.innerHTML = `${min}:${sec < 10 ? '0' + sec : sec}`;
        sec--;
        if (sec < 0) {
            min--;
            sec = 59;
            if (min < 0) {
                clearInterval(interval);
                nextQuestion();
            }
        }
    }, 1000);
}

function nextQuestion() {
    var getOptions = document.getElementsByName("option");
    for (var i = 0; i < getOptions.length; i++) {
        if (getOptions[i].checked) {
            var selectedValue = getOptions[i].value;
            var selectedAns = islamicQuestions[index - 1]["option" + selectedValue];
            var correctAnswer = islamicQuestions[index - 1]["correctAns"];
            console.log( `SelectedValue: ${selectedValue}, SelectAnswer: ${selectedAns}, CorrectAnswer: ${correctAnswer}`)
            if (selectedAns == correctAnswer) {
                score++;
            }
        }
        getOptions[i].checked = false;
    }
    btn.disabled = true;

    if (index >= islamicQuestions.length) {
        var percentage = (score / islamicQuestions.length) * 100;
        var message = "Your percentage is: " + percentage.toFixed(2) + "%";
        if (percentage >= 80) {
            message = "Good job! " + message;
        } 
        else if (percentage >= 40) {
            message = "Not bad! " + message;
        } 
        else {
            message = "Sorry, you failed! " + message;
        }


        var key = Date.now().toString(15)

        var result = {
            id:key,
            score: score,
            percentage: percentage,
            message: message
        };

       firebase.database().ref("result/").set(result)

        Swal.fire({
            title: message,
            icon: "info"
        });
      
    } 
    else {
        startTimer();
        ques.innerText = islamicQuestions[index].question;
        option1.innerText = islamicQuestions[index].option1;
        option2.innerText = islamicQuestions[index].option2;
        option3.innerText = islamicQuestions[index].option3;
        index++;
        min = 2;
        sec = 0;
    }
}

btn.onclick = nextQuestion;

// Start the timer initially
startTimer();

function target() {
    var btn = document.getElementById("btn");
    btn.disabled = false;
}
