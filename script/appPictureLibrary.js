'use strict';
import * as lib from '../model/picture-library-browser.js';

const libraryJSON = "picture-library.json";
let library;

window.addEventListener('DOMContentLoaded', async () => {

    library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);

    for (const album of library.albums) {
        renderImage(album.headerImage, album.id);

        for (const picture of album.pictures) {
            renderImage(`${album.path}/${picture.imgLoRes}`, picture.id);
            renderImage(`${album.path}/${picture.imgHiRes}`, picture.id);
        }
    }
});

//Render the images
function renderImage(src, tag) {

    const div = document.createElement('div');
    div.className = `image-item`;
    div.dataset.albumId = tag;

    const img = document.createElement('img');
    img.src = src;
    div.appendChild(img);

    const imgFlex = document.querySelector('.image-wrap');
    imgFlex.appendChild(div);
};

