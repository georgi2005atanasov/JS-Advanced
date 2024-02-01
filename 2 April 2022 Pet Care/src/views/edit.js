import { html } from "../../node_modules/lit-html/lit-html.js";
import { getPetById, editPetById } from "../api/petService.js";
import { createSubmitHandler } from "../utility.js";

const editTemplate = (pet, onSubmit) => html`
        <section id="editPage">
            <form class="editForm" @submit="${onSubmit}">
                <img src="./images/editpage-dog.jpg">
                <div>
                    <h2>Edit PetPal</h2>
                    <div class="name">
                        <label for="name">Name:</label>
                        <input name="name" id="name" type="text" value="${pet.name}">
                    </div>
                    <div class="breed">
                        <label for="breed">Breed:</label>
                        <input name="breed" id="breed" type="text" value="${pet.breed}">
                    </div>
                    <div class="Age">
                        <label for="age">Age:</label>
                        <input name="age" id="age" type="text" value="${pet.age} years">
                    </div>
                    <div class="weight">
                        <label for="weight">Weight:</label>
                        <input name="weight" id="weight" type="text" value="${pet.weight}kg">
                    </div>
                    <div class="image">
                        <label for="image">Image:</label>
                        <input name="image" id="image" type="text" value="${pet.image}">
                    </div>
                    <button class="btn" type="submit">Edit Pet</button>
                </div>
            </form>
        </section>
`;

export async function editPage(ctx) {
    const pet = await getPetById(ctx.params.id);

    return ctx.render(editTemplate(pet, createSubmitHandler(ctx, onSubmit)));

    async function onSubmit(ctx, data, e) {
        e.target.reset();

        const name = data.name;
        const breed = data.breed;
        const age = data.age;
        const weight = data.weight;
        const image = data.image;
        const donation = pet.donation;
        const ownerId = pet.ownerId;

        const newPet = {
            name, breed, age, weight, image, ownerId, donation, _id: pet._id
        };

        await editPetById(newPet);

        ctx.page.redirect(`/details/${pet._id}`);
    }
}