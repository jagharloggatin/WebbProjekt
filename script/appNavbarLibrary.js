'use strict';

import * as lib from '../model/picture-library-browser.js';

const libraryJSON = "picture-library.json";
let library;


window.addEventListener('DOMContentLoaded', async () => {

    library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);

    for (const album of library.albums) {
        renderAlbumTitles(`${album.title}`);
    }
});

function renderAlbumTitles(title) {

    const a = document.createElement('a');
    a.textContent = `${title}`;
    a.href = "#";

    const album = document.querySelector('#dropdown-list');
    album.appendChild(a);
}

