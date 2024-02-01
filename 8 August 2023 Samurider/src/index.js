import {render} from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { getUserData } from "./utility.js";
import { homePage } from "./views/home.js";
import { loginPage, registerPage } from "./views/auth.js";
import { clearUserData } from "./utility.js";
import { dashboardPage } from "./views/dashboard.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { searchPage } from "./views/search.js";
// import * as api from "./api/data.js"
// window.api = api;

setUserNav();
const mainElement = document.querySelector("main");

page("/", decorateContext, homePage);
page("/login", decorateContext, loginPage);
page("/register", decorateContext, registerPage);
page("/logout", decorateContext, onLogout);
page("/dashboard", decorateContext, dashboardPage);
page("/create", decorateContext, createPage);
page("/details/:id", decorateContext, detailsPage);
page("/edit/:id", decorateContext, editPage);
page("/search", decorateContext, searchPage);

page.start();

function decorateContext(ctx, next) {
    ctx.setUserNav = setUserNav;
    ctx.user = getUserData();
    ctx.render = (template) => render(template, mainElement);
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
    ctx.setUserNav();
    ctx.page.redirect("/");
}