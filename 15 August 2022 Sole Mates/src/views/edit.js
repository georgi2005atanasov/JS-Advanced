import { html } from "../../node_modules/lit-html/lit-html.js";
import { getShoeById, editShoeById } from "../api/shoesService.js";
import { createSubmitHandler, getUserData } from "../utility.js";

const editTemplate = (onSubmit, shoe) => html`
<section id="edit">
          <div class="form">
            <h2>Edit item</h2>
            <form class="edit-form" @submit=${onSubmit}>
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
                value="${shoe.brand}"
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
                value="${shoe.model}"
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
                value="${shoe.imageUrl}"
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
                value="${shoe.release}"
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
                value="${shoe.designer}"
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
                value="${shoe.value}"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
`;

export async function editPage(ctx) {
    const shoeId = ctx.params.id;
    const shoe = await getShoeById(shoeId);

    return ctx.render(editTemplate(createSubmitHandler(ctx, onSubmit), shoe));
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

        await editShoeById(shoe, shoeId);

        ctx.page.redirect(`/details/${shoeId}`);
    }
}