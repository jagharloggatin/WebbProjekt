//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict';  // Try without strict mode

//import * as proto from './picture-album-prototypes.js';
import * as lib from '../model/picture-library-browser.js';

const libraryJSON = "picture-library.json";
let library;


window.addEventListener('DOMContentLoaded', async () => {

    library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);

    for (const album of library.albums) {
        for (const picture of album.pictures) {
            renderEditPicture(picture.title, picture.comment);
        }
    }
});

function renderEditPicture(pictureTitle) {

    const option = document.createElement('option');
    option.textContent = pictureTitle;
    option.value = pictureTitle;

    const albumFlex = document.querySelector('#pictureList');
    albumFlex.appendChild(option);

}




