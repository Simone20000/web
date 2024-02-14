"use strict";

function createNavLinks(active) {
    return` <a class="nav-link ${active==='exams' ? 'active' : ''}" ${active==='exams' ? 'aria-current="page"' : ''} href="/exams">Esami</a>
    <a class="nav-link ${active==='courses' ? 'active' : ''}" ${active==='courses' ? 'aria-current="page"' : ''} href="/courses">Corsi</a>`
}

export default createNavLinks;