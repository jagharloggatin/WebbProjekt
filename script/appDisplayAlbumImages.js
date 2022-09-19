'use strict';

/*import { brotliDecompressSync } from 'zlib';*/
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

    renderResolutionButtons();
    // for (const album of library.albums) {
    //     if (album.id === savedAlbumId) {
    //         for (const picture of album.pictures) {
    //             renderImages(`${album.path}/${picture.imgHiRes}`, picture.id, picture.title, picture.comment);
    //         }
    //     }
    // }
});

function renderResolutionButtons() {
  const btnContainer = document.createElement('div');

  const Btn = document.createElement('a');
  Btn.textContent = "Slide Show"
  Btn.href = "CarouselViewgallery.html"

  btnContainer.appendChild(Btn);

  const buttonFlex = document.querySelector('.switchBtn');
  buttonFlex.appendChild(btnContainer);


  Btn.addEventListener('click', ()=>{
   
     
    let checkedItems = document.getElementsByClassName('check');
    
    let checkedItemsTrue = [];
  
     for(const items of checkedItems){
  
         if(items.checked == true){
  
             checkedItemsTrue.push(items.value);
             
             
             
         }
     }
    
     sessionStorage.setItem('imageInfo',JSON.stringify(checkedItemsTrue));
     console.log(session.getItem('imageInfo'));
     
  
    
  })
  

  
}









function renderImages(src, tag, imgTitle, imgComment) {

    const label = document.createElement('label');
    label.dataset.albumId = tag;
    label.className = 'cards';
    
   
 const checkbox = document.createElement("INPUT");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", "checkbox");
    checkbox.className = `check`;
    checkbox.value = src;
   
    
    label.appendChild(checkbox);

    const cardcontent = document.createElement('div');
    cardcontent.className= `card-content`;
    label.appendChild(cardcontent);
    
    const img = document.createElement('img');
    img.src = src;
    img.className = "images"
    cardcontent.appendChild(img);

    const content = document.createElement('div');
    content.className = 'content';
    cardcontent.appendChild(content);

    
    
    const imgTitlediv = document.createElement('h4');
    imgTitlediv.className = 'imgTitle';
    imgTitlediv.textContent = `${imgTitle}`;
    content.appendChild(imgTitlediv);

    
    const imgCommentdiv = document.createElement('p');
    imgCommentdiv.className = 'imgComment';
    imgCommentdiv.textContent = `${imgComment}`;
    content.appendChild(imgCommentdiv);

    const imgFlex = document.querySelector('.checkcontainer');
    imgFlex.appendChild(label);
     
    
   /* checkb.addEventListener("change", (e) => {
        
      if (e.target.checked) {
        console.log("Checkbox is checked..");
      } else {
        console.log("Checkbox is not checked..");
      }
    });*/

   /* const checkedItems = document.querySelector("input[name=checkbox]");*/
    
    

    
}



    
    


   
