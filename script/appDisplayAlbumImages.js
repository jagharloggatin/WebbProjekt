'use strict';

/*import { brotliDecompressSync } from 'zlib';*/
import * as lib from '../model/picture-library-browser.js';

const libraryJSON = "picture-library.json";
let library;

let highRes = false;
let lowRes = true;

// const url = window.location.href;
// const urlString = new URL(url);
// const albumId = urlString.searchParams.get('id');
// console.log(albumId);

window.addEventListener('DOMContentLoaded', async () => {

    const resolution = JSON.parse(localStorage.getItem("resolution")) || []

    const savedAlbumId = JSON.parse(localStorage.getItem("selectedId")) || []
    library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);

    if (resolution === "lowRes" || resolution.length === 0){
        for (const album of library.albums) {
            if (album.id === savedAlbumId) {
                for (const picture of album.pictures) {
                    renderImages(`${album.path}/${picture.imgLoRes}`, picture.id, picture.title, picture.comment);
                }
            }
        }
    }

<<<<<<< HEAD
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








=======
    if (resolution === "highRes") {
        for (const album of library.albums) {
            if (album.id === savedAlbumId) {
                for (const picture of album.pictures) {
                    renderImages(`${album.path}/${picture.imgHiRes}`, picture.id, picture.title, picture.comment);
                }
            }
        }
    }
    renderResolutionButtons();
    ratingButtonHandler()
});

function ratingButtonHandler() {
>>>>>>> 00ad35e48b79b09917d334abeb3b148d713a79a4

    const urlGetPost = 'http://localhost:3000/api/picture/rating';
    const li = document.querySelectorAll('.rating .rating-item');

<<<<<<< HEAD
    const label = document.createElement('label');
    label.dataset.albumId = tag;
    label.className = 'cards';
    
   
 const checkbox = document.createElement("INPUT");
=======
    for (let i = 0; i < li.length; i++) {

        li[i].addEventListener('click', async (event) => {

            li[i].textContent = "★"

            let parentDiv = li[i].parentNode;

            console.log(parentDiv.dataset.pictureId);

            let score = li[i].getAttribute('data-rate');

            console.log("score: " + score);

            let galleryJSON = await myFetch(urlGetPost);

            galleryJSON.albums.forEach(function (album) {
                album.pictures.forEach(function (picture) {
                    if (parentDiv.dataset.pictureId === picture.id) {
                        let albumIndex = galleryJSON.albums.indexOf(album);
                        let pictureIndex = galleryJSON.albums[albumIndex].pictures.indexOf(picture);
                        console.log("pic index: " + pictureIndex);
                        galleryJSON.albums[albumIndex].pictures[pictureIndex].rating = score;
                    }
                });
            });

            // console.log(galleryJSON.albums);

            galleryJSON = await myFetch(urlGetPost, 'POST', galleryJSON);
            console.log(galleryJSON)
        });
    }

    async function myFetch(url, method = null, body = null) {
        try {

            let res = await fetch(url, {
                method: method ?? 'GET',
                headers: {'content-type': 'application/json'},
                body: body ? JSON.stringify(body) : null
            });

            if (res.ok) {

                console.log("Request successful");

                //get the data from server
                let data = await res.json();
                return data;
            } else {

                //typcially you would log an error instead
                console.log(`Failed to recieved data from server: ${res.status}`);
                // alert(`Failed to recieved data from server: ${res.status}`);
            }
        } catch (err) {

            //typcially you would log an error instead
            console.log(`Failed to recieved data from server: ${err.message}`);
            // alert(`Failed to recieved data from server: ${err.message}`);
        }
    }
}


function renderResolutionButtons() {
    const btnContainer = document.createElement('div');

    const slideShowBtn = document.createElement('a');
    slideShowBtn.textContent = "Slide Show"
    slideShowBtn.href = "slideShow.html"

    const highResBtn = document.createElement('a');
    highResBtn.href = "pictureGallery.html"
    highResBtn.textContent = "High res"
    const lowResBtn = document.createElement('a');
    lowResBtn.href = "pictureGallery.html"
    lowResBtn.textContent = "Low res"

    btnContainer.appendChild(highResBtn);
    btnContainer.appendChild(lowResBtn);
    btnContainer.appendChild(slideShowBtn);

    const buttonFlex = document.querySelector('.switchBtn');
    buttonFlex.appendChild(btnContainer);

    highResBtn.addEventListener("click", () => {
        localStorage.setItem('resolution', JSON.stringify("highRes"))
    });

    lowResBtn.addEventListener("click", () => {
        localStorage.setItem('resolution', JSON.stringify("lowRes"))
    });
}


function renderImages(src, id, imgTitle, imgComment) {

    const label = document.createElement('label');
    label.dataset.picture = id;
    label.className = 'cards';

    const checkbox = document.createElement("input");
>>>>>>> 00ad35e48b79b09917d334abeb3b148d713a79a4
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", "checkbox");
    checkbox.className = `check`;
    checkbox.value = src;
<<<<<<< HEAD
   
    
    label.appendChild(checkbox);
=======
    checkbox.dataset.id = id;

    label.appendChild(checkbox);

    const div = document.createElement('a');
    div.className = `flex-item`;
    div.dataset.albumId = id;
    div.href = './pictureGallery.html?id=' + id;

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    div.appendChild(checkBox);
>>>>>>> 00ad35e48b79b09917d334abeb3b148d713a79a4

    const cardcontent = document.createElement('div');
    cardcontent.className= `card-content`;
    label.appendChild(cardcontent);
    
    const img = document.createElement('img');
    img.src = src;
<<<<<<< HEAD
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



    
    


   
=======
    div.appendChild(img);

    const pTitle = document.createElement('p');
    pTitle.innerHTML = `${imgTitle}`;
    pTitle.className = "imgTitle"
    div.appendChild(pTitle);

    const pComment = document.createElement('p');
    pComment.textContent = imgComment.substring(0, 60)
    pComment.className = "imgComment";
    div.appendChild(pComment);


    //
    // const slideShow = document.createElement('a');
    // slideShow.innerHTML = 'go to slideshow';
    // slideShow.href = '#';

    const content = document.createElement('div');
    content.className = "contentContainer"

    const rating = document.createElement('div');
    rating.name = "ratingDiv"
    rating.dataset.pictureId = id;
    rating.className = "rating rating2";
    // rating.setAttribute('rating.dataset.albumId', `${id}`);

    const li5 = document.createElement('li');
    li5.className = "rating-item target"
    li5.name = "star"
    li5.textContent = "☆"
    li5.value = 5;
    li5.setAttribute('data-rate', '5')

    const li4 = document.createElement('li');
    li4.className = "rating-item target"
    li4.name = "star"
    li4.textContent = "☆"
    li5.value = 4;
    li4.setAttribute('data-rate', '4')

    const li3 = document.createElement('li');
    li3.className = "rating-item target"
    li3.name = "star"
    li3.textContent = "☆"
    li3.setAttribute('data-rate', '3')

    const li2 = document.createElement('li');
    li2.className = "rating-item target"
    li2.name = "star"
    li2.textContent = "☆"
    li2.setAttribute('data-rate', '2')

    const li1 = document.createElement('li');
    li1.className = "rating-item target"
    li1.textContent = "☆"
    li1.name = "star"
    li1.setAttribute('data-rate', '1')

    rating.appendChild(li5);
    rating.appendChild(li4);
    rating.appendChild(li3);
    rating.appendChild(li2);
    rating.appendChild(li1);

    const imgFlex = document.querySelector('.image-wrap');
    content.appendChild(div)
    content.appendChild(rating);
    imgFlex.appendChild(content);

    // imgFlex.appendChild(content);

    checkbox.addEventListener('click', function () {
        console.log("HELLO")
    })


    // const allPictures = document.querySelectorAll('.flex-item');
    // console.log(allPictures);
    //
    // slideShow.addEventListener("click", () => {
    //     const allChecked = []
    //     allPictures.forEach(item => {
    //         if(item.querySelector('input').checked === true){
    //             const purl = item.href
    //             const purlString = new URL(purl);
    //             const pid = purlString.searchParams.get('id');
    //             allChecked.push(pid);
    //         }
    //     });
    //     if(allChecked !== []){
    //         let surl = '/slideShow.html?'
    //         for(let i = 0; i < allChecked.length; i++){
    //             if(i === 0){
    //                 surl += `id=${allChecked[i]}`;
    //             } else {
    //                 surl += `&id=${allChecked[i]}`;
    //             }
    //         }
    //         slideShow.href = surl;
    //     }
    // })


    // const cardcontent = document.createElement('div');
    // cardcontent.className= `card-content`;
    // label.appendChild(cardcontent);
    //
    // const img = document.createElement('img');
    // img.src = src;
    // img.className = "images"
    // cardcontent.appendChild(img);
    //
    // const content = document.createElement('div');
    // content.className = 'content';
    // cardcontent.appendChild(content);
    //
    // const imgTitlediv = document.createElement('h4');
    // imgTitlediv.className = 'imgTitle';
    // imgTitlediv.textContent = `${imgTitle}`;
    // content.appendChild(imgTitlediv);
    //
    // const imgCommentdiv = document.createElement('p');
    // imgCommentdiv.className = 'imgComment';
    // imgCommentdiv.textContent = `${imgComment}`;
    // content.appendChild(imgCommentdiv);
    //
    // const imgFlex = document.querySelector('.checkcontainer');
    // imgFlex.appendChild(label);

    // const btn = document.createElement('button');
    // btn.innerHTML = "ViewGallery";
    // document.body.appendChild(btn);
    // let session = sessionStorage;

    // btn.addEventListener('click', ()=>{
    //
    //     let checkedItems = document.getElementsByClassName('check');
    //     let checkedItemsTrue = [];
    //
    //     for(const items of checkedItems){
    //
    //         if(items.checked == true){
    //             checkedItemsTrue.push(items.value);
    //         }
    //     }
    //     /* checkedItemsTrue('data-lightbox', 'models');
    //    checkedItemsTrue('data-title', `${imgTitle}`);*/
    //     /*console.log(checkedItemsTrue);*/
    //     session.setItem('imageInfo',JSON.stringify(checkedItemsTrue));
    //     console.log(session.getItem('imageInfo'));
    //     const libr = JSON.parse(session.getItem("imageInfo"))
    //     console.log(libr[0]);
    //
    //     const a = document.createElement('a');
    //     /*a.href = session.getItem("");*/
    //
    //     window.document.body.appendChild(a);
    //
    //     for( let i = 0 ; i < libr.length ;i++){
    //         a.href = libr[i];
    //         a.appendChild(btn);
    //         a.setAttribute('data-lightbox','gallery');
    //
    //     }
    // })
    /* checkb.addEventListener("change", (e) => {

       if (e.target.checked) {
         console.log("Checkbox is checked..");
       } else {
         console.log("Checkbox is not checked..");
       }
     });*/

    /* const checkedItems = document.querySelector("input[name=checkbox]");*/
}
>>>>>>> 00ad35e48b79b09917d334abeb3b148d713a79a4
