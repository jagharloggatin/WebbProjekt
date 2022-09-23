//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict';  // Try without strict mode

//import * as proto from './picture-album-prototypes.js';
import * as lib from '../model/picture-library-browser.js';

const libraryJSON = "picture-library.json";
let library;

window.addEventListener('DOMContentLoaded', async () => {

    library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);

    for (const album of library.albums) {
        renderAlbums(`${album.title}`, `${album.headerImage}`, `${album.id}`, `${album.comment}`);
    }
});


//Renders albums
function renderAlbums(albumTitle, headerImage, id, albumComment) {
    const div = document.createElement('div');
    div.className = `album-item`;
    div.dataset.albumId = id;

    const a = document.createElement('a');
    a.className = "album-link";
    a.href = `pictureGallery.html`;

    const albumTitleDiv = document.createElement('p');
    albumTitleDiv.className = 'albumTitle';
    albumTitleDiv.textContent = `${albumTitle}`;
    div.appendChild(albumTitleDiv);

    const img = document.createElement('img');
    img.src = `${headerImage}`;
    a.appendChild(img);
    div.appendChild(a);

    const albumCommentDiv = document.createElement('div');
    albumCommentDiv.className = 'album-comment';
    albumCommentDiv.textContent = albumComment;

    div.appendChild(albumCommentDiv);

    const imgFlex = document.querySelector('.album-wrap');
    imgFlex.appendChild(div);

    a.addEventListener("click", () => {
        localStorage.setItem('selectedId', JSON.stringify(id))
    });
}