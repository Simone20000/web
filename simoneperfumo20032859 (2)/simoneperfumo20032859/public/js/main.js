"use strict";

import App from './app.js';

// getting the 3 containers
const appContainer = document.querySelector('#app');
const navbarUser=document.getElementById("login-area");
const footer = document.querySelector('#footer');

// creating our app
const app = new App(appContainer,navbarUser,footer);
