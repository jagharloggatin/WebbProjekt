'use strict';
import * as lib from '../model/picture-library-browser.js';

const libraryJSON = "picture-library.json";
let library;


window.addEventListener('DOMContentLoaded', async () => {

    const resolution = JSON.parse(localStorage.getItem("resolution")) || []
    const savedAlbumId = JSON.parse(localStorage.getItem("selectedId")) || []

    library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);

    for (const album of library.albums) {
        if (album.id === savedAlbumId) {
            for (const picture of album.pictures) {


                console.log(picture)
                // console.log(abc)
                console.log(typeof picture.imgLoRes);
                if (resolution === "lowRes" || resolution.length === 0) {
                    if (typeof picture.imgLoRes !== 'undefined') {
                        renderImages(`${album.path}/${picture.imgLoRes}`, picture.id, picture.title, picture.comment, picture.rating, album.title);
                    }
                }
                if (resolution === "highRes") {
                    console.log(picture.imgHiRes);
                    if (typeof picture.imgHiRes !== 'undefined') {
                        renderImages(`${album.path}/${picture.imgHiRes}`, picture.id, picture.title, picture.comment, picture.rating, album.title);

                    }
                }
            }
        }
    }
    renderResolutionButtons();
    ratingButtonHandler()
    checkBox();
});


// function starEffects(){
//
// }

function checkBox() {
    let checkBox = document.querySelectorAll('.slideCheck');
    let slideShowBtn = document.querySelector('.slideBtn');

    let slideArray = [];

    checkBox.forEach(box => box.addEventListener('click', (event) => {
        let parentDiv = box.parentNode

        if (event.target.checked === true) {
            console.log("checked")
            slideArray.push(parentDiv.dataset.pictureId);
            console.log(slideArray)
            sessionStorage.setItem('imageInfo', JSON.stringify(slideArray));

        } else {
            console.log("unchecked")
            let index = slideArray.indexOf(parentDiv.dataset.pictureId)
            slideArray.splice(index, 1);
        }

    }));
    slideShowBtn.addEventListener('click', function () {
        sessionStorage.setItem('imageInfo', JSON.stringify(slideArray));
    });
}


//ratingsystem
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


            let albumIndex;
            let albumIndex2;

            let ratingArray = [];

            console.log("scoree: " + score);

            let scoreStars = "";
            for (let j = 0; j < score; j++) {
                scoreStars += "★";
            }

            console.log(scoreStars)

            galleryJSON.albums.forEach(function (album) {
                ratingArray.push(album.title);
            });
            console.log(ratingArray)

            galleryJSON.albums.forEach(function (album) {
                album.pictures.forEach(function (picture) {
                    if (parentDiv.dataset.pictureId === picture.id) {
                        albumIndex = galleryJSON.albums.indexOf(album);
                        let pictureIndex = galleryJSON.albums[albumIndex].pictures.indexOf(picture);

                        console.log("pic index: " + pictureIndex);
                        galleryJSON.albums[albumIndex].pictures[pictureIndex].rating = score;

                        let picObj = {
                            id: Date.now().toString(36) + Math.random().toString(36).substring(2),
                            title: `${picture.title}`,
                            comment: `${picture.comment}`,
                            imgLoRes: `${album.title.toLowerCase().replaceAll(' ', '-')}/${picture.imgLoRes}`,
                            imgHiRes: `${album.title.toLowerCase().replaceAll(' ', '-')}/${picture.imgHiRes}`
                        }

                        if (!ratingArray.includes(score)) {
                            let albumObj = {
                                id: Date.now().toString(36) + Math.random().toString(36).substring(2),
                                title: `${score}`,
                                comment: `${scoreStars}`,
                                path: 'app-data/library/pictures',
                                headerImage: "app-data/library/pictures/album-header/star.jpg",
                                pictures: [],
                            }
                            galleryJSON.albums.push(albumObj);
                        }
                        for (let j = 0; j < galleryJSON.albums.length; j++) {
                            if (galleryJSON.albums[j].title === score) {
                                albumIndex2 = j
                                console.log(albumIndex2)
                            }
                        }
                        galleryJSON.albums[albumIndex2].pictures.push(picObj);
                    }
                });

            });

            galleryJSON = await myFetch(urlGetPost, 'POST', galleryJSON);
            console.log(galleryJSON)
        });
    }
}


async function myFetch(url, method = null, body = null, score = null) {
    try {

        let res = await fetch(url, {
            method: method ?? 'GET',
            headers: {'content-type': 'application/json'},
            body: body ? JSON.stringify(body) : null,
            score: score ? JSON.stringify(score) : null
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


//Resolution options, high or low
function renderResolutionButtons() {
    const btnContainer = document.createElement('div');

    const slideShowBtn = document.createElement('a');
    slideShowBtn.textContent = "Slide Show"
    slideShowBtn.className = "slideBtn";
    slideShowBtn.href = "carouselViewGallery.html"

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

//Renders all the images and content of the page
function renderImages(src, id, imgTitle, imgComment, picRating, albumTitle) {

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
    pComment.textContent = imgComment.substring(0,40)
    pComment.className = "imgComment";
    div.appendChild(pComment);

    // const slideShow = document.createElement('a');
    // slideShow.innerHTML = 'go to slideshow';
    // slideShow.href = '#';

    const content = document.createElement('div');
    content.className = "contentContainer";
    content.dataset.albumId = id;
    content.dataset.pictureRating = picRating;


    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.value = "check"
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
    // li5.textContent = "☆"
    li5.setAttribute('data-rate', '5')

    const li4 = document.createElement('li');
    li4.className = "rating-item"
    li4.name = "star"
    // li4.textContent = "☆"
    li4.setAttribute('data-rate', '4')

    const li3 = document.createElement('li');
    li3.className = "rating-item"
    li3.name = "star"
    // li3.textContent = "☆"
    li3.setAttribute('data-rate', '3')

    const li2 = document.createElement('li');
    li2.className = "rating-item"
    li2.name = "star"
    // li2.textContent = "☆"
    li2.setAttribute('data-rate', '2')

    const li1 = document.createElement('li');
    li1.className = "rating-item"
    // li1.textContent = "☆"
    li1.name = "star"
    li1.setAttribute('data-rate', '1')

    if (typeof picRating === 'undefined') {
        li1.textContent = "☆"
        li2.textContent = "☆"
        li3.textContent = "☆"
        li4.textContent = "☆"
        li5.textContent = "☆"
    }
    if (picRating === '1') {
        li1.textContent = "★"
        li2.textContent = "☆"
        li3.textContent = "☆"
        li4.textContent = "☆"
        li5.textContent = "☆"
    }
    if (picRating === '2') {
        li1.textContent = "★"
        li2.textContent = "★"
        li3.textContent = "☆"
        li4.textContent = "☆"
        li5.textContent = "☆"
    }
    if (picRating === '3') {
        li1.textContent = "★"
        li2.textContent = "★"
        li3.textContent = "★"
        li4.textContent = "☆"
        li5.textContent = "☆"
    }
    if (picRating === '4') {
        li1.textContent = "★"
        li2.textContent = "★"
        li3.textContent = "★"
        li4.textContent = "★"
        li5.textContent = "☆"
    }
    if (picRating === '5') {
        li1.textContent = "★"
        li2.textContent = "★"
        li3.textContent = "★"
        li4.textContent = "★"
        li5.textContent = "★"
    }

    rating.appendChild(li5);
    rating.appendChild(li4);
    rating.appendChild(li3);
    rating.appendChild(li2);
    rating.appendChild(li1);

    const imgFlex = document.querySelector('.image-wrap');

    content.appendChild(div)

    if((!containsNumber(albumTitle))){
        content.appendChild(rating);
    }

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

    contentDiv.appendChild(popUpTitle);
    contentDiv.appendChild(popUpComment);
    contentDiv.appendChild(picRatingScore);
    contentDiv.appendChild(closePic);

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
            if (typeof picRating === 'undefined') {
                picRatingScore.textContent = "picture haven't been rated yet"
            } else {
                picRatingScore.textContent = `rating is: ${picRating} stars`;

            }
            closePic.textContent = "X";

            closePic.addEventListener('click', function () {
                popUp.style.display = "none";
                popUpImg.style.display = "none";
                popUpTitle.textContent = "";
                picRatingScore.textContent = ``;
                closePic.textContent = "";
                popUpComment.textContent = "";
            })
        });
    }
}

function containsNumber(str) {
    return /\d/.test(str);
}
