import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllShoes } from "../api/shoesService.js";
import { createSubmitHandler } from "../utility.js";

const searchTemplate = (onSubmit) => html`
<section id="search">
          <h2>Search by Brand</h2>

          <form class="search-wrapper cf" @submit="${onSubmit}">
            <input
              id="#search-input"
              type="text"
              name="search"
              placeholder="Search here..."
              required
            />
            <button type="submit">Search</button>
          </form>

          <h3>Results:</h3>

          <div id="search-container">
          </div>
</section>
`;

{/* <ul class="card-wrapper">
              <!-- Display a li with information about every post (if any)-->
              <li class="card">
                <img src="./images/travis.jpg" alt="travis" />
                <p>
                  <strong>Brand: </strong><span class="brand">Air Jordan</span>
                </p>
                <p>
                  <strong>Model: </strong
                  ><span class="model">1 Retro High TRAVIS SCOTT</span>
                </p>
                <p><strong>Value:</strong><span class="value">2000</span>$</p>
                <a class="details-btn" href="">Details</a>
              </li>
            </ul> */}

export function searchPage(ctx) {
    return ctx.render(searchTemplate(createSubmitHandler(ctx, onSubmit)));

    async function onSubmit(ctx, data, e) {
        const searchedShoe = data.search;
        const shoes = await getAllShoes();
        const shoesToRender = renderShoes(shoes, searchedShoe);
        document.querySelector("#search-container").innerHTML = shoesToRender;
        e.target.reset();
    }

    function renderShoes(shoes, searchedShoe) {
        const searchedShoes = shoes
        .filter(s => s.brand.toLowerCase().startsWith(searchedShoe.toLowerCase()))
        .map(s => `
            <li class="card">
                <img src="${s.imageUrl}" alt="travis" />
                <p>
                  <strong>Brand: </strong><span class="brand">${s.brand}</span>
                </p>
                <p>
                  <strong>Model: </strong
                  ><span class="model">${s.model}</span>
                </p>
                <p><strong>Value:</strong><span class="value">${s.value}</span>$</p>
                <a class="details-btn" href="/details/${s._id}">Details</a>
              </li>
        `);

        if (searchedShoes.length == 0) {
            return `<h2>There are no results found.</h2>`;
        } else {
            return `<ul class="card-wrapper">${searchedShoes.join("")}</ul>`;
        }
    }
}

