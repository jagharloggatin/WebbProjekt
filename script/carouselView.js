'use strict';


import * as lib from '../model/picture-library-browser.js';

const libraryJSON = "picture-library.json";
let library;

window.addEventListener('DOMContentLoaded', async () => {

    const imageSlide = JSON.parse(localStorage.getItem("imageInfo"))||[]

      for(let i = 0; i < imageSlide ; i ++){
        mySlide = imageSlide[i].pickedImage.src;
        console.log(mySlide);
      }
    
    library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);

    for (const album of library.album.picture) {
        if (pictures.id === mySlide) {
            for (const picture of album.pictures) {
                renderImages(`${album.path}/${picture.imgHiRes}`, picture.id, picture.title, picture.comment);
            }
        }

    }
    // for (const album of library.albums) {
    //     if (album.id === savedAlbumId) {
    //         for (const picture of album.pictures) {
    //             renderImages(`${album.path}/${picture.imgHiRes}`, picture.id, picture.title, picture.comment);
    //         }
    //     }
    // }
});


function renderImages(src, tag, imgTitle, imgComment) {

  const imageList = document.querySelector(`.slide`);
    
    
    const img = document.createElement('img');
    img.className = 'images'
    
    img.src = src;
    imageList.appendChild(img);


    const imgflex = document.querySelector('.slide');
    imgflex.appendChild(img);
}

const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]")

    const activeSlide = slides.querySelector("[data-active]")
    let newIndex = [...slides.children].indexOf(activeSlide) + offset
    if (newIndex < 0) newIndex = slides.children.length - 1
    if (newIndex >= slides.children.length) newIndex = 0

    slides.children[newIndex].dataset.active = true
    delete activeSlide.dataset.active
  })
})
