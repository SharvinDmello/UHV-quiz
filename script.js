let score = 0;
let answeredCount = 0;
let totalQuestions = 0;

function createQuiz(questions) {
  const container = document.getElementById('quiz-container');
  container.innerHTML = '';
  score = 0;
  answeredCount = 0;
  totalQuestions = questions.length;
  updateScore();

  questions.forEach((q, index) => {
    const card = document.createElement('div');
    card.className = 'question-card';

    const question = document.createElement('div');
    question.className = 'question-text';
    question.textContent = `${index + 1}. ${q.question}`;

    const options = Object.entries(q.options).map(([key, value]) => {
      const opt = document.createElement('div');
      opt.className = 'option';
      opt.dataset.key = key;
      opt.textContent = `${key}. ${value}`;
      opt.addEventListener('click', () =>
        handleAnswer(opt, key, q.correct_option, card)
      );
      return opt;
    });

    card.appendChild(question);
    options.forEach(opt => card.appendChild(opt));
    container.appendChild(card);
  });
}

function handleAnswer(selected, key, correctKey, card) {
  const options = card.querySelectorAll('.option');
  options.forEach(opt => {
    opt.classList.add('disabled');
    if (opt.dataset.key === correctKey) {
      opt.classList.add('correct');
    }
    if (opt === selected && key !== correctKey) {
      opt.classList.add('wrong');
    }
  });

  if (key === correctKey) score++;
  answeredCount++;
  updateScore();

  if (answeredCount === totalQuestions) {
    showResult();
  }
}

function updateScore() {
  document.getElementById('current-score').textContent = score;
}

function showResult() {
  const result = document.getElementById('result-container');
  const scoreText = document.getElementById('score-text');
  scoreText.textContent = `You scored ${score} out of ${totalQuestions}`;
  result.style.display = 'block';
}

function resetQuiz() {
  fetch('mcq.json')
    .then(response => response.json())
    .then(data => {
      document.getElementById('result-container').style.display = 'none';
      document.getElementById('current-score').textContent = '0';
      createQuiz(data.mcq_questions);
    });
}

document.getElementById('reset-btn').addEventListener('click', resetQuiz);

window.onload = resetQuiz;
