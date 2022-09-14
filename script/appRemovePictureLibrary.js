'use strict';  // Try without strict mode

import * as lib from '../model/picture-library-browser.js';

const libraryJSON = "picture-library.json";
let library;


window.addEventListener('DOMContentLoaded', async () => {

    library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);

    for (const album of library.albums) {
        for (const picture of album.pictures) {
            renderRemovePicture(picture.title, picture.comment);
        }
    }
});

function renderRemovePicture(pictureTitle) {

    const option = document.createElement('option');
    option.textContent = pictureTitle;
    option.value = pictureTitle;

    const albumFlex = document.querySelector('#removePicList');
    albumFlex.appendChild(option);
}




