import { html } from "../../node_modules/lit-html/lit-html.js";
import { login, register } from "../api/authService.js";
import { createSubmitHandler, clearUserData } from "../utility.js";

const loginTemplate = (onSubmit) => html`
<section id="login">
          <div class="form">
            <h2>Login</h2>
            <form class="login-form" @submit="${onSubmit}">
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
</section>
`;

export async function loginPage(ctx) {
    return ctx.render(loginTemplate(createSubmitHandler(ctx, onSubmit)));

    async function onSubmit(ctx, data, e) {
        const email = data.email;
        const password = data.password;

        if (!email || !password) {
            alert("Invalid email/password!");
            return;
        }
        
        await login(email, password);

        e.target.reset();
        ctx.page.redirect("/dashboard");
    }
}

const registerTemplate = (onSubmit) => html`
<section id="register">
          <div class="form">
            <h2>Register</h2>
            <form class="login-form" @submit="${onSubmit}">
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">login</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
</section>
`;

export async function registerPage(ctx) {
    return ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)));

    async function onSubmit(ctx, data, e) {
        const email = data.email;
        const password = data.password;
        const repassword = data["re-password"];

        if (!email || !password || !repassword) {
            alert("Invalid email/password!");
            return;
        }
        if (password != repassword) {
            alert("Both passwords should be equal to each other!");
            return;
        }
        
        await register(email, password);

        e.target.reset();
        ctx.page.redirect("/dashboard");
    }
}

export function onLogout(ctx) {
    clearUserData();
    ctx.page.redirect("/");
}