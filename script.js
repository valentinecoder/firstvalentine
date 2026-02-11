// =======================
// CONFIG — EDIT THESE
// =======================
const VALID_NAME = "cherry"; // lowercase
const VALID_CODE = "L";

// =======================
// LOGIN
// =======================
function login() {
  const name = document.getElementById("name")?.value.toLowerCase();
  const code = document.getElementById("code")?.value;

  if (name === VALID_NAME && code === VALID_CODE) {
    launchConfetti();
    setTimeout(() => {
      go("welcome.html");
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
// MUSIC (AUTOPLAY + PERSIST)
// =======================
let music;

document.addEventListener("DOMContentLoaded", () => {
  music = document.getElementById("bgMusic");
  if (!music) return;

  const savedTime = localStorage.getItem("musicTime");
  if (savedTime) music.currentTime = parseFloat(savedTime);

  const playMusic = () => {
    music.play().then(() => {
      localStorage.setItem("musicAllowed", "true");
    }).catch(() => {});
  };

  if (localStorage.getItem("musicAllowed") === "true") {
    playMusic();
  } else {
    const unlock = () => {
      playMusic();
      document.removeEventListener("click", unlock);
      document.removeEventListener("touchstart", unlock);
    };
    document.addEventListener("click", unlock);
    document.addEventListener("touchstart", unlock);
  }

  setInterval(() => {
    if (music && !music.paused) {
      localStorage.setItem("musicTime", music.currentTime);
    }
  }, 500);
});

function toggleMusic() {
  if (!music) return;
  music.paused ? music.play() : music.pause();
}

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
  { q: "Who fell first?", o: ["You 😏", "Me 😌"], a: 1 },
  { q: "Our love language?", o: ["Food 🍕", "Quality Time ❤️"], a: 1 },
  { q: "My Birth Month and Zodiac", o: ["September Virgo", "September Libra"], a: 1 },
  { q: "Our First Date?", o: ["Ebony Life Cinema", "Hua Han Restaurant🌙"], a: 1 },
  { q: "Who steals food?", o: ["You 👀", "Me 🙃"], a: 0 },
  { q: "Who eats once in two years?", o: ["You 😤", "Me 😇"], a: 1 },
  { q: "Our Anniversary", o: ["December 5th 💕", "October 19th 😈"], a: 0 },
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
  if (!qEl) return;
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

  const label =
    score >= 8 ? "Elite Partner 💎" :
    score >= 6 ? "Certified Lover 😌" :
    "Passed… because I like you ❤️";

  scoreText.innerText = `You scored ${score}/10 😊😊😊😊Oya send me screenshot🎉\n${label}`;
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
  const el = document.getElementById("loveText");
  if (!el) return;
  el.innerText = loveNotes[Math.floor(Math.random() * loveNotes.length)];
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
  const date = new Date(2026, 1, 14, 15, 0).getTime();

  setInterval(() => {
    const diff = date - Date.now();
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

function acceptDate() {
  launchConfetti();
  setTimeout(() => {
    window.location.href = "valentine.html";
  }, 800);
}

// =======================
// VALENTINE ANIMATION
// =======================
const herName = "Chinenye ❤️"; // <-- EDIT NAME HERE

const nameEl = document.getElementById("nameText");
const heartEl = document.getElementById("bigHeart");

if (nameEl && heartEl) {
  animateName();
  explodeHeart();
}

// Letter-by-letter animation
function animateName() {
  let i = 0;
  nameEl.innerText = "";

  const interval = setInterval(() => {
    nameEl.innerText += herName[i];
    i++;
    if (i >= herName.length) clearInterval(interval);
  }, 120);
}

// Heart explosion
function explodeHeart() {
  setTimeout(() => {
    for (let i = 0; i < 20; i++) {
      const mini = document.createElement("div");
      mini.className = "mini-heart";
      mini.innerText = "❤️";

      mini.style.left = heartEl.offsetLeft + 40 + "px";
      mini.style.top = heartEl.offsetTop + 40 + "px";
      mini.style.fontSize = Math.random() * 16 + 14 + "px";

      document.body.appendChild(mini);

      setTimeout(() => mini.remove(), 1500);
    }
  }, 600);
}



