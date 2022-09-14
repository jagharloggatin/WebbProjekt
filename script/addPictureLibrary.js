//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict';  // Try without strict mode

//import * as proto from './picture-album-prototypes.js';
import * as lib from '../model/picture-library-browser.js';

const libraryJSON = "picture-library.json";
let library;


window.addEventListener('DOMContentLoaded', async () => {

    library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);

    for (const album of library.albums) {
        renderUploadPicture(album.title);
    }
});

function renderUploadPicture(albumTitle) {

    const option = document.createElement('option');
    option.textContent = albumTitle;
    option.value = albumTitle;

    const albumFlex = document.querySelector('#listAlbums');
    albumFlex.appendChild(option);
}




