'use strict';

import * as lib from '../model/picture-library-browser.js';

const libraryJSON = "picture-library.json";
let library;


window.addEventListener('DOMContentLoaded', async () => {

    library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);

    for (const album of library.albums) {
        renderAlbumTitles(`${album.title}`, album.id);
    }
});

function renderAlbumTitles(title, albumId) {

    const a = document.createElement('a');
    a.textContent = `${title}`;
    a.href = "pictureGallery.html";

    a.addEventListener("click", () => {
        localStorage.setItem('selectedId', JSON.stringify(albumId))
    });

    const album = document.querySelector('#dropdown-list');
    album.appendChild(a);
}

