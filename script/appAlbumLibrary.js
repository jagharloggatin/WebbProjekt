//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict';  // Try without strict mode

//import * as proto from './picture-album-prototypes.js';
import * as lib from '../model/picture-library-browser.js';

const libraryJSON = "picture-library.json";
let library;  //Global varibale, Loaded async from the current server in window.load event


window.addEventListener('DOMContentLoaded', async () => {

    library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);  //reading library from JSON on local server

    for (const album of library.albums) {
        renderAlbums(`${album.title}`,`${album.headerImage}`, `${album.id}`, `${album.comment}`);
    }
});

function renderAlbums(title, headerImage, id, comment) {

    const div = document.createElement('div');
    div.className = `albumItem`;
    div.dataset.albumId = id;

    const p = document.createElement('p');
    p.textContent = `${title}`;
    div.appendChild(p);

    const p2 = document.createElement('p');
    p2.textContent = `${comment}`;
    div.appendChild(p2);

    const img = document.createElement('img');
    img.src = `${headerImage}`;
    div.appendChild(img);

    const imgFlex = document.querySelector('.albumContainer');
    imgFlex.appendChild(div);
}

