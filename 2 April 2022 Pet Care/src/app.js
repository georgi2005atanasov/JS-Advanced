import page from "../node_modules/page/page.mjs";
import { addRender } from "./middleware/renderMiddleware.js";
import { homePage } from "./views/home.js";
import { loginPage, registerPage, onLogout } from "./views/auth.js";
import { createPage } from "./views/create.js";
import { dashboardPage } from "./views/dashboard.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";

page(addRender);
page("/", homePage);
page("/login", loginPage);
page("/register", registerPage);
page("/logout", onLogout);
page("/create", createPage);
page("/dashboard", dashboardPage);
page("/details/:id", detailsPage);
page("/edit/:id", editPage);

page.start();