'use strict';
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

    if (resolution === "lowRes" || resolution.length === 0) {
        for (const album of library.albums) {
            if (album.id === savedAlbumId) {
                for (const picture of album.pictures) {
                    renderImages(`${album.path}/${picture.imgLoRes}`, picture.id, picture.title, picture.comment, picture.rating);
                }
            }
        }
    }
    if (resolution === "highRes") {
        for (const album of library.albums) {
            if (album.id === savedAlbumId) {
                for (const picture of album.pictures) {
                    renderImages(`${album.path}/${picture.imgHiRes}`, picture.id, picture.title, picture.comment, picture.rating);
                }
            }
        }
    }
    renderResolutionButtons();
    ratingButtonHandler()
    // renderStars();
    checkBox();
});

function checkBox() {
    let checkBox = document.querySelectorAll('.slideCheck');

    let slideArray = [];

    checkBox.forEach(box => box.addEventListener('change', () => {
        let abc = box.parentNode

        slideArray.push(abc.dataset.pictureId);

        for (let i = 0; i < slideArray.length; i++) {

        }
        console.log(abc.dataset.pictureId)

    }));

}

function renderStars() {

    let li = document.getElementsByClassName('rating-item')

    // console.log(picRating.length);

    for (const album of library.albums) {
        for (const picture of album.pictures) {
            for (let i = 0; i < 5; i++) {
                if(typeof picture.rating === 'undefined'){
                    li[i].textContent = "☆";
                }
                if(picture.rating === '1'){
                    li[4].textContent = "★";
                }
                // console.log(li[i]);
            }
        }
    }


}


function ratingButtonHandler() {

    const urlGetPost = 'http://localhost:3000/api/picture/rating';
    const li = document.querySelectorAll('.rating .rating-item');

    for (let i = 0; i < li.length; i++) {

        li[i].addEventListener('click', async (event) => {

            let galleryJSON = await myFetch(urlGetPost);

            li[i].textContent = "★"

            let parentDiv = li[i].parentNode;

            console.log(parentDiv.dataset.pictureId);

            let score = li[i].getAttribute('data-rate');

            console.log("score: " + score);


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


function renderImages(src, id, imgTitle, imgComment, picRating) {

    const div = document.createElement('a');
    div.className = `flex-item`;
    div.dataset.albumId = id;

    const img = document.createElement('img');
    img.src = src;
    div.appendChild(img);

    const pTitle = document.createElement('p');
    pTitle.innerHTML = `${imgTitle}`;
    pTitle.className = "imgTitle"
    div.appendChild(pTitle);

    const pComment = document.createElement('p');
    pComment.textContent = imgComment.substring(0, 40)
    pComment.className = "imgComment";
    div.appendChild(pComment);

    // const slideShow = document.createElement('a');
    // slideShow.innerHTML = 'go to slideshow';
    // slideShow.href = '#';

    const content = document.createElement('div');
    content.className = "contentContainer";
    content.dataset.albumId = id;

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = "slideCheck"
    content.dataset.pictureId = id;
    content.appendChild(checkBox);

    const rating = document.createElement('div');
    rating.name = "ratingDiv"
    rating.dataset.pictureId = id;
    rating.className = "rating rating2";
    // rating.setAttribute('rating.dataset.albumId', `${id}`);

    const li5 = document.createElement('li');
    li5.className = "rating-item"
    li5.name = "star"
    li5.textContent = "☆"
    li5.setAttribute('data-rate', '5')

    const li4 = document.createElement('li');
    li4.className = "rating-item"
    li4.name = "star"
    li4.textContent = "☆"
    li4.setAttribute('data-rate', '4')

    const li3 = document.createElement('li');
    li3.className = "rating-item"
    li3.name = "star"
    li3.textContent = "☆"
    li3.setAttribute('data-rate', '3')

    const li2 = document.createElement('li');
    li2.className = "rating-item"
    li2.name = "star"
    li2.textContent = "☆"
    li2.setAttribute('data-rate', '2')

    const li1 = document.createElement('li');
    li1.className = "rating-item"
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

    const popUpDiv = document.createElement('div');
    popUpDiv.className = "popup-image";

    const popUpImg = document.createElement('img');

    const popUpTitle = document.createElement('p');
    popUpTitle.className = "popUpTitle";

    const picRatingScore = document.createElement('p');
    picRatingScore.className = "picRatingScore";

    const popUpComment = document.createElement('div');
    popUpComment.className = "popUpComment";

    const contentDiv = document.createElement('div');

    let closePic = document.createElement('span');
    closePic.className = "closePic"

    // let next = document.createElement('span');
    // next.className = "next"
    //
    // let prev = document.createElement('span');
    // prev.className = "prev"

    contentDiv.appendChild(popUpTitle);
    contentDiv.appendChild(popUpComment);
    contentDiv.appendChild(picRatingScore);
    contentDiv.appendChild(closePic);
    // contentDiv.appendChild(next);
    // contentDiv.appendChild(prev);

    popUpDiv.appendChild(popUpImg);
    let popUp = document.querySelector('.popup-div');
    popUp.appendChild(contentDiv);

    popUp.appendChild(popUpDiv);

    for (let i = 0; i < div.children.length; i++) {

        div.children[i].addEventListener('click', function () {
            popUpComment.textContent = imgComment;
            popUp.style.display = "flex";
            popUpImg.style.display = "flex";
            popUpImg.src = src;
            popUpTitle.textContent = imgTitle;
            picRatingScore.textContent = `rating is: ${picRating} stars`;
            closePic.textContent = "X";
            // next.textContent = ">"
            // prev.textContent = "<"

            closePic.addEventListener('click', function () {
                popUp.style.display = "none";
                popUpImg.style.display = "none";
                popUpTitle.textContent = "";
                picRatingScore.textContent = ``;
                closePic.textContent = "";
                popUpComment.textContent = "";
                // next.textContent = ""
                // prev.textContent = ""
            })
        });

    }
}

// if (typeof picRating === 'undefined') {
//     li1.textContent = "☆☆☆☆☆";
// }
// if (picRating === "1") {
//     li1.textContent = "☆☆☆☆★"
// }
// if (picRating === "2") {
//     li2.textContent = "☆☆☆★★"
// }
// if (picRating === "3") {
//     li3.textContent = "☆☆★★★"
// }
// if (picRating === "4") {
//     li4.textContent = "☆★★★★"
// }
// if (picRating === "5") {
//     li5.textContent = "★★★★★"
// }