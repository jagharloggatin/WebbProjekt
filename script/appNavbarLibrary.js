'use strict';

import * as lib from '../model/picture-library-browser.js';

const libraryJSON = "picture-library.json";
let library;


window.addEventListener('DOMContentLoaded', async () => {

    library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);

    for (const album of library.albums) {
        renderAlbumTitles(`${album.title}`, album.id);
    }
    renderPictureRating()
});

function renderPictureRating() {

    const rank = document.querySelector('#dropdown-rating-links');
    // console.log(rank.textContent.charAt(0));
    for (let i = 0; i < rank.children.length; i++) {
        rank.children[i].addEventListener('click', function () {
            localStorage.setItem('ratedPicture', JSON.stringify(i+1));
        });
    }
}

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

