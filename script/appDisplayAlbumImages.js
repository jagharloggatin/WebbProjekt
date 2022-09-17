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

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.className = "checkbox";
    checkbox.id = src;
    div.appendChild(checkbox)





    // const imgTitleLabel = document.createElement('label');
    // imgTitleLabel.className = 'imgTitle';
    // imgTitleLabel.textContent = `${imgTitle}`;
    // div.appendChild(imgTitleLabel);
    //
    // const img = document.createElement('img');
    // img.src = src;
    // imgTitleLabel.appendChild(img);
    //
    // const input = document.createElement('input');
    // input.type="checkbox";


    const imgFlex = document.querySelector('.image-wrap');
    imgFlex.appendChild(div);
}




// const imgCommentDiv = document.createElement('div');
// imgCommentDiv.className = 'imgComment';
// imgCommentDiv.textContent = `${imgComment.substring(0,150)}....`;
// div.appendChild(imgCommentDiv);

// const breakLine = document.createElement('br');
// div.appendChild(breakLine);
