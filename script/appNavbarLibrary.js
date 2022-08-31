'use strict';

import * as lib from '../model/picture-library-browser.js';

const libraryJSON = "picture-library.json";
let library;


window.addEventListener('DOMContentLoaded', async () => {

    library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);  //reading library from JSON on local server

    for (const album of library.albums) {
        renderAlbumTitles(`${album.title}`);
    }


    // navBarHoverEffect();
    // navBarDropDown();
    // navBarToggle();

});

// window.addEventListener('DOMContentLoaded', async () => {
//     window.document.querySelector()
// })


function navBarHoverEffect() {
    let navbarAnchor = window.document.querySelectorAll(".navbar-links ul li a");
    let navbarLi = window.document.querySelectorAll(".navList");


    for (let i = 0; i < navbarAnchor.length; i++) {
        navbarLi[i].addEventListener("mouseover", function(){
            navbarAnchor[i].style.color = "white";
        });

        navbarLi[i].addEventListener("mouseout", async function(){
            navbarAnchor[i].style.color = "#444040";
        });
    }

}

function navBarToggle() {
    const toggleButton = document.getElementsByClassName('toggle-button')[0];
    const navbarLinks = document.getElementsByClassName('navbar-links')[0];

    toggleButton.addEventListener('click', async function () {
        navbarLinks.classList.toggle("active");
        toggleButton.classList.toggle("active");
    });

}

function renderAlbumTitles(title) {

    const a = document.createElement('a');
    a.textContent = `${title}`;
    a.href = "#";

    const album = document.querySelector('#dropdown-list');
    album.appendChild(a);
}

function navBarDropDown() {
    let dropdownLink = document.getElementById("albumLinks");
    let dropdownMenu = document.getElementById("dropdown-menu")


        dropdownLink.addEventListener("mouseover", async function () {
            dropdownMenu.style.opacity = "1";
        });

        dropdownLink.addEventListener("mouseleave", async function () {
            dropdownMenu.style.opacity = "0";
        });
}