import { html } from "../../node_modules/lit-html/lit-html.js";
import { editMotorcycleById, getMotorcycleById } from "../api/data.js";
import { getUserData } from "../utility.js";

const editTemplate = (onSubmit, motorcycle) => html`
    <section id="edit">
            <h2>Edit Motorcycle</h2>
            <div class="form">
              <h2>Edit Motorcycle</h2>
              <form class="edit-form" @submit="${onSubmit}">
                <input
                  type="text"
                  name="model"
                  id="model"
                  placeholder="Model"
                  value="${motorcycle.model}"
                />
                <input
                  type="text"
                  name="imageUrl"
                  id="moto-image"
                  placeholder="Moto Image"
                  value="${motorcycle.imageUrl}"
                />
                <input
                type="number"
                name="year"
                id="year"
                placeholder="Year"
                value="${motorcycle.year}"
              />
              <input
              type="number"
              name="mileage"
              id="mileage"
              placeholder="mileage"
              value="${motorcycle.mileage}"
            />
            <input
              type="number"
              name="contact"
              id="contact"
              placeholder="contact"
              value="${motorcycle.contact}"
            />
            <textarea
                id="about"
                name="about"
                placeholder="about"
                rows="10"
                cols="50"
            >${motorcycle.about}</textarea>
            <button type="submit">Edit Motorcycle</button>
            </form>
        </div>
    </section>
`;

export async function editPage(ctx) {
    const motorcycleId = ctx.params.id;
    const motorcycle = await getMotorcycleById(motorcycleId);
    return ctx.render(editTemplate(onSubmit, motorcycle));

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

        await editMotorcycleById(motorcycle, motorcycleId);
        
        e.target.reset();
        ctx.page.redirect(`/details/${motorcycleId}`);
    }
}