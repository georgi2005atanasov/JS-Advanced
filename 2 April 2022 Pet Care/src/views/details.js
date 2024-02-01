import { html } from "../../node_modules/lit-html/lit-html.js";
import { getPetById, deletePetById, addDonation } from "../api/petService.js";
import { getUserData } from "../utility.js";

const detailsTemplate = (pet, isOwner, isLoggedIn, onDelete, userId, onDonate) => html`
<section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src="${pet.image}">
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${pet.name}</h1>
                        <h3>Breed: ${pet.breed}</h3>
                        <h4>Age: ${pet.age} years</h4>
                        <h4>Weight: ${pet.weight}kg</h4>
                        <h4 class="donation">Donation: ${(pet.donation.length - 1) * 100}$</h4>
                    </div>
                    <!-- if there is no registered user, do not display div-->
                    ${isLoggedIn ? html`
                    <div class="actionBtn">
                        ${isOwner ? html`
                        <a href="/edit/${pet._id}" class="edit">Edit</a>
                        <a href="javascript:void(0)" class="remove" @click="${onDelete}">Delete</a>` : 
                        html`${!pet.donation.includes(userId) ? html`
                        <a href="javascript:void(0)" class="donate" @click="${onDonate}">Donate</a>` : 
                        html``}
                        `}
                    </div>
                    ` : html``}
                </div>
            </div>
        </section>
`;

export async function detailsPage(ctx) {
    const petId = ctx.params.id;
    const pet = await getPetById(petId);
    let isOwner = false;
    let isLoggedIn = false;
    let userId = undefined;
    const user = getUserData();
    if (user) {
        isLoggedIn = true;
        userId = user.localId;
        if (user.localId == pet.ownerId) {
            isOwner = true;
        }
    }

    return ctx.render(detailsTemplate(pet, isOwner, isLoggedIn, onDelete, userId, onDonate));

    async function onDelete() {
        const confirmed = confirm("Are you sure you want to delete this item?");

        if (confirmed) {
            await deletePetById(pet._id);
            ctx.page.redirect("/dashboard");
        }
    }

    async function onDonate() {
        await addDonation(pet, pet._id, userId);
        return ctx.render(detailsTemplate(pet, isOwner, isLoggedIn, onDelete, userId, onDonate));
    }
}