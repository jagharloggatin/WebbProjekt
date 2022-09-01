'use strict';
import * as lib from '../model/picture-library-browser.js';

const libraryJSON = "picture-library.json";
let library;

window.addEventListener('DOMContentLoaded', async () => {

    const savedAlbumId = JSON.parse(localStorage.getItem("selectedId")) || []
    library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);

    for (const album of library.albums) {
        if(album.id === savedAlbumId){
            for (const picture of album.pictures) {
                renderImages(`${album.path}/${picture.imgLoRes}`, picture.id, picture.title, picture.comment);
            }
        }
    }
});

function renderImages(src, tag, imgTitle, imgComment) {

    const div = document.createElement('div');
    div.className = `image-item`;
    div.dataset.albumId = tag;

    const img = document.createElement('img');
    img.src = src;
    div.appendChild(img);

    const imgTitleDiv = document.createElement('div');
    imgTitleDiv.className = 'imgTitle';
    imgTitleDiv.textContent = `${imgTitle}`;
    div.appendChild(imgTitleDiv);

    const imgCommentDiv = document.createElement('div');
    imgCommentDiv.className = 'imgComment';
    imgCommentDiv.textContent = imgComment;
    div.appendChild(imgCommentDiv);

    const breakLine = document.createElement('br');
    div.appendChild(breakLine);


    const imgFlex = document.querySelector('.image-wrap');
    imgFlex.appendChild(div);
};



