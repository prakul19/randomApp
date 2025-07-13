// ----- QUIZ DATA -----
const quizData = [
  {
    q: "When is our anniversary?",
    opts: ["August 1", "September 1"],
    correct: 0
  },
  {
    q: "When is my (Prakul’s) birthday?",
    opts: ["19th August", "13th April"],
    correct: 0
  },
  {
    q: "When is Shreya’s birthday?",
    opts: ["13th April", "14th April"],  // one day ahead distractor
    correct: 0
  },
  {
    q: "Where did we go on our first date? (13th August 2022)",
    opts: ["Movie theater", "Cafe"], // adjust as needed
    correct: 0
  },
  {
    q: "When did we share our first kiss?",
    opts: ["August 2", "August 1"],  // distractor then correct
    correct: 1
  },
  {
    q: "What’s my favorite food?",
    opts: ["Pizza", "Paneer", "Biryani"],  // multiple opts, but correct index 1
    correct: 1
  },
  {
    q: "Do you like me?",
    opts: ["Yes", "A big YES!"],
    correct: 1
  }
];

let idx = 0;

// ELEMENT REFERENCES
const intro = document.getElementById('intro');
const quiz  = document.getElementById('quiz');
const final = document.getElementById('final');
const qText = document.getElementById('qText');
const opts  = document.getElementById('options');
const toast = document.getElementById('toast');
const bgAudio = document.getElementById('bgAudio');

// CONFETTI SETUP
const confettiCanvas = document.getElementById('confetti-canvas');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;
const confettiFn = confetti.create(confettiCanvas, { resize: true });

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
}
function burst() {
  confettiFn({ particleCount: 40, spread: 70, origin: { y: 0.6 } });
}

// Render a question
function renderQuestion(i) {
  const data = quizData[i];
  qText.textContent = data.q;
  opts.innerHTML = '';
  data.opts.forEach((opt, j) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.className = 'btn-outline';
    btn.onclick = () => {
      if (j === data.correct) {
        burst();
        idx++;
        if (idx < quizData.length) {
          renderQuestion(idx);
        } else {
          showFinal();
        }
      } else {
        showToast("Aww, dumbo—how can you forget that? 💕");
      }
    };
    opts.appendChild(btn);
  });
}

// Show final screen (with shayari already in HTML)
function showFinal() {
  quiz.classList.add('hidden');
  setTimeout(() => {
    quiz.style.display = 'none';
    final.style.display = 'block';
    setTimeout(() => final.classList.remove('hidden'), 10);
  }, 400);
}

// Start quiz click handler
document.getElementById('startBtn').onclick = () => {
  bgAudio.play().catch(e => console.warn('Audio play failed:', e));
  intro.classList.add('hidden');
  setTimeout(() => {
    intro.style.display = 'none';
    quiz.style.display = 'block';
    quiz.classList.remove('hidden');
    renderQuestion(0);
  }, 400);
};

// Adjust canvas on resize
window.addEventListener('resize', () => {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});
