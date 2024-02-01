import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllShoes } from "../api/shoesService.js";

const dashboardTemplate = (shoes) => html`
<section id="dashboard">
          <h2>Collectibles</h2>
          ${shoes.length > 0 ? html`
          <ul class="card-wrapper">
            ${shoes.map(s => html`
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
            `)}
          </ul>` : html`
          <h2>There are no items added yet.</h2>
          `}
</section>
`;

export async function dashboardPage(ctx) {
    const shoes = await getAllShoes();
    return ctx.render(dashboardTemplate(shoes));
}