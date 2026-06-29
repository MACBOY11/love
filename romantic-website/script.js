/* ============================================================
   script.js – Romantic Gift Website Logic
   ============================================================ */

// ─── Background Floating Hearts ────────────────────────────
(function spawnBgHearts() {
  const container = document.getElementById('bg-hearts');
  const hearts = ['💕', '💖', '💗', '💓', '❤️', '🩷', '🤍', '🌸'];
  function createHeart() {
    const el = document.createElement('span');
    el.className = 'bg-heart';
    el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    el.style.left = Math.random() * 100 + '%';
    el.style.fontSize = (0.9 + Math.random() * 1.2) + 'rem';
    el.style.animationDuration = (6 + Math.random() * 8) + 's';
    el.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
  // initial batch
  for (let i = 0; i < 12; i++) setTimeout(createHeart, i * 300);
  // continuous
  setInterval(createHeart, 1200);
})();

// ─── NO Button Dodge Logic ─────────────────────────────────
const btnNo = document.getElementById('btn-no');
const btnRow = document.getElementById('btn-row');
const dodgeMsg = document.getElementById('dodge-msg');
const cardBody = document.getElementById('card-body');

const funnyMsgs = [
  'Are you sure? 🥺',
  'Think again! 💖',
  'Please? 👉👈',
  "You can't escape love 😆",
  'One more try? 🥹',
  'Nope! Try again 💕',
  "I won't give up! 🌸",
  'Hehe nice try 😜'
];

let dodgeCount = 0;

function dodgeButton() {
  dodgeCount++;
  // Show funny message every 2 dodges
  if (dodgeCount % 2 === 0) {
    const msg = funnyMsgs[Math.min(Math.floor(dodgeCount / 2) - 1, funnyMsgs.length - 1)];
    dodgeMsg.textContent = msg;
    dodgeMsg.style.animation = 'none';
    void dodgeMsg.offsetWidth;          // reflow
    dodgeMsg.style.animation = 'fadeMsg .4s ease';
  }

  // Calculate safe bounds within card body
  const rect = cardBody.getBoundingClientRect();
  const bw = btnNo.offsetWidth;
  const bh = btnNo.offsetHeight;
  const pad = 10;

  const maxX = rect.width - bw - pad * 2;
  const maxY = rect.height - bh - pad * 2;
  const rx = Math.random() * Math.max(maxX, 80);
  const ry = Math.random() * Math.max(maxY, 40);

  // Pull out of normal flow & move
  btnNo.style.position = 'absolute';
  btnNo.style.left = (pad + rx) + 'px';
  btnNo.style.top = (pad + ry) + 'px';
  btnNo.style.transition = 'left .25s ease, top .25s ease';
  cardBody.style.position = 'relative';
  cardBody.style.minHeight = '360px';
}

// Desktop: dodge on hover
btnNo.addEventListener('mouseenter', dodgeButton);
// Mobile: dodge on touch
btnNo.addEventListener('touchstart', function (e) {
  e.preventDefault();
  dodgeButton();
}, { passive: false });

// ─── YES Button – Celebration ──────────────────────────────
function onYes() {
  burstHearts();
  setTimeout(showCelebration, 400);
}

// Heart burst from button
function burstHearts() {
  const btn = document.getElementById('btn-yes');
  const r = btn.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  const emojis = ['❤️', '💖', '💗', '💕', '💓', '🩷', '🌸', '✨'];

  for (let i = 0; i < 100; i++) {
    const el = document.createElement('span');
    el.className = 'heart-particle';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const angle = Math.random() * Math.PI * 2;
    const dist = 80 + Math.random() * 260;
    el.style.left = cx + 'px';
    el.style.top = cy + 'px';
    el.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    el.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
    el.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
    el.style.animationDelay = (Math.random() * .35) + 's';
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

// Show overlay
function showCelebration() {
  const overlay = document.getElementById('overlay');
  overlay.classList.add('show');
  spawnConfetti();
  spawnSparkles();
  // optional gentle sound (Web Audio short beep)
  playSuccessSound();
}

// Confetti
function spawnConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const colors = ['#ff85b3', '#ffadd2', '#ffd93d', '#6bcb77', '#a78bfa', '#f472b6', '#f9a8d4', '#fbbf24'];
  for (let i = 0; i < 120; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.left = Math.random() * 100 + '%';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.width = (6 + Math.random() * 8) + 'px';
    el.style.height = (6 + Math.random() * 8) + 'px';
    el.style.borderRadius = Math.random() > .5 ? '50%' : '2px';
    el.style.animationDuration = (2 + Math.random() * 3) + 's';
    el.style.animationDelay = Math.random() * 1.5 + 's';
    canvas.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
  // Repeat for continuous effect
  setTimeout(() => spawnConfetti(), 4000);
}

// Sparkles
function spawnSparkles() {
  const colors = ['#fff', '#ffd6e7', '#ffd93d', '#a78bfa'];
  for (let i = 0; i < 40; i++) {
    const el = document.createElement('div');
    el.className = 'sparkle';
    el.style.left = (Math.random() * 100) + 'vw';
    el.style.top = (Math.random() * 100) + 'vh';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.setProperty('--tx', (Math.random() * 80 - 40) + 'px');
    el.style.setProperty('--ty', (Math.random() * 80 - 40) + 'px');
    el.style.animationDelay = (Math.random() * 1) + 's';
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
  setTimeout(() => spawnSparkles(), 2000);
}

// Optional: gentle success chime via Web Audio API
function playSuccessSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 chord
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.12);
      osc.stop(ctx.currentTime + 1.4);
    });
  } catch (_) { /* audio not supported, skip */ }
}
