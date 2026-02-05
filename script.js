document.addEventListener("DOMContentLoaded", () => {
  // =============================
  // QUESTIONS (10 TOTAL)
  // =============================
  const questions = [
    {
      question: "What does HTML stand for?",
      answers: [
        { text: "Hyper Text Markup Language", correct: true },
        { text: "High Text Machine Language", correct: false },
        { text: "Hyperlinks Text Mark Language", correct: false },
        { text: "Home Tool Markup Language", correct: false }
      ]
    },
    {
      question: "Which language is used for styling web pages?",
      answers: [
        { text: "HTML", correct: false },
        { text: "JQuery", correct: false },
        { text: "CSS", correct: true },
        { text: "XML", correct: false }
      ]
    },
    {
      question: "Which is NOT a JavaScript data type?",
      answers: [
        { text: "Number", correct: false },
        { text: "Boolean", correct: false },
        { text: "Float", correct: true },
        { text: "String", correct: false }
      ]
    },
    {
      question: "Which symbol is used for comments in JavaScript?",
      answers: [
        { text: "//", correct: true },
        { text: "<!-- -->", correct: false },
        { text: "#", correct: false },
        { text: "**", correct: false }
      ]
    },
    {
      question: "How do you declare a variable in JavaScript?",
      answers: [
        { text: "var", correct: false },
        { text: "let", correct: false },
        { text: "const", correct: false },
        { text: "All of the above", correct: true }
      ]
    },
    {
      question: "Which company developed JavaScript?",
      answers: [
        { text: "Google", correct: false },
        { text: "Microsoft", correct: false },
        { text: "Netscape", correct: true },
        { text: "Apple", correct: false }
      ]
    },
    {
      question: "What does DOM stand for?",
      answers: [
        { text: "Document Object Model", correct: true },
        { text: "Data Object Model", correct: false },
        { text: "Digital Output Method", correct: false },
        { text: "Desktop Oriented Mode", correct: false }
      ]
    },
    {
      question: "Which keyword stops a loop?",
      answers: [
        { text: "stop", correct: false },
        { text: "break", correct: true },
        { text: "exit", correct: false },
        { text: "return", correct: false }
      ]
    },
    {
      question: "Which method selects an element by ID?",
      answers: [
        { text: "querySelector()", correct: false },
        { text: "getElement()", correct: false },
        { text: "getElementById()", correct: true },
        { text: "selectById()", correct: false }
      ]
    },
    {
      question: "JavaScript runs primarily on the…",
      answers: [
        { text: "Server", correct: false },
        { text: "Browser", correct: true },
        { text: "Database", correct: false },
        { text: "Compiler", correct: false }
      ]
    }
  ];

  // =============================
  // STATE
  // =============================
  let currentQuestionIndex = 0;
  let score = 0;
  let answered = false;

  // =============================
  // ELEMENTS
  // =============================
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const nextBtn = document.getElementById("next-btn");
  const resultEl = document.getElementById("result");

  // =============================
  // LOAD QUESTION
  // =============================
  function loadQuestion() {
    answered = false;
    nextBtn.style.display = "none";
    answersEl.innerHTML = "";

    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
      const btn = document.createElement("button");
      btn.textContent = answer.text;
      btn.classList.add("answer-btn");

      btn.addEventListener("click", () => {
        if (answered) return;
        answered = true;

        if (answer.correct) {
          btn.classList.add("correct");
          score++;
        } else {
          btn.classList.add("wrong");
        }

        // Show correct answer
        Array.from(answersEl.children).forEach(b => {
          if (
            currentQuestion.answers.find(a => a.text === b.textContent).correct
          ) {
            b.classList.add("correct");
          }
          b.disabled = true;
        });

        nextBtn.style.display = "block";
      });

      answersEl.appendChild(btn);
    });
  }

  // =============================
  // NEXT / FINISH
  // =============================
  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  });

  // =============================
  // RESULTS
  // =============================
  function showResults() {
    document.getElementById("quiz-container").style.display = "none";

    const passed = score >= 7;

    resultEl.innerHTML = `
      <h2>🎉 Quiz Completed!</h2>
      <p>Your Score: <strong>${score} / ${questions.length}</strong></p>
      <p>${passed ? "🔥 You smashed it!" : "😅 Not bad, try again!"}</p>
      ${
        passed
          ? `<button id="continue-btn">You passed, continue 🚀</button>`
          : `<button onclick="location.reload()">Retry Quiz</button>`
      }
    `;

    const continueBtn = document.getElementById("continue-btn");
    if (continueBtn) {
      continueBtn.addEventListener("click", () => {
        alert("Welcome to the next level 😎");
        // window.location.href = "nextpage.html";
      });
    }
  }

  // =============================
  // INIT
  // =============================
  loadQuestion();
});
