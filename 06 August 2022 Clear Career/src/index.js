import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { getUserData, clearUserData } from './utility.js'
import { homePage } from './views/home.js';
import { loginPage, registerPage } from './views/auth.js';
import { createPage } from './views/create.js';
import { dashboardPage } from './views/dashboard.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';

setUserNav();

page('/', decorateContext, homePage);
page('/login', decorateContext, loginPage);
page('/logout', decorateContext, onLogout);
page('/register', decorateContext, registerPage);
page('/create', decorateContext, createPage);
page('/dashboard', decorateContext, dashboardPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);

function decorateContext(ctx, next) {
    ctx.render = (template) => render(template, document.querySelector('main'));
    ctx.setUserNav = setUserNav;
    ctx.user = getUserData();
    next();
}

page.start();

function setUserNav() {
    const user = getUserData();

    if (user) {
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}

async function onLogout() {
    clearUserData();
    setUserNav();
    page.redirect('/');
}