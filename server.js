

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

let words = [
  "APPLE",
  "TIGER",
  "HOUSE",
  "CAR",
  "DOG",
  "SUN",
  "SMALL",
  "JUMP",
  "CODING",
  "HAPPY",
];

app.get("/word", (req, res) => {
  const randomIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[randomIndex];
  res.json({ hidden: generateRandomWord(randomWord) });
});

function generateRandomWord(word) {
  return "_".repeat(word.length);
}

app.post("/check", (req, res) => {
  const { letter, hidden, original } = req.body;
  if (!letter || !hidden || !original) {
    return "invalid!!!!";
  }
  const pos = [];
  for (let i = 0; i < original.length; i++) {
    if (original[i] === letter) {
      pos.push(i);
      return i;
    } else {
      return [];
    }
  }
  res.json({ pos });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

async function getWords() {
  try {
    const response = await fetch("http://localhost:3000/word");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}


getWords();
