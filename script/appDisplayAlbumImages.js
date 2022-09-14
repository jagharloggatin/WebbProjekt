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
    container.id = 'imgAndCommentContainer';

    const div = document.createElement('div');
    div.className = `image-item`;
    div.dataset.albumId = tag;
    container.appendChild(div);

    const img = document.createElement('img');
    img.src = src;

   
    /*const a = document.createElement('a');
    a.className="slide";
    a.href=src;*/
    div.appendChild(img);

    /*a.setAttribute('data-lightbox', 'models');
    a.setAttribute('data-title', `${imgTitle}`);*/
    /*a.setAttribute('data-title',`${imgComment}`)*/


    
    
    /*div.appendChild(a);*/

   

    const imgTitleDiv = document.createElement('div');
    imgTitleDiv.className = 'imgTitle';
    imgTitleDiv.textContent = `${imgTitle}`;
    div.appendChild(imgTitleDiv);

    
    const imgCommentDiv = document.createElement('div');
    imgCommentDiv.className = 'imgComment';
    imgCommentDiv.textContent = `${imgComment}`;
    container.appendChild(imgCommentDiv);
   
    var checkbox = document.createElement("INPUT");
    checkbox.setAttribute("type", "checkbox");
    checkbox.className = "check";
    checkbox.id = src;
    div.appendChild(checkbox);

    div.appendChild(checkbox);
    

    const imgFlex = document.querySelector('.image-wrap');
    imgFlex.appendChild(container);


      /*  const ratingDiv = document.createElement("div");
        ratingDiv.className = "rating";
        flexItemDiv.appendChild(ratingDiv);
      
        for (let i = 1; i <= 5; i++) {
          const star = createStar(i);
          ratingDiv.appendChild(star);
        }
      
        const rating = getRating(picture.id);
      
        renderRatingColors(picture.id, rating);
      }
      
      function createStar(index) {
        const starTemplate = document.createElement("div");
        starTemplate.className = "star fa fa-star";
        starTemplate.dataset.rating = index;
      
        starTemplate.addEventListener("click", (event) => {
          ratePicture(event.target);
        });
      
        return starTemplate;
      }
      
      function getRating(pictureId) {
        const ratingVarName = "rating-" + pictureId;
      
        return window.localStorage.getItem(ratingVarName);
      }
      
      function setRating(pictureId, rating) {
        const ratingVarName = "rating-" + pictureId;
      
        return window.localStorage.setItem(ratingVarName, rating);
      }
      
     /* function ratePicture(starElement) {
        console.log(starElement.dataset.rating);
        const pictureElement = starElement.closest(".pictureWrapper");
      
        const pictureId = pictureElement.dataset.id;
      
        // Värde mellan 1-5
        let rating = starElement.dataset.rating;
      
        const currentRating = getRating(pictureId);
      
        if (currentRating && currentRating == rating) {
          rating = 0;
        }
      
        setRating(pictureId, rating);
        renderRatingColors(pictureId, rating);
      }
      
      function renderRatingColors(pictureId, rating) {
        const pictureElement = document.querySelector(
          `.pictureWrapper[data-id='${pictureId}']`
        );
      
        const starElements = pictureElement.querySelectorAll(".rating .star");
      
        for (let i = 0; i < 5; i++) {
          if (i < rating) {
            starElements[i].classList.add("checked");
          } else {
            starElements[i].classList.remove("checked");
          }
        }*/
        

    }

    
        

    let button = document.querySelector('.button');
   
   
    
    button.addEventListener('click', ()=>{
        /* checkedItems = document.getElementsByClassName("check");*/
      var  checkedItems = document.querySelectorAll('.check input[type ="checkbox"]:checked');

        let checkedItemsTrue = [];

        for(const items of checkedItems){

            if(items.checked == true){

                checkedItemsTrue.push(check.id)
                
                
                checkedItemsTrue.setAttribute('data-lightbox', 'models');
                checkedItemsTrue.setAttribute('data-title', `${imgTitle}`);
            }
        }
        
    })