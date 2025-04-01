const wordDiv = document.getElementById("word");
const input = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const newGameBtn = document.getElementById("new-game-btn");
const attemptsDiv = document.getElementById("attempts");
const messageDiv = document.getElementById("message");

let hiddenWord = "";
let originalWord = "";
let attempts = 6;

async function startGame() {
  const response = await fetch("http://localhost:3000/word");
  const data = await response.json();
  hiddenWord = data.hidden;
  originalWord = data.original;
  attempts = 6;
  updateDisplay();
}

function updateDisplay() {
  wordDiv.innerText = hiddenWord.split("").join(" ");
  attemptsDiv.innerText = `Attempts Left: ${attempts}`;
  messageDiv.innerText = "";
}

guessBtn.addEventListener("click", async () => {
  const letter = input.value.toUpperCase();
  if (!letter.match(/[A-Z]/) || letter.length !== 1) return;

  const response = await fetch("http://localhost:3000/check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      letter,
      hidden: hiddenWord,
      original: originalWord,
    }),
  });

  const data = await response.json();
  if (data.positions.length > 0) {
    hiddenWord = hiddenWord
      .split("")
      .map((char, i) => (data.positions.includes(i) ? originalWord[i] : char))
      .join("");
  } else {
    attempts--;
  }
  updateDisplay();
  checkGameOver();
  input.value = "";
});

function checkGameOver() {
  if (!hiddenWord.includes("_")) {
    messageDiv.innerText = "You won! 🎉";
  } else if (attempts === 0) {
    messageDiv.innerText = `Game Over! The word was ${originalWord}. 😢`;
  }
}

newGameBtn.addEventListener("click", startGame);
document.addEventListener("DOMContentLoaded", startGame);
