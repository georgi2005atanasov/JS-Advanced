import { html } from "../../node_modules/lit-html/lit-html.js"
import { getMotorcycleById, deleteItemById } from "../api/data.js";
import { getUserData } from "../utility.js";

const detailsTemplate = (motorcycle, isOwner, onDelete) => html`
    <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${motorcycle.imageUrl}" alt="example1" />
            <p id="details-title">${motorcycle.model}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="year">Year: ${motorcycle.year}</p>
                <p class="mileage">Mileage: ${motorcycle.mileage} km.</p>
                <p class="contact">Contact Number: ${motorcycle.contact}</p>
                    <p id = "motorcycle-description">
                    ${motorcycle.about}
                    </p>
              </div>
            ${isOwner ? html`
                <div id="action-buttons">
                    <a href="/edit/${motorcycle._id}" id="edit-btn">Edit</a>
                    <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
                </div>` : 
                html``}
            </div>
        </div>
      </section>
`;

export async function detailsPage(ctx) {
    const _id = ctx.params.id;
    const motorcycle = await getMotorcycleById(_id);
    let isOwner = false;

    const user = getUserData();

    if (user) {
        if (motorcycle.ownerId == getUserData().localId) {
            isOwner = true;
        }
    }

    return ctx.render(detailsTemplate(motorcycle, isOwner, onDelete));

    async function onDelete() {
        let confirmed = confirm("Are you sure you want to delete this item?");
        if (confirmed) {
            await deleteItemById(motorcycle._id);
            ctx.page.redirect("/dashboard");
        }
    }
}