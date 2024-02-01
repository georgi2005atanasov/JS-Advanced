import { html } from '../../node_modules/lit-html/lit-html.js'
import { editOffer, getOffer } from '../api/data.js';

const editTemplate = (onSubmit, offer) => html`<section id="edit">
<div class="form">
  <h2>Edit Offer</h2>
  <form class="edit-form" @submit=${onSubmit}>
    <input
      type="text"
      name="title"
      id="job-title"
      placeholder="Title"
      value="${offer.title}"
    />
    <input
      type="text"
      name="imageUrl"
      id="job-logo"
      placeholder="Company logo url"
      value="${offer.imageUrl}"
    />
    <input
      type="text"
      name="category"
      id="job-category"
      placeholder="Category"
      value="${offer.category}"
    />
    <textarea
      id="job-description"
      name="description"
      placeholder="Description"
      rows="4"
      cols="50"
    >${offer.description}</textarea>
    <textarea
      id="job-requirements"
      name="requirements"
      placeholder="Requirements"
      rows="4"
      cols="50"
    >${offer.requirements}</textarea>
    <input
      type="text"
      name="salary"
      id="job-salary"
      placeholder="Salary"
      value="${offer.salary}"
    />
    <button type="submit">post</button>
  </form>
</div>
</section>`;

export async function editPage(ctx) {
    const offer = await getOffer(ctx.params.id);
    const offerId = ctx.params.id;

    ctx.render(editTemplate(onSubmit, offer));

    async function onSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const title = data.get('title');
        const imageUrl = data.get('imageUrl');
        const category = data.get('category');
        const description = data.get('description');
        const requirements = data.get('requirements');
        const salary = data.get('salary');
        const applications = offer.applications;
        const ownerId = offer.ownerId;

        const newOffer = {
            title,
            imageUrl,
            category,
            description,
            requirements,
            salary,
            applications,
            ownerId
        };

        await editOffer(offerId, newOffer);
        e.target.reset();
        ctx.page.redirect(`/details/${offerId}`);
    }
}