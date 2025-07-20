
const words = [
  { dutch: "herinvoer", english: "reimport" },
  { dutch: "kinderwagen", english: "stroller" },
  { dutch: "afvoer", english: "drain" },
  { dutch: "vervoer", english: "transport" },
  { dutch: "aanvoer", english: "supply" },
  { dutch: "verspreid", english: "scattered" },
  { dutch: "snelheid", english: "speed" },
  { dutch: "blaw bak", english: "blue bin" },
  { dutch: "tent", english: "tent" },
  { dutch: "engang", english: "entrance" },
  { dutch: "hoofdingang", english: "main entrance" },
  { dutch: "bocht", english: "bend" },
  { dutch: "schakelaar", english: "switch" },
  { dutch: "dekomstig", english: "originating" },
  { dutch: "beschadig", english: "damage" },
  { dutch: "stukken", english: "pieces" },
  { dutch: "bekomstig", english: "obtainable" },
  { dutch: "braun", english: "brown" },
  { dutch: "blauw", english: "blue" }
];

const learnBtn = document.getElementById('learnBtn');
const dictateBtn = document.getElementById('dictateBtn');
const learnPage = document.getElementById('learnPage');
const dictatePage = document.getElementById('dictatePage');
const wordList = document.getElementById('wordList');
const toggleListBtn = document.getElementById('toggleList');
const speakBtn = document.getElementById('speakWord');
const showTransBtn = document.getElementById('showTranslation');
const translation = document.getElementById('translation');
const userInput = document.getElementById('userInput');
const feedback = document.getElementById('feedback');
const nextWordBtn = document.getElementById('nextWord');

let currentIndex = 0;

learnBtn.onclick = () => {
  learnPage.classList.remove('hidden');
  dictatePage.classList.add('hidden');
};

dictateBtn.onclick = () => {
  dictatePage.classList.remove('hidden');
  learnPage.classList.add('hidden');
  loadWord();
};

toggleListBtn.onclick = () => {
  wordList.classList.toggle('hidden');
};

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'nl-NL';
  speechSynthesis.speak(utterance);
}

words.forEach(({ dutch, english }) => {
  const li = document.createElement('li');
  li.textContent = `${dutch} - ${english}`;
  li.onclick = () => speak(dutch);
  wordList.appendChild(li);
});

function loadWord() {
  const word = words[currentIndex];
  userInput.value = '';
  translation.textContent = word.english;
  translation.classList.add('hidden');
  feedback.textContent = '';
  speak(word.dutch);
}

speakBtn.onclick = () => {
  speak(words[currentIndex].dutch);
};

showTransBtn.onclick = () => {
  translation.classList.toggle('hidden');
};

userInput.addEventListener('input', () => {
  const input = userInput.value.trim().toLowerCase();
  if (!input) {
    feedback.textContent = '';
    return;
  }
  if (input === words[currentIndex].dutch.toLowerCase()) {
    feedback.textContent = '✅ Correct';
    feedback.style.color = 'green';
  } else {
    feedback.textContent = '❌ Try again';
    feedback.style.color = 'red';
  }
});

nextWordBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % words.length;
  loadWord();
};
