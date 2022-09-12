const QUOTELISTURL = "https://type.fit/api/quotes";
let random = Math.floor(Math.random() * 1000);

quoteInput.addEventListener("input", () => {
  const quotearray = quoteDisplay.querySelectorAll("span");
  const inputarray = quoteInput.value.split("");
  quotearray.forEach((quotechar, index) => {
    const inputchar = inputarray[index];
    if (inputchar == null) {
      quotechar.classList.remove("correct");
      quotechar.classList.remove("wrong");
    } else if (inputchar === quotechar.innerText) {
      quotechar.classList.add("correct");
      quotechar.classList.remove("wrong");
    } else {
      quotechar.classList.remove("correct");
      quotechar.classList.add("wrong");
    }
  });
});

async function getAllQuotes() {
  const response = await fetch(QUOTELISTURL);
  const data = await response.json();
  return data;
}

async function renderQuote() {
  //init
  let quotelist = await getAllQuotes();
  let quote = quotelist[random].text;
  let author = "";
  author =
    quotelist[random].author != null
      ? (author += quotelist[random].author)
      : "Anonymous";

  // create spans for each character
  quote.split("").forEach((char) => {
    let charspan = document.createElement("span");
    charspan.innerText = char;
    quoteDisplay.appendChild(charspan);
  });

  //append author
  let authorDiv = document.createElement("p");
  authorDiv.innerText = author;
  body.appendChild(authorDiv);

  //other
  quoteInput.value = null;
  startTimer();
}

function startTimer() {
  timer.innerText = 0;
  let startTime = new Date();
  setInterval(() => {
    timer.innerText = getTime(startTime);
  }, 1000);
}

function getTime(time) {
  return Math.floor((new Date() - time) / 1000);
}

renderQuote();

// Failed attempt to store data offline. Document.cookie uses string to store data. Not efficient for a json.
// if (document.cookie != "") {
//   quotelist = document.cookie;
// } else {
//   refillcookies();
// }
