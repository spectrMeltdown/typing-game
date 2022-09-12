const QUOTELISTURL = "https://type.fit/api/quotes";
let random = Math.floor(Math.random() * 1000);
let gonext = 0;
let incre = 0;

quoteInput.addEventListener("input", (e) => {
  const quotearray = quoteDisplay.querySelectorAll("span");
  const inputarray = quoteInput.value.split("");
  incre = quoteInput.value.length;
  if (quotearray[incre] != undefined)
    quotearray[incre].classList.add("highlight");
  quotearray.forEach((quotechar, index) => {
    const inputchar = inputarray[index];
    if (inputchar == null) {
      quotechar.classList.remove("correct");
      quotechar.classList.remove("wrong");
    } else if (inputchar === quotechar.innerText) {
      quotechar.classList.remove("highlight");
      quotechar.classList.add("correct");
      quotechar.classList.remove("wrong");
    } else {
      quotechar.classList.remove("highlight");
      quotechar.classList.remove("correct");
      quotechar.classList.add("wrong");
    }
  });

  if (quoteInput.value.length == quotearray.length) {
    window.location.reload();
  }
  // if (gonext == 1 && e.inputType == "insertLineBreak") {
  //   window.location.reload();
  // }
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
