document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choiceList = document.getElementById("choice-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "what is the capital of france?",
      choices: ["paris", "London", "Berlin", "Madrid"],
      answer: "paris",
      marks: 2,
    },
    {
      question: "which planet is known as the Red Planet?",
      choices: ["mars", "venus", "jupiter", "Saturn"],
      answer: "mars",
      marks: 2,
    },
    {
      question: "who wrote 'hamlet'?",
      choices: ["charles dickens", "shakespeare", "allama iqbal", "lincoln"],
      answer: "shakespeare",
      marks: 3,
    },
    {
      question: "which batsman scored 100 hundreds in cricket?",
      choices: ["sachin tendulkar", "virat kohli", "gibbs", "ab de viliers"],
      answer: "sachin tendulkar",
      marks: 3,
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  startBtn.addEventListener("click", startQuiz);

  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
  }
  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });
  function showQuestion() {
    nextBtn.classList.add("hidden");
    questionText.textContent = questions[currentQuestionIndex].question;
    choiceList.innerHTML = ""; //clear previous
    questions[currentQuestionIndex].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", () => selectAnswer(li, choice));
      choiceList.appendChild(li);
    });
  }
  function selectAnswer(selectedli, choice) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const currentScore = questions[currentQuestionIndex].marks;
    for (let li of choiceList.children) {
      li.classList.remove("selected");
    }

    // Highlight the clicked option
    selectedli.classList.add("selected");

    if (choice === correctAnswer) {
      score += currentScore;
    }
    nextBtn.classList.remove("hidden");
  }
  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} out of ${questions.reduce(
      (sum, q) => sum + q.marks,
      0
    )}`;
  }
  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    startQuiz();
  });
});
