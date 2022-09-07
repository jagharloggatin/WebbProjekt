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

    const a = document.createElement('a');

    const img = document.createElement('img');
    img.src = src;

    a.appendChild(img);
    div.appendChild(a);

    const imgTitleDiv = document.createElement('div');
    imgTitleDiv.className = 'imgTitle';
    imgTitleDiv.textContent = `${imgTitle}`;
    div.appendChild(imgTitleDiv);

    const imgCommentDiv = document.createElement('div');
    imgCommentDiv.className = 'imgComment';
    imgCommentDiv.textContent = `${imgComment.substring(0,150)}....`;
    div.appendChild(imgCommentDiv);

    const breakLine = document.createElement('br');
    div.appendChild(breakLine);

    const imgFlex = document.querySelector('.image-wrap');
    imgFlex.appendChild(div);

    const lightbox = document.createElement('div')
lightbox.id = 'lightbox'
document.body.appendChild(lightbox)


}


const images = document.querySelectorAll('img')
images.forEach(image => {
  image.addEventListener('click', e => {
    lightbox.classList.add('active')
    const img = document.createElement('img')
    img.src = image.src
    while (lightbox.firstChild) {
      lightbox.removeChild(lightbox.firstChild)
    }
    lightbox.appendChild(img)
    
    
  })
})

lightbox.addEventListener('click', e => {
    if (e.target !== e.currentTarget) return
    lightbox.classList.remove('active')
  })

    img.addEventListener('click', () => {
        console.log(img.src);
        a.href=img.src;
    })


