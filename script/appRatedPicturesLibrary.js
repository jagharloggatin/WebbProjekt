'use strict';
import * as lib from '../model/picture-library-browser.js';

const libraryJSON = "picture-library.json";
let library;

window.addEventListener('DOMContentLoaded', async () => {

    library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);
    const ratedPicture = JSON.parse(localStorage.getItem("ratedPicture")) || []
    console.log(ratedPicture)
    for (const album of library.albums) {
        for (const picture of album.pictures) {
            if(ratedPicture == picture.rating){
                renderImages(`${album.path}/${picture.imgLoRes}`, picture.id, picture.title, picture.comment);
            }
        }
    }
});

function renderImages(src, id, imgTitle, imgComment) {

    const container = document.createElement('div');
    container.className = "image-item"

    const img = document.createElement('img');
    img.src = src;
    container.appendChild(img);

    const albumFlex = document.querySelector('.image-wrap');
    albumFlex.appendChild(container);

}