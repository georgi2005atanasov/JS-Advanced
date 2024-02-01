import { html } from '../../node_modules/lit-html/lit-html.js';
import { createOffer } from '../api/data.js';

const createTemplate = (onSubmit) => html`<section id="create">
<div class="form">
  <h2>Create Offer</h2>
  <form class="create-form" @submit=${onSubmit}>
    <input
      type="text"
      name="title"
      id="job-title"
      placeholder="Title"
    />
    <input
      type="text"
      name="imageUrl"
      id="job-logo"
      placeholder="Company logo url"
    />
    <input
      type="text"
      name="category"
      id="job-category"
      placeholder="Category"
    />
    <textarea
      id="job-description"
      name="description"
      placeholder="Description"
      rows="4"
      cols="50"
    ></textarea>
    <textarea
      id="job-requirements"
      name="requirements"
      placeholder="Requirements"
      rows="4"
      cols="50"
    ></textarea>
    <input
      type="text"
      name="salary"
      id="job-salary"
      placeholder="Salary"
    />

    <button type="submit">post</button>
  </form>
</div>
</section>`;

export async function createPage(ctx) {
    return ctx.render(createTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const data = new FormData(e.target);
        console.log(data);
        const title = data.get('title');
        const imageUrl = data.get('imageUrl');
        const category = data.get('category');
        const description = data.get('description');
        const requirements = data.get('requirements');
        const salary = data.get('salary');

        await createOffer({ title, imageUrl, category, description, requirements, salary, applications: ['randomId'] });

        e.target.reset();
        ctx.page.redirect('/dashboard');
    }
}