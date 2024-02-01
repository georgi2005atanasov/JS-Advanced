import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllFruits } from "../api/data.js";

const dashboardTemplate = (
    fruits
    ) => html`
<section id="dashboard">
${fruits.length > 0 ?
        fruits.map(f => html`<div class="fruit">
            <img src="${f.imageUrl}" alt="example1" />
            <h3 class="title">${f.name}</h3>
            <p>${f.description}</p>
            <a class="details-btn" href="/details/${f.fruitId}">More Info</a>
          </div>`) :
        html`<h2>No fruit info yet.</h2>`}
</section>`;

export async function dashboardPage(ctx) {
    const fruits = await getAllFruits();
    return ctx.render(dashboardTemplate(fruits));
}