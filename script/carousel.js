'use strict';
import * as lib from '../model/picture-library-browser.js';

const libraryJSON = "picture-library.json";
let library;



window.addEventListener('DOMContentLoaded', async () => {

    const savedAlbumId = JSON.parse(localStorage.getItem("selectedId")) || []
    library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);

    for (const album of library.albums) {
            for (const picture of album.pictures) {
                renderImages(`${album.path}/${picture.imgLoRes}`, picture.id, picture.title, picture.comment);
            }
    }
});


function renderImages(src, tag, imgTitle, imgComment) {

    const img = document.createElement('img');
    img.src=src;

    const a = document.createElement('a');
    a.className="slide";
    a.href=src;
    a.appendChild(img);

    a.setAttribute('data-lightbox', 'models');
    a.setAttribute('data-title', `${imgTitle}`);

    const imgFlex = document.querySelector('.gallery');
    imgFlex.appendChild(a);


    // const slideWrap = document.querySelector('.slide-wrap');

    // li.appendChild(img);
    // const slideWrap = document.querySelector('.slide-wrap');
    // slideWrap.appendChild(li);

    //
    // const buttons = document.querySelectorAll("[data-carousel-button]")
    //
    // buttons.forEach(button => {
    //     button.addEventListener("click", () => {
    //         const offset = button.dataset.carouselButton === "next" ? 1 : -1
    //         const slides = button
    //             .closest("[data-carousel]")
    //             .querySelector("[data-slides]")
    //
    //         const activeSlide = slides.querySelector("[data-active]")
    //         let newIndex = [...slides.children].indexOf(activeSlide) + offset
    //         if (newIndex < 0) newIndex = slides.children.length - 1
    //         if (newIndex >= slides.children.length) newIndex = 0
    //
    //         slides.children[newIndex].dataset.active = true
    //         // delete activeSlide.dataset.active
    //     })
    // })

}




