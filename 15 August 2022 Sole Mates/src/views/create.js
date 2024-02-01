import { html } from "../../node_modules/lit-html/lit-html.js";
import { createSubmitHandler, getUserData } from "../utility.js";
import { createShoe } from "../api/shoesService.js";

const createTemplate = (onSubmit) => html`
<section id="create">
          <div class="form">
            <h2>Add item</h2>
            <form class="create-form" @submit="${onSubmit}">
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
              />

              <button type="submit">post</button>
            </form>
          </div>
</section>
`;

export function createPage(ctx) {
    return ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)));

    async function onSubmit(ctx, data, e) {
        const brand = data.brand;
        const model = data.model;
        const imageUrl = data.imageUrl;
        const release = data.release;
        const designer = data.designer;
        const value = data.value;
        const ownerId = getUserData().localId;

        const shoe = {
            brand,
            model,
            imageUrl,
            release,
            designer,
            value,
            ownerId
        };

        await createShoe(shoe);

        e.target.reset();

        ctx.page.redirect("/dashboard");
    }
}