'use strict';
import * as lib from '../model/picture-library-browser.js';

const libraryJSON = "picture-library.json";
let library;

window.addEventListener('DOMContentLoaded', async () => {

    library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);
    const ratedPicture = JSON.parse(localStorage.getItem("ratedPicture")) || []
    console.log(ratedPicture)
    for (const album of library.albums) {
        for (const picture of album.pictures) {
            if (ratedPicture == picture.rating) {
                renderImages(`${album.path}/${picture.imgLoRes}`, picture.id, picture.title, picture.comment, picture.rating);
            }
        }
    }
    renderResolutionButtons();
    checkBox();
});

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
    console.log(slideArray);
    slideShowBtn.addEventListener('click', function () {
        sessionStorage.setItem('imageInfo', JSON.stringify(slideArray));
    });
}

function renderResolutionButtons() {
    const btnContainer = document.createElement('div');

    const slideShowBtn = document.createElement('a');
    slideShowBtn.textContent = "Slide Show"
    slideShowBtn.className = "slideBtn";
    slideShowBtn.href = "carouselViewGallery.html"

    const highResBtn = document.createElement('a');
    highResBtn.href = "ratedPictures.html"
    highResBtn.textContent = "High res"
    const lowResBtn = document.createElement('a');
    lowResBtn.href = "ratedPictures.html"
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

function renderImages(src, id, imgTitle, imgComment, rating) {

    const div = document.createElement('a');
    div.className = `flex-item`;
    div.dataset.albumId = id;
    div.dataset.rating = rating;

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
    checkBox.value = "check"
    checkBox.className = "slideCheck"
    content.dataset.pictureId = id;
    content.appendChild(checkBox);

    const albumFlex = document.querySelector('.image-wrap');
    content.appendChild(div)
    albumFlex.appendChild(content);

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

    let parent = img.parentNode;

    for (let i = 0; i < div.children.length; i++) {

        div.children[i].addEventListener('click', function () {
            popUpComment.textContent = imgComment;
            popUp.style.display = "flex";
            popUpImg.style.display = "flex";
            popUpImg.src = src;
            popUpTitle.textContent = imgTitle;
            picRatingScore.textContent = `rating is: ${parent.dataset.rating} stars`;
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