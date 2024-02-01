import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllFruits } from "../api/data.js";

const searchTemplate = (onSubmit) => html`<section id="search">
<div class="form">
  <h2>Search</h2>
  <form class="search-form" @submit="${onSubmit}">
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
</div>
<h4>Results:</h4>
<div class="search-result"></div>
</section>
`;


export async function searchPage(ctx) {
    return ctx.render(searchTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const data = new FormData(e.target);
        const search = data.get("search");

        if (!search) {
            alert("Fill the form to receive output!");
            return;
        }

        const fruits = await getAllFruits();
        let selectedFruits = fruits.filter(f => f.name.toLowerCase().startsWith(search.toLowerCase()));
        selectedFruits = selectedFruits.map(f => `<div class="fruit">
        <img src="${f.imageUrl}" alt="example1" />
        <h3 class="title">${f.name}</h3>
        <p class="description">${f.description}</p>
        <a class="details-btn" href="/details/${f.fruitId}">More Info</a>
        </div>`);

        e.target.reset();
        if (selectedFruits.length == 0) {
            document.querySelector(".search-result").innerHTML = '<p class="no-result">No result.</p>';
        } else {
            document.querySelector(".search-result").innerHTML = selectedFruits.join('');
        }

    }
}