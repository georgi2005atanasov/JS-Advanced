import { html } from "../../node_modules/lit-html/lit-html.js";
import { addFruit } from "../api/data.js";

const createTemplate = (onSubmit) => html`<section id="create">
<div class="form">
  <h2>Add Fruit</h2>
  <form class="create-form" @submit="${onSubmit}">
    <input
      type="text"
      name="name"
      id="name"
      placeholder="Fruit Name"
    />
    <input
      type="text"
      name="imageUrl"
      id="Fruit-image"
      placeholder="Fruit Image"
    />
    <textarea
    id="fruit-description"
    name="description"
    placeholder="Description"
    rows="10"
    cols="50"
  ></textarea>
  <textarea
    id="fruit-nutrition"
    name="nutrition"
    placeholder="Nutrition"
    rows="10"
    cols="50"
  ></textarea>
    <button type="submit">Add Fruit</button>
  </form>
</div>
</section>`;

export async function createPage(ctx) {
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const data = new FormData(e.target);
        const name = data.get('name');
        const imageUrl = data.get('imageUrl');
        const description = data.get('description');
        const nutrition = data.get('nutrition');
        const ownerId = ctx.user.localId;

        const fruit = {
            name, imageUrl, description, nutrition, ownerId
        };

        await addFruit(fruit);

        e.target.reset();
        ctx.page.redirect("/dashboard");
    }
}