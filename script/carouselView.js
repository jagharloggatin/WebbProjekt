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

    //const a = document.createElement('a');
    const img = document.createElement('img');
    img.src = src;
    div.appendChild(img);
    //div.appendChild(a);

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
   
    //img.addEventListener('click',()=>{
    //console.log(img.src);
   // a.href = img.src;
   // })

   const lightbox = document.createElement('div')
   lightbox.id = 'lightbox'
   document.body.appendChild(lightbox)
   
   const carouselactions = document.createElement('div');
   carouselactions.className= 'carousel-actions';
   lightbox.appendChild(carouselactions);

   const buttonprev = document.createElement('button');
   buttonprev.id ='carousel-button-prev';
   carouselactions.appendChild(buttonprev);

   
   


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
   };
   
   nextButton.addEventListener("click", plusSlides(1));
   prevButton.addEventListener("click", plusSlides(-1));





const nextButton = document.getElementById("carousel-button-next");
const prevButton = document.getElementById("carousel-button-prev");

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}


function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("active");
  
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  
  slides[slideIndex-1].style.display = "block";
  
}