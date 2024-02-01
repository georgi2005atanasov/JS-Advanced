import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { getUserData } from "../utility.js";

const navigationTemplate = (user) => html`
<ul>
    <li><a href="/">Home</a></li>
    <li><a href="/dashboard">Dashboard</a></li>
    ${user ? html`
        <li><a href="/create">Create Postcard</a></li>
        <li><a href="/logout">Logout</a></li>
    ` : html`
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>
    `}
</ul>
`;

const headerElement = document.querySelector("header nav");
const mainElement = document.querySelector("#content");

function renderPage(template) {
    const user = getUserData();
    render(navigationTemplate(user), headerElement);
    render(template, mainElement);
}

export function addRender(ctx, next) {
    ctx.render = renderPage;
    next();
}