const questions = [
  { disorder: "depression", question: "هل تشعر بالحزن أو اليأس معظم الوقت؟", answers: ["نعم", "أحيانًا", "نادرًا", "لا"], scores: [3, 2, 1, 0] },
  { disorder: "schizophrenia", question: "هل تسمع أو ترى أشياء لا يراها الآخرون؟", answers: ["نعم", "أحيانًا", "نادرًا", "لا"], scores: [3, 2, 1, 0] },
  { disorder: "anxiety", question: "هل تشعر بالتوتر أو القلق بشكل متكرر؟", answers: ["نعم", "أحيانًا", "نادرًا", "لا"], scores: [3, 2, 1, 0] },
  { disorder: "bipolar", question: "هل تتقلب مزاجك بين الفرح الشديد والحزن الشديد؟", answers: ["نعم", "أحيانًا", "نادرًا", "لا"], scores: [3, 2, 1, 0] },
  { disorder: "ptsd", question: "هل تراودك كوابيس أو ذكريات مؤلمة عن حدث صادم؟", answers: ["نعم", "أحيانًا", "نادرًا", "لا"], scores: [3, 2, 1, 0] },
  { disorder: "ocd", question: "هل تشعر بالحاجة لأداء طقوس أو عادات بشكل متكرر؟", answers: ["نعم", "أحيانًا", "نادرًا", "لا"], scores: [3, 2, 1, 0] },
  { disorder: "adhd", question: "هل تجد صعوبة في التركيز أو الجلوس لفترة طويلة؟", answers: ["نعم", "أحيانًا", "نادرًا", "لا"], scores: [3, 2, 1, 0] },
  { disorder: "eating", question: "هل تشعر بقلق مفرط تجاه الوزن أو الطعام؟", answers: ["نعم", "أحيانًا", "نادرًا", "لا"], scores: [3, 2, 1, 0] },
  { disorder: "bpd", question: "هل تشعر أن علاقاتك متقلبة وغير مستقرة؟", answers: ["نعم", "أحيانًا", "نادرًا", "لا"], scores: [3, 2, 1, 0] },
  { disorder: "social", question: "هل تتجنب المواقف الاجتماعية خوفًا من الحكم عليك؟", answers: ["نعم", "أحيانًا", "نادرًا", "لا"], scores: [3, 2, 1, 0] },
  { disorder: "trust", question: "هل تجد صعوبة في الوثوق بالآخرين؟", answers: ["نعم", "أحيانًا", "نادرًا", "لا"], scores: [3, 2, 1, 0] },
  { disorder: "trauma", question: "هل مررت بتجربة مؤلمة ما زالت تؤثر عليك؟", answers: ["نعم", "أحيانًا", "نادرًا", "لا"], scores: [3, 2, 1, 0] }
];

const disorderNames = {
  depression: "الاكتئاب",
  schizophrenia: "الفصام",
  anxiety: "اضطرابات القلق",
  bipolar: "الاضطراب ثنائي القطب",
  ptsd: "اضطراب ما بعد الصدمة",
  ocd: "الوسواس القهري",
  adhd: "اضطراب فرط الحركة وتشتت الانتباه",
  eating: "اضطرابات الأكل",
  bpd: "اضطراب الشخصية الحدية",
  social: "اضطراب القلق الاجتماعي",
  trust: "مشكلة في الثقة بالآخرين",
  trauma: "الصدمة النفسية"
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
    alert("يرجى اختيار إجابة قبل المتابعة.");
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
      <h3>النتيجة:</h3>
      <p>لا توجد مؤشرات على وجود اضطرابات نفسية. أنت بخير.</p>
      <button onclick="restartQuiz()">إعادة الاختبار</button>
    `;
    return;
  }

  const sortedDisorders = Object.entries(disorderScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const rawPercentages = sortedDisorders.map(([_, score]) => (score / totalScore) * 100);
  const roundedPercentages = rawPercentages.map(p => Math.floor(p));
  let totalRounded = roundedPercentages.reduce((a, b) => a + b, 0);

  let remainder = 100 - totalRounded;
  let i = 0;
  while (remainder > 0) {
    roundedPercentages[i % roundedPercentages.length]++;
    remainder--;
    i++;
  }

  resultsElement.innerHTML = `<h3>نتائج الاختبار:</h3><ul>`;
  sortedDisorders.forEach(([disorder], index) => {
    const name = disorderNames[disorder] || disorder;
    resultsElement.innerHTML += `<li><strong>${name}</strong>: ${roundedPercentages[index]}%</li>`;
  });
  resultsElement.innerHTML += `</ul>
    <p><a href="services.html#disorders" target="_blank">معرفة المزيد</a></p>
    <button onclick="restartQuiz()">إعادة الاختبار</button>
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
