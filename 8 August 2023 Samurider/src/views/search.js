import { html } from "../../node_modules/lit-html/lit-html.js"
import { searchMotorcycle } from "../api/data.js";

const searchTemplate = (onSearch) => html`
<section id="search">
<div class="form">
  <h4>Search</h4>
  <form class="search-form" @submit="${onSearch}">
    <input type="text" name="search" id="search-input" />
    <button class="button-list">Search</button>
  </form>
</div>
<h4 id="result-heading">Results:</h4>
<div class="search-result">
</div>
</section>
`;

export async function searchPage(ctx) {
    ctx.render(searchTemplate(onSearch));


    async function onSearch(e) {
        e.preventDefault();

        const data = new FormData(e.target);
        const searchModel = data.get("search");

        if (!searchModel) {
            alert("You have to type in something!");
            return;
        }

        let searchedMotorcycles = await searchMotorcycle(searchModel);
        renderSearchedMotorcycles(searchedMotorcycles);
        e.target.reset();
    }

    function renderSearchedMotorcycles(searchedMotorcycles) {
        searchedMotorcycles = searchedMotorcycles.map(m => `
        <div class="motorcycle">
        <img src="${m.imageUrl}" alt="example1" />
        <h3 class="model">${m.model}</h3>
        <a class="details-btn" href="/details/${m._id}">More Info</a>
        </div>
        `);
        if (searchedMotorcycles.length > 0) {
            document.querySelector(".search-result").innerHTML = searchedMotorcycles.join("");
        } else {
            document.querySelector(".search-result").innerHTML = `<h2 class="no-avaliable">No result.</h2>`
        }
    }
}