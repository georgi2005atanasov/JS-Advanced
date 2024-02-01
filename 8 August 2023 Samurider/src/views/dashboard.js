import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllMotorcycles } from "../api/data.js";

const dashboardTemplate = (motorcycles) => html`
  ${motorcycles.length > 0 ? html`
    <section id="dashboard">
        ${motorcycles.map(m => html`
          <div class="motorcycle">
            <img src="${m.imageUrl}" alt="example1" />
            <h3 class="model">${m.model}</h3>
            <p class="year">Year: ${m.year}</p>
            <p class="mileage">Mileage: ${m.mileage} km.</p>
            <p class="contact">Contact Number: ${m.contact}</p>
            <a class="details-btn" href="/details/${m._id}">More Info</a>
          </div>
        `)}
        </section>` :
        html`
    <!-- Display an h2 if there are no posts -->
    <h2 class="no-avaliable">No avaliable motorcycles yet.</h2>`} 
`;

export async function dashboardPage(ctx) {
    const motorcycles = await getAllMotorcycles();
    ctx.render(dashboardTemplate(motorcycles));
}