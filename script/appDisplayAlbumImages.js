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
    // for (const album of library.albums) {
    //     if (album.id === savedAlbumId) {
    //         for (const picture of album.pictures) {
    //             renderImages(`${album.path}/${picture.imgHiRes}`, picture.id, picture.title, picture.comment);
    //         }
    //     }
    // }
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

    

    /*const ratingwrap = document.createElement('div');
    ratingwrap.className = "rating-wrap"

    const center = document.createElement('div');
    center.className = "center"
    ratingwrap.appendChild(center);

    const rating = document.createElement('fieldset');
    rating.className = "rating";
    center.appendChild(rating);

    const input05 = document.createElement('input'); input05.type= "radio"; input05.id="star0.5"; input05.name="rating"; input05.value="0";
    const input1 = document.createElement('input'); input1.type= "radio"; input1.id="star1"; input1.name="rating"; input1.value="1";
    const input15 = document.createElement('input'); input15.type= "radio"; input15.id="star1.5"; input15.name="rating"; input1.value="1.5";
    const input2 = document.createElement('input'); input2.type= "radio"; input2.id="star2"; input2.name="rating"; input2.value="2";
    const input25 = document.createElement('input'); input25.type= "radio"; input25.id="star2.5"; input25.name="rating"; input1.value="2.5";
    const input3 = document.createElement('input'); input3.type= "radio"; input3.id="star3"; input3.name="rating"; input3.value="3";
    const input35 = document.createElement('input'); input35.type= "radio"; input35.id="star3.5"; input35.name="rating"; input3.value="3.5";
    const input4 = document.createElement('input'); input4.type= "radio"; input4.id="star4"; input4.name="rating"; input4.value="4";
    const input45 = document.createElement('input'); input45.type= "radio"; input45.id="star4.5"; input45.name="rating"; input45.value="4.5";
    const input5 = document.createElement('input'); input5.type= "radio"; input5.id="star5"; input5.name="rating"; input5.value="5";

    rating.appendChild(input1);
    rating.appendChild(input15);
    rating.appendChild(input2);
    rating.appendChild(input25);
    rating.appendChild(input3);
    rating.appendChild(input35);
    rating.appendChild(input4);
    rating.appendChild(input45);
    rating.appendChild(input5);

    container.appendChild(ratingwrap);*/

    const imgFlex = document.querySelector('.image-wrap');
    imgFlex.appendChild(container);


      
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

  }