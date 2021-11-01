const container = document.querySelector(".container");
const searchInput = document.querySelector("input");
const searchBtn = document.querySelector("#search-btn");
const infoText = document.querySelector(".info");

function fetchApi(word) {
    
};

searchInput.addEventListener("keyup", e =>{
    if (e.key === "Enter"){
        fetchApi(e.target.value);
    }
});

searchBtn.addEventListener("click", (se) => {
    fetchApi(searchInput.value);
});