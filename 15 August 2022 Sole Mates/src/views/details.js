import { html } from "../../node_modules/lit-html/lit-html.js";
import { getShoeById, deleteShoeById } from "../api/shoesService.js";
import { getUserData } from "../utility.js";

const detailsTemplate = (shoe, isCreator, onDelete) => html`
<section id="details">
          <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
              <img src="${shoe.imageUrl}" alt="example1" />
            </div>
            <div id="info-wrapper">
              <p>Brand: <span id="details-brand">${shoe.brand}</span></p>
              <p>
                Model: <span id="details-model">${shoe.model}</span>
              </p>
              <p>Release date: <span id="details-release">${shoe.release}</span></p>
              <p>Designer: <span id="details-designer">${shoe.designer}</span></p>
              <p>Value: <span id="details-value">${shoe.value}</span></p>
            </div>

            ${isCreator ? html`
            <div id="action-buttons">
              <a href="/edit/${shoe._id}" id="edit-btn">Edit</a>
              <a href="javascript:void(0)" id="delete-btn" @click="${onDelete}">Delete</a>
            </div>` : html``}
          </div>
</section>
`;

export async function detailsPage(ctx) {
    const shoe = await getShoeById(ctx.params.id);
    let isCreator = false;
    const user = getUserData();
    if (user) {
        if (user.localId == shoe.ownerId) {
            isCreator = true;
        }
    }
    return ctx.render(detailsTemplate(shoe, isCreator, onDelete));

    async function onDelete() {
        let confirmed = confirm("Are you sure you want to delete this shoe?");

        if (confirmed) {
            await deleteShoeById(shoe._id);
            ctx.page.redirect("/dashboard");
        }
    }

}