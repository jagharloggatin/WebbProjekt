//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict';  // Try without strict mode

//import * as proto from './picture-album-prototypes.js';
import * as lib from '../model/picture-library-browser.js';

const libraryJSON = "picture-library.json";
let library;


window.addEventListener('DOMContentLoaded', async () => {

    library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);

    for (const album of library.albums) {
        renderAlbums(`${album.title}`,`${album.headerImage}`, `${album.id}`, `${album.comment}`);
    }

});

function renderAlbums(title, headerImage, id, comment) {

    const div = document.createElement('div');
    div.className = `albumItem`;
    div.dataset.albumId = id;

    // const p = document.createElement('p');
    // p.textContent = `${title}`;
    // div.appendChild(p);

    // const p2 = document.createElement('p');
    // p2.textContent = `${comment}`;
    // div.appendChild(p2);
    const a = document.createElement('a');
    div.appendChild(a);
    a.className = "album-link";
    a.href = `pictureGallery.html`;

    a.addEventListener("click", () => {
        localStorage.setItem('selectedId', JSON.stringify(id))
    });

    const img = document.createElement('img');
    img.src = `${headerImage}`;
    a.appendChild(img);

    const imgFlex = document.querySelector('.albumContainer');
    imgFlex.appendChild(div);
}

