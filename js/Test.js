const questions = [
  { disorder: "depression", question: "Do you feel down or hopeless most of the time?", answers: ["Yes", "Sometimes", "Rarely", "No"], scores: [3, 2, 1, 0] },
  { disorder: "schizophrenia", question: "Do you hear or see things that others do not?", answers: ["Yes", "Sometimes", "Rarely", "No"], scores: [3, 2, 1, 0] },
  { disorder: "anxiety", question: "Do you often feel nervous, anxious or on edge?", answers: ["Yes", "Sometimes", "Rarely", "No"], scores: [3, 2, 1, 0] },
  { disorder: "bipolar", question: "Do your moods swing between extreme highs and lows?", answers: ["Yes", "Sometimes", "Rarely", "No"], scores: [3, 2, 1, 0] },
  { disorder: "ptsd", question: "Do you have flashbacks or nightmares of a traumatic event?", answers: ["Yes", "Sometimes", "Rarely", "No"], scores: [3, 2, 1, 0] },
  { disorder: "ocd", question: "Do you feel compelled to perform certain rituals or routines?", answers: ["Yes", "Sometimes", "Rarely", "No"], scores: [3, 2, 1, 0] },
  { disorder: "adhd", question: "Do you often find it hard to focus or sit still for long?", answers: ["Yes", "Sometimes", "Rarely", "No"], scores: [3, 2, 1, 0] },
  { disorder: "eating", question: "Are you overly concerned about body weight or food?", answers: ["Yes", "Sometimes", "Rarely", "No"], scores: [3, 2, 1, 0] },
  { disorder: "bpd", question: "Do your relationships feel intense and unstable?", answers: ["Yes", "Sometimes", "Rarely", "No"], scores: [3, 2, 1, 0] },
  { disorder: "social", question: "Do you avoid social situations due to fear of judgment?", answers: ["Yes", "Sometimes", "Rarely", "No"], scores: [3, 2, 1, 0] },
  { disorder: "trust", question: "Do you find it difficult to trust others?", answers: ["Yes", "Sometimes", "Rarely", "No"], scores: [3, 2, 1, 0] },
  { disorder: "trauma", question: "Have you experienced something painful that still affects you?", answers: ["Yes", "Sometimes", "Rarely", "No"], scores: [3, 2, 1, 0] }
];

const disorderNames = {
  depression: "Depression", schizophrenia: "Schizophrenia", anxiety: "Anxiety Disorders",
  bipolar: "Bipolar Disorder", ptsd: "Post-Traumatic Stress Disorder (PTSD)", ocd: "Obsessive Compulsive Disorder (OCD)",
  adhd: "ADHD", eating: "Eating Disorders", bpd: "Borderline Personality Disorder (BPD)",
  social: "Social Anxiety Disorder", trust: "Trust Issues", trauma: "Trauma"
};

let currentQuestion = 0;
let disorderScores = {};

function loadQuestion() {
  const questionElement = document.getElementById('question');
  const answersElement = document.getElementById('answers');
  const progressElement = document.getElementById('progress');

  const current = questions[currentQuestion];
  questionElement.innerText = current.question;
  answersElement.innerHTML = '';

  current.answers.forEach((answer, index) => {
    const label = document.createElement('label');
    const className = answer.toLowerCase().replace(/\s/g, '');
    label.className = `option ${className}`;
    label.innerHTML = `<input type="radio" name="answer" value="${current.scores[index]}"> ${answer}`;
    answersElement.appendChild(label);
  });

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;
  progressElement.style.width = progressPercentage + '%';
}

function nextQuestion() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (selectedAnswer) {
    const score = parseInt(selectedAnswer.value);
    const disorder = questions[currentQuestion].disorder;

    if (!disorderScores[disorder]) disorderScores[disorder] = 0;
    disorderScores[disorder] += score;

    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  } else {
    alert("Please select an answer before proceeding.");
  }
}
function showResults() {
  const resultsElement = document.getElementById('results');
  const quizForm = document.getElementById('quizForm');
  quizForm.style.display = 'none';
  resultsElement.style.display = 'block';

  const totalScore = Object.values(disorderScores).reduce((sum, val) => sum + val, 0);

  if (totalScore === 0) {
    resultsElement.innerHTML = `
      <h3>Result:</h3>
      <p>There are no signs of any psychological disorder. You are fine.</p>
      <button onclick="restartQuiz()">Retake the Test</button>
    `;
    return;
  }

  const sortedDisorders = Object.entries(disorderScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  // حساب النسب بشكل دقيق ومجموعها 100%
  const rawPercentages = sortedDisorders.map(([_, score]) => (score / totalScore) * 100);
  const roundedPercentages = rawPercentages.map(p => Math.floor(p));
  let totalRounded = roundedPercentages.reduce((a, b) => a + b, 0);

  // توزيع الباقي المتبقي للوصول لـ 100%
  let remainder = 100 - totalRounded;
  let i = 0;
  while (remainder > 0) {
    roundedPercentages[i % roundedPercentages.length]++;
    remainder--;
    i++;
  }

  resultsElement.innerHTML = `<h3>Test Results:</h3><ul>`;
  sortedDisorders.forEach(([disorder], index) => {
    const name = disorderNames[disorder] || disorder;
    resultsElement.innerHTML += `<li><strong>${name}</strong>: ${roundedPercentages[index]}%</li>`;
  });
  resultsElement.innerHTML += `</ul>
    <p><a href="services.html#disorders" target="_blank">Know more</a></p>
    <button onclick="restartQuiz()">Restart Test</button>
  `;
}
function restartQuiz() {
  currentQuestion = 0;
  disorderScores = {};
  document.getElementById('results').style.display = 'none';
  document.getElementById('quizForm').style.display = 'block';
  loadQuestion();
}

loadQuestion();
