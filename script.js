const div = document.getElementById("word");
const ptag = document.createElement("p");

async function getWord() {
    const response = await fetch("http://localhost:3000/word");
    const data = await response.json();
    div.appendChild(ptag)
}

getWord()