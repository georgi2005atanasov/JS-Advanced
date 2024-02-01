import { html } from "../../node_modules/lit-html/lit-html.js";
import { getFruitById, deleteFruitById } from "../api/data.js";

window.deleteFruitById = deleteFruitById;
const detailsTemplate = (
    fruit,
    isOwner,
    fruitId,
    onDelete
) => html`<section id="details">
<div id="details-wrapper">
  <img id="details-img" src="${fruit.imageUrl}" alt="example1" />
  <p id="details-title">${fruit.title}</p>
  <div id="info-wrapper">
    <div id="details-description">
      <p>
      ${fruit.description}
      </p>
        <p id="nutrition">Nutrition</p>
        <p id = "details-nutrition">
            ${fruit.nutrition}
        </p>
    </div>
     <!--Edit and Delete are only for creator-->
    ${isOwner ? html`<div id="action-buttons">
      <a href="/edit/${fruitId}" id="edit-btn">Edit</a>
      <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
      </div>` :
        html``}
  </div>
</div>
</section>`;

export async function detailsPage(ctx) {
    const fruitId = ctx.params.id;
    const fruit = await getFruitById(fruitId);
    let isOwner = false;

    if (ctx.user.localId == fruit.ownerId) {
        isOwner = true;
    }

    return ctx.render(detailsTemplate(fruit, isOwner, fruitId, onDelete));

    async function onDelete() {
        const confirmed = confirm("Are you sure you want to delete this fruit?");
        if (confirmed) {
            await deleteFruitById(fruitId);
            ctx.page.redirect("/dashboard");
        }
    }
}