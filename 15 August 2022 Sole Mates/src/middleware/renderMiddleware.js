import { render, html } from "../../node_modules/lit-html/lit-html.js";
import { getUserData } from "../utility.js";

const navTemplate = (user) => html`
    <nav>
          <div>
            <a href="/dashboard">Dashboard</a>
            <a href="/search">Search</a>
          </div>

          ${user ? html`
          <div class="user">
            <a href="/create">Add Pair</a>
            <a href="/logout">Logout</a>
          </div>
          ` : html`
          <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>
          `}
    </nav>
`;

const headerElement = document.querySelector("#wrapper header");
const mainElement = document.querySelector("#wrapper main");

function renderContent(template) {
    const user = getUserData();
    render(navTemplate(user), headerElement);
    render(template, mainElement);
}

export function addRender(ctx, next) {
    ctx.render = renderContent;
    next();
}