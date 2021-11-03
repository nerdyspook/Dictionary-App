const container = document.querySelector(".container");
const searchInput = document.querySelector("input");
const searchBtn = document.querySelector("#search-btn");
const infoText = document.querySelector(".info");

const searchWord = document.querySelector(".word p");
const wordPhonetic = document.querySelector(".word span");
const meaning = document.querySelector(".meaning span");
const example = document.querySelector(".example span");
const synonyms = document.querySelector(".synonyms .list");
const volumeIcon = document.querySelector(".fa-volume-up")
let audio;

function details(result, word){
    console.log(result);

    infoText.classList.remove("failed");
    

    if(result.title){
        infoText.classList.add("failed");
        infoText.innerHTML = result.message;
    }else {
        infoText.classList.remove("search");
        container.classList.add("active");

        phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}`

        searchWord.innerText = result[0].word;
        wordPhonetic.innerText = phonetics;
        meaning.innerText = result[0].meanings[0].definitions[0].definition;
        example.innerText = result[0].meanings[0].definitions[0].example;
        
        audio = new Audio("https:" + result[0].phonetics[0].audio);

        if(result[0].meanings[0].definitions[0].synonyms[0] == undefined ){
            synonyms.parentElement.style.display = "none";
        }else{
            synonyms.parentElement.style.display = "block";
        }

        synonyms.innerHTML = "";
        for(let i = 0; i < 5; i++){
            let tag  =`<span> ${result[0].meanings[0].definitions[0].synonyms[i]},</span>`
            synonyms.insertAdjacentHTML("beforeend", tag);
        }
    }
}

function fetchApi(word) {
    infoText.style.color = "#1F2937";
    infoText.classList.add("search");
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>` 

    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    fetch(url)
    .then(response => response.json())
    .then(result => details(result, word));
};

searchInput.addEventListener("keyup", e =>{
    if (e.key === "Enter"){
        fetchApi(e.target.value);
    }
});

searchBtn.addEventListener("click", (se) => {
    fetchApi(searchInput.value);
});

volumeIcon.addEventListener("click", () => {
    audio.play();
});