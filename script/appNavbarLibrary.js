'use strict';

import * as lib from '../model/picture-library-browser.js';

const libraryJSON = "picture-library.json";
let library;


window.addEventListener('DOMContentLoaded', async () => {

    library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);

    for (const album of library.albums) {
        renderAlbumTitles(`${album.title}`, album.id);
    }

    // renderPictureRating();

    for (const album of library.albums) {
        for (const picture of album.pictures) {
            renderPictureRating(picture.rating)
        }
    }
});

function renderPictureRating(pictureRating) {

    const rank = document.querySelector('#dropdown-rating-links');
    // console.log(rank.textContent.charAt(0));
    for (let i = 0; i < rank.children.length; i++) {

        rank.children[i].addEventListener('click', function () {
            localStorage.setItem('ratedPicture', JSON.stringify(i+1));
        });
    }

    // localStorage.setItem('ratedPicture', JSON.stringify(rank.textContent.charAt(0)));


    // for (let i = 0; i < 3; i++) {
    //
    //     console.log(rank.children[i].textContent);
    //
    //     // rank[i].addEventListener('click', function(rank) {
    //     //     if(rank[i].getAttribute('data-value') === pictureRating){
    //     //         localStorage.setItem('ratedPicture', JSON.stringify(i));
    //     //     }
    //     // });
    // }

    // const r1 = document.querySelector('#dropdown-rating-links #r1');
    // const r2 = document.querySelector('#dropdown-rating-links #r2');
    // const r3 = document.querySelector('#dropdown-rating-links #r3');
    // const r4 = document.querySelector('#dropdown-rating-links #r4');
    // const r5 = document.querySelector('#dropdown-rating-links #r5');
    //
    // r1.getAttribute('data-value');
    // r2.getAttribute('data-value');
    // r3.getAttribute('data-value');
    // r4.getAttribute('data-value');
    // r5.getAttribute('data-value');
    //
    // r1.addEventListener("click", () => {
    //     localStorage.setItem('ratedAlbum', JSON.stringify(albumRating))
    // });

    // const ar = document.createElement('a');
    // ar.textContent = `${albumRating} ★`;
    // ar.href = "ratedPictures.html";
    //
    // ar.addEventListener("click", () => {
    //     localStorage.setItem('ratedAlbum', JSON.stringify(albumRating))
    // });
    //
    // const ratedAlbum = document.querySelector('#dropdown-rating-links');
    // ratedAlbum.appendChild(ar);
}

function renderAlbumTitles(title, albumId, albumRating) {

    const a = document.createElement('a');
    a.textContent = `${title}`;
    a.href = "pictureGallery.html";

    a.addEventListener("click", () => {
        localStorage.setItem('selectedId', JSON.stringify(albumId))
    });

    const album = document.querySelector('#dropdown-list');
    album.appendChild(a);


}

