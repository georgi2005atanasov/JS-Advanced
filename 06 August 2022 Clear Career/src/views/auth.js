import { html } from '../../node_modules/lit-html/lit-html.js';
import { login, register } from '../api/api.js';

const loginTemplate = (onSubmit) => html`<section id="login">
<div class="form">
  <h2>Login</h2>
  <form class="login-form" @submit=${onSubmit})}>
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
</section>`;

export async function loginPage(ctx) {
  return ctx.render(loginTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get('email');
    const password = data.get('password');

    if (email == '' || password == '') {
      alert('You must have to fill the fields!');
      return;
    }

    try {
      await login(email, password);
      e.target.reset();
      ctx.setUserNav();
      ctx.page.redirect('/');
    } catch (error) {
      console.log(error);
    }

  }
}

const registerTemplate = (onSubmit) => html`<section id="register">
<div class="form">
  <h2>Register</h2>
  <form class="login-form" @submit=${onSubmit}>
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
    <button type="submit">register</button>
    <p class="message">Already registered? <a href="/login">Login</a></p>
  </form>
</div>
</section>`;

export async function registerPage(ctx) {
  return ctx.render(registerTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get('email');
    const password = data.get('password');
    const rePassword = data.get('re-password');

    if (password != rePassword) {
      alert('Passwords should match!');
      return;
    }

    await register(email, password);
    e.target.reset();
    ctx.setUserNav();
    ctx.page.redirect('/');
  }
}