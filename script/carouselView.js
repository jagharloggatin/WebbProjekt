'use strict';


import * as lib from '../model/picture-library-browser.js';

const libraryJSON = "picture-library.json";
let library;

let slideImages = [];
let i = 0;

window.addEventListener('DOMContentLoaded', async () => {

    let imageSlide = JSON.parse(sessionStorage.getItem("imageInfo")) || []
    const resolution = JSON.parse(localStorage.getItem("resolution")) || []

    console.log(imageSlide.length)
    console.log("imgSlide:" +  imageSlide);

    library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);

    for (const album of library.albums) {
        for (const picture of album.pictures) {
            imageSlide.forEach(function (picId) {
                if (picId === picture.id) {
                    console.log("FOUND")

                    if (typeof picture.imgLoRes === 'undefined') {
                        let index = imageSlide.indexOf('undefined')
                        console.log(index)
                        imageSlide.splice(index, 1);
                        console.log(imageSlide);

                    } else {
                        if (resolution === "lowRes" || resolution.length === 0) {
                            slideImages.push(`${album.path}/${picture.imgLoRes}`)
                        }
                        if (resolution === "highRes") {
                            slideImages.push(`${album.path}/${picture.imgHiRes}`)
                        }
                    }
                }
            });
        }
    }
    renderImages();
});

function renderImages() {

    const imageList = document.querySelector(`.slide`);

    const img = document.createElement('img');
    img.className = 'images'

    img.src = slideImages[0]

    imageList.appendChild(img);

    const imgFlex = document.querySelector('.slide');
    imgFlex.appendChild(img);

    const prev = document.querySelector(".prev")
    const next = document.querySelector(".next")

    next.addEventListener('click', () => {
        if (i >= slideImages.length - 1)
            i = -1;
        img.src = slideImages[++i];
    });

    prev.addEventListener('click', () => {
        if (i <= 0)
            i = slideImages.length;


        img.src = slideImages[--i];
    });
}


// buttons.forEach(button => {
//     button.addEventListener("click", () => {
//         const offset = button.dataset.carouselButton === "next" ? 1 : -1
//
//         // const offset = button.dataset.carouselButton === "next" ? 1 : -1
//         // const slides = button
//         //     .closest("[data-carousel]")
//         //     .querySelector("[data-slides]")
//         //
//         // const activeSlide = slides.querySelector("[data-active]")
//         // let newIndex = [...slides.children].indexOf(activeSlide) + offset
//         // if (newIndex < 0) newIndex = slides.children.length - 1
//         // if (newIndex >= slides.children.length) newIndex = 0
//         //
//         // slides.children[newIndex].dataset.active = true
//         // delete activeSlide.dataset.active
//     })
// })
