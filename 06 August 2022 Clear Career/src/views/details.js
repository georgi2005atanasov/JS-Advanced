import { html } from '../../node_modules/lit-html/lit-html.js'
import { deleteOffer, getOffer, addApplicant } from '../api/data.js';
import { getUserData } from '../utility.js';

const detailsTemplate = (
  offer,
  offerId,
  isLoggedIn,
  isCreator,
  onDelete,
  onApply,
  userId,
  applicationsCount) => html`<section id="details">
<div id="details-wrapper">
  <img id="details-img" src="./images/example2.png" alt="example1" />
  <p id="details-title">${offer.title}</p>
  <p id="details-category">
    Category: <span id="categories">${offer.category}</span>
  </p>
  <p id="details-salary">
    Salary: <span id="salary-number">${offer.salary}</span>
  </p>
  <div id="info-wrapper">
    <div id="details-description">
      <h4>Description</h4>
      <span
        >${offer.description}</span
      >
    </div>
    <div id="details-requirements">
      <h4>Requirements</h4>
      <span
        >${offer.requirements}</span
      >
    </div>
  </div>
  <p>Applications: <strong id="applications">${applicationsCount}</strong></p>
${isLoggedIn
      ? html`
      <div id="action-buttons">
          ${isCreator
          ? html`
                <a href="/edit/${offerId}" id="edit-btn">Edit</a>
                <a href="javascript:void(0)" id="delete-btn" @click="${onDelete}">Delete</a>`
          : (offer.applications.includes(userId)
            ? html``
            : html`<a href="javascript:void(0)" id="apply-btn" @click="${onApply}">Apply</a>`)
        }
      </div>`
      : html``
    }`;

export async function detailsPage(ctx) {
  const offerId = ctx.params.id;
  const offer = await getOffer(offerId);
  const isLoggedIn = getUserData();

  let isCreator = false;
  if (isLoggedIn.localId == offer.ownerId) {
    isCreator = true;
  }
  const userId = getUserData().localId;
  const applicationsCount = offer.applications.length - 1;

  ctx.render(detailsTemplate(offer, offerId, isLoggedIn, isCreator, onDelete, onApply, userId, applicationsCount));

  async function onDelete() {
    const confirmed = confirm('Are you sure you want to delete this offer?');
    if (confirmed) {
      await deleteOffer(offerId);
      ctx.page.redirect('/dashboard');
    }
  }

  async function onApply(e) {
    e.preventDefault();
    await addApplicant(userId, offerId);
    ctx.page.redirect(`/details/${offerId}`);
  }
}