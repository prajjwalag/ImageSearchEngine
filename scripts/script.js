const search_form = document.getElementById("search-form");
const search_box = document.getElementById("search-box");
const search_result = document.getElementById("search-result");
const SHOW_MORE_BTN = document.getElementById("show-more-btn");

const ACCESS_KEY = "";

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = search_box.value;
    let url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${ACCESS_KEY}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if(page === 1) {
        search_result.innerHTML ="";
    }

    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href=result.links.html;
        imageLink.target= "_blank";
        imageLink.appendChild(image);
        search_result.appendChild(imageLink);
    });

    SHOW_MORE_BTN.style.display = "block";

} 


search_form.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

SHOW_MORE_BTN.addEventListener("click", () => {
    page++;
    searchImages();
});