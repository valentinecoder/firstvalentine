// =======================
// CONFIG — EDIT THESE
// =======================
const VALID_NAME = "hername";   // lowercase
const VALID_CODE = "secret";

// =======================
// LOGIN
// =======================
function login() {
  const name = document.getElementById("name")?.value.toLowerCase();
  const code = document.getElementById("code")?.value;

  if (name === VALID_NAME && code === VALID_CODE) {
    launchConfetti();
    setTimeout(() => {
      window.location.href = "welcome.html";
    }, 1200);
  } else {
    document.getElementById("error").innerText =
      "Access denied. This heart isn’t public property 😌";
  }
}

// =======================
// NAVIGATION
// =======================
function go(page) {
  window.location.href = page;
}

// =======================
// MUSIC
// =======================
function toggleMusic() {
  const music = document.getElementById("bgMusic");
  if (!music) return;
  music.paused ? music.play() : music.pause();
}

document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bgMusic");
  if (!music) return;

  // Restore playback position
  const savedTime = localStorage.getItem("musicTime");
  if (savedTime) {
    music.currentTime = parseFloat(savedTime);
  }

  // Attempt autoplay
  const playMusic = () => {
    music.play().then(() => {
      localStorage.setItem("musicAllowed", "true");
    }).catch(() => {});
  };

  // Check if user already allowed music
  if (localStorage.getItem("musicAllowed") === "true") {
    playMusic();
  } else {
    // Wait for first interaction
    const unlock = () => {
      playMusic();
      document.removeEventListener("click", unlock);
      document.removeEventListener("touchstart", unlock);
    };

    document.addEventListener("click", unlock);
    document.addEventListener("touchstart", unlock);
  }

  // Save playback time continuously
  setInterval(() => {
    if (!music.paused) {
      localStorage.setItem("musicTime", music.currentTime);
    }
  }, 500);
});


  // Save time continuously
  setInterval(() => {
    if (!music.paused) {
      localStorage.setItem("musicTime", music.currentTime);
    }
  }, 1000);
});


// =======================
// FLOATING HEARTS
// =======================
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 10 + 16 + "px";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 800);

// =======================
// CONFETTI
// =======================
function launchConfetti() {
  for (let i = 0; i < 40; i++) {
    const confetti = document.createElement("div");
    confetti.innerText = "💖";
    confetti.style.position = "fixed";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = "-20px";
    confetti.style.animation = "floatDown 2s ease-out forwards";
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 2000);
  }
}

// =======================
// LOVE QUIZ (10 QUESTIONS)
// =======================
const quizData = [
  { q: "Who fell first?", o: ["You 😏", "Me 😌"], a: 0 },
  { q: "Our love language?", o: ["Food 🍕", "Quality Time ❤️"], a: 1 },
  { q: "Who is always late?", o: ["You 😅", "Me 😬"], a: 0 },
  { q: "Best kind of date?", o: ["Movie 🎬", "Deep talks 🌙"], a: 1 },
  { q: "Who steals food?", o: ["You 👀", "Me 🙃"], a: 0 },
  { q: "Who is stubborn?", o: ["You 😤", "Me 😇"], a: 0 },
  { q: "Our vibe?", o: ["Soft 💕", "Cute chaos 😈"], a: 1 },
  { q: "Who texts first?", o: ["You 🥺", "Me 🥰"], a: 1 },
  { q: "Perfect night?", o: ["Netflix 🍿", "Just us ❤️"], a: 1 },
  { q: "Choose me again?", o: ["Always 💖", "Every lifetime ♾️"], a: 1 }
];

let qIndex = 0;
let score = 0;

const qEl = document.getElementById("question");
const optEl = document.getElementById("options");
const fbEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const scoreText = document.getElementById("scoreText");

function loadQuestion() {
  const q = quizData[qIndex];
  qEl.innerText = `Q${qIndex + 1}. ${q.q}`;
  optEl.innerHTML = "";
  fbEl.innerText = "";
  nextBtn.style.display = "none";

  q.o.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.innerText = text;
    btn.onclick = () => selectAnswer(i);
    optEl.appendChild(btn);
  });
}

function selectAnswer(i) {
  if (i === quizData[qIndex].a) {
    score++;
    fbEl.innerText = "Correct 😏 You know us well ❤️";
  } else {
    fbEl.innerText = "Hmm… interesting choice 😂";
  }
  Array.from(optEl.children).forEach(b => b.disabled = true);
  nextBtn.style.display = "block";
}

function nextQuestion() {
  qIndex++;
  if (qIndex < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  qEl.style.display = optEl.style.display = fbEl.style.display = "none";
  nextBtn.style.display = "none";
  resultEl.style.display = "block";

  let label =
    score >= 8 ? "Elite Partner 💎" :
    score >= 6 ? "Certified Lover 😌" :
    "Passed… because I like you ❤️";

  scoreText.innerText = `You scored ${score}/10 🎉\n${label}`;
}

if (qEl) loadQuestion();

// =======================
// LOVE GENERATOR
// =======================
const loveNotes = [
  "System update: You are still my favorite human.",
  "Error 404: Stopped loving you not found.",
  "Data analysis complete. I choose you.",
  "Warning: You cause happiness overload."
];

function generateLove() {
  document.getElementById("loveText").innerText =
    loveNotes[Math.floor(Math.random() * loveNotes.length)];
}

// =======================
// RUNNING NO BUTTON
// =======================
const noBtn = document.getElementById("noBtn");
if (noBtn) {
  const move = () => {
    noBtn.style.position = "absolute";
    noBtn.style.left = Math.random() * 70 + "vw";
    noBtn.style.top = Math.random() * 70 + "vh";
  };
  noBtn.addEventListener("mouseover", move);
  noBtn.addEventListener("touchstart", move);
}

// =======================
// COUNTDOWN TIMER
// =======================
const countdownEl = document.getElementById("countdown");
if (countdownEl) {
  const date = new Date(2026, 1, 14, 19, 0).getTime();

  setInterval(() => {
    const diff = date - new Date().getTime();
    if (diff <= 0) {
      countdownEl.innerText = "It’s date time ❤️";
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000) % 24;
    const m = Math.floor(diff / 60000) % 60;
    const s = Math.floor(diff / 1000) % 60;
    countdownEl.innerText = `${d}d ${h}h ${m}m ${s}s`;
  }, 1000);
}


