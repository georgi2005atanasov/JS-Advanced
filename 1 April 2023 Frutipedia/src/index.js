import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { getUserData, clearUserData } from "./utility.js";
import { homePage } from "./views/home.js";
import { loginPage, registerPage } from "./views/auth.js";
import { dashboardPage } from "./views/dashboard.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { searchPage } from "./views/search.js";

setUserNav();
const main = document.querySelector('main');

page("/", decorateContext, homePage);
page("/login", decorateContext, loginPage);
page("/register", decorateContext, registerPage);
page("/logout", decorateContext, onLogout);
page("/dashboard", decorateContext, dashboardPage);
page("/create", decorateContext, createPage);
page("/details/:id", decorateContext, detailsPage);
page("/edit/:id", decorateContext, editPage);
page("/search", decorateContext, searchPage)

page.start();

function decorateContext(ctx, next) {
    ctx.render = (template) => render(template, main);
    ctx.setUserNav = setUserNav;
    ctx.user = getUserData();
    next();
}

function setUserNav() {
    const user = getUserData();

    if (user) {
        document.querySelector(".user").style.display = "block";
        document.querySelector(".guest").style.display = "none";
    } else {
        document.querySelector(".guest").style.display = "block";
        document.querySelector(".user").style.display = "none";
    }
}

function onLogout(ctx) {
    clearUserData();
    setUserNav();
    ctx.page.redirect("/");
}