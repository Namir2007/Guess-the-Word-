const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Ispravljeno!

let words = [
  "APPLE",
  "TIGER",
  "HOUSE",
  "DOG",
  "SUN",
  "SMALL",
  "JUMP",
  "CODING",
  "HAPPY",
];
let currentWord = "";

app.get("/word", (req, res) => {
  currentWord = words[Math.floor(Math.random() * words.length)];
  res.json({
    hidden: "_".repeat(currentWord.length),
    wordLength: currentWord.length,
    original: currentWord,
  });
});

app.post("/check", (req, res) => {
  const { letter, hidden, original } = req.body;
  if (!letter || !hidden || !original)
    return res.status(400).json({ error: "Invalid request" });

  let positions = [];
  for (let i = 0; i < original.length; i++) {
    if (original[i].toUpperCase() === letter.toUpperCase()) positions.push(i);
  }
  res.json({ positions });
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
