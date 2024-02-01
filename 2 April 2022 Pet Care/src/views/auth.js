import { html } from "../../node_modules/lit-html/lit-html.js";
import { clearUserData, createSubmitHandler } from "../utility.js";
import { login, register } from "../api/userService.js";
import { setUserData } from "../utility.js";

const loginTemplate = (onSubmit) => html`
<section id="loginPage">
    <form class="loginForm" @submit="${onSubmit}">
        <img src="./images/logo.png" alt="logo" />
        <h2>Login</h2>
        <div>
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>

        <div>
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Login</button>

        <p class="field">
            <span>If you don't have profile click <a href="/register">here</a></span>
        </p>
    </form>
</section>
`;

export function loginPage(ctx) {
    return ctx.render(loginTemplate(createSubmitHandler(ctx, onSubmit)));

    async function onSubmit(ctx, data, e) {
        const email = data.email;
        const password = data.password;

        if (!email || !password) {
            alert("Fill in the required fields for login!");
            return;
        }

        const user = await login(email, password);

        setUserData(user);
        e.target.reset();
        ctx.page.redirect("/");
    }
}

const registerTemplate = (onSubmit) => html`
<section id="registerPage">
            <form class="registerForm" @submit="${onSubmit}">
                <img src="./images/logo.png" alt="logo" />
                <h2>Register</h2>
                <div class="on-dark">
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div class="on-dark">
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <div class="on-dark">
                    <label for="repeatPassword">Repeat Password:</label>
                    <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Register</button>

                <p class="field">
                    <span>If you have profile click <a href="#">here</a></span>
                </p>
            </form>
</section>
`;

export function registerPage(ctx) {
    return ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)));

    async function onSubmit(ctx, data, e) {
        const email = data.email;
        const password = data.password;
        const rePassword = data.repeatPassword;

        if (!email || !password || !rePassword) {
            alert("Fill in the required fields for registration!");
            return;
        }
        if (password != rePassword) {
            alert("Passwords should match each other!");
            return;
        }
        
        const user = await register(email, password);

        setUserData(user);
        e.target.reset();
        ctx.page.redirect("/");
    }
}

export function onLogout(ctx) {
    clearUserData();
    ctx.page.redirect("/");
}