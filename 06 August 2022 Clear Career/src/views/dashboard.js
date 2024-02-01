import { html } from '../../node_modules/lit-html/lit-html.js';
import { getOffers } from '../api/data.js';

const dashboardTemplate = (offers) => html`<section id="dashboard">
    ${offers.length == 0 ? html`<h2>No offers yet.</h2>` :
        offers.map(offer => html`<div class="offer">
            <img src=${offer.imageUrl} alt="example1" />
            <p>
              <strong>Title: </strong><span class="title">${offer.title}</span>
            </p>
            <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
            <a class="details-btn" href="/details/${offer._id}">Details</a>
          </div>`)}
</section>`;

export async function dashboardPage(ctx) {
    const offers = await getOffers();
    ctx.render(dashboardTemplate(offers));
}