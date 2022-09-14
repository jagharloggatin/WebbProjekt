'use strict';
import * as lib from '../model/picture-library-browser.js';

const libraryJSON = "picture-library.json";
let library;

window.addEventListener('DOMContentLoaded', async () => {

    const savedAlbumId = JSON.parse(localStorage.getItem("selectedId")) || []
    library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);

    for (const album of library.albums) {
        if (album.id === savedAlbumId) {
            for (const picture of album.pictures) {
                renderImages(`${album.path}/${picture.imgLoRes}`, picture.id, picture.title, picture.comment);
            }
        }
    }


});


function renderImages(src, tag, imgTitle, imgComment) {

    const container = document.createElement('div');
    container.id = '';

    const div = document.createElement('div');
    div.className = `image-item`;
    div.dataset.albumId = tag;
    container.appendChild(div);

    const img = document.createElement('img');
    img.src = src;

   
    const a = document.createElement('a');
    a.className="slide";
    a.href=src;
    a.appendChild(img);

    a.setAttribute('data-lightbox', 'gallery');
    a.setAttribute('data-title', `${imgTitle}`);


    
    
    div.appendChild(a);

   

    const imgTitleDiv = document.createElement('div');
    imgTitleDiv.className = 'imgTitle';
    imgTitleDiv.textContent = `${imgTitle}`;
    div.appendChild(imgTitleDiv);

    const imgCommentDiv = document.createElement('div');
    imgCommentDiv.className = 'imgComment';
    imgCommentDiv.textContent = `${imgComment}`;
    container.appendChild(imgCommentDiv);

    const imgFlex = document.querySelector('.image-wrap');
    imgFlex.appendChild(container);

    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    window.document.body.appendChild(lightbox)
    
   /* img.addEventListener('click',()=>{
        console.log(img.src);
       a.href = img.src;
       
        })*/
        

    }

    
        