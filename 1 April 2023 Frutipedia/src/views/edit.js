import { html } from "../../node_modules/lit-html/lit-html.js";
import { getFruitById, editFruitById } from "../api/data.js";

const editTemplate = (onSubmit, fruit) => html`<section id="edit">
<div class="form">
  <h2>Edit Fruit</h2>
  <form class="edit-form" @submit="${onSubmit}">
    <input
      type="text"
      name="name"
      id="name"
      placeholder="Fruit Name"
      value="${fruit.name}"
    />
    <input
      type="text"
      name="imageUrl"
      id="Fruit-image"
      placeholder="Fruit Image URL"
      value="${fruit.imageUrl}"
    />
    <textarea
      id="fruit-description"
      name="description"
      placeholder="Description"
      rows="10"
      cols="50"
    >${fruit.description}</textarea>
    <textarea
      id="fruit-nutrition"
      name="nutrition"
      placeholder="Nutrition"
      rows="10"
      cols="50"
    >${fruit.nutrition}</textarea>
    <button type="submit">post</button>
  </form>
</div>
</section>`;

export async function editPage(ctx) {
    const fruit = await getFruitById(ctx.params.id);

    ctx.render(editTemplate(onSubmit, fruit));

    async function onSubmit(e) {
        e.preventDefault();

        const data = new FormData(e.target);
        const name = data.get('name');
        const imageUrl = data.get('imageUrl');
        const description = data.get('description');
        const nutrition = data.get('nutrition');
        const ownerId = ctx.user.localId;
        const fruitId = ctx.params.id;
        const fruit = {
            name, imageUrl, description, nutrition, ownerId
        };

        await editFruitById(fruitId, fruit);

        e.target.reset();
        ctx.page.redirect(`/details/${fruitId}`);
    }
}