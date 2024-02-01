import { html } from "../../node_modules/lit-html/lit-html.js"
import { getUserData } from "../utility.js";
import { createMotorcycle } from "../api/data.js";

const createTemplate = (onSubmit) => html`
<section id="create">
          <h2>Add Motorcycle</h2>
          <div class="form">
            <h2>Add Motorcycle</h2>
            <form class="create-form" @submit="${onSubmit}">
              <input
                type="text"
                name="model"
                id="model"
                placeholder="Model"
              />
              <input
                type="text"
                name="imageUrl"
                id="moto-image"
                placeholder="Moto Image"
              />
              <input
              type="number"
              name="year"
              id="year"
              placeholder="Year"
            />
            <input
            type="number"
            name="mileage"
            id="mileage"
            placeholder="mileage"
          />
          <input
            type="text"
            name="contact"
            id="contact"
            placeholder="contact"
          />
            <textarea
              id="about"
              name="about"
              placeholder="about"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Motorcycle</button>
            </form>
          </div>
        </section>
`;

export function createPage(ctx) {
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const model = data.get("model");
        const imageUrl = data.get("imageUrl");
        const year = data.get("year");
        const mileage = data.get("mileage");
        const contact = data.get("contact");
        const about = data.get("about");
        const ownerId = getUserData().localId;

        const motorcycle = {
            model,
            imageUrl,
            year,
            mileage,
            contact,
            about,
            ownerId
        };

        await createMotorcycle(motorcycle);

        e.target.reset();
        ctx.page.redirect("/dashboard");
    }
}