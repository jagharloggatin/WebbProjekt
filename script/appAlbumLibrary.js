//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict';  // Try without strict mode

//import * as proto from './picture-album-prototypes.js';
import * as lib from '../model/picture-library-browser.js';

const libraryJSON = "picture-library.json";
let library;

window.addEventListener('DOMContentLoaded', async () => {

    library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);

    for (const album of library.albums) {
        renderAlbums(`${album.title}`, `${album.headerImage}`, `${album.id}`, `${album.comment} ${album.rating}`);

        const ratingItem = document.querySelectorAll('.rating li');

        for (let i = 0; i < ratingItem.length; i++) {
            if(album.rating > 0) {
                ratingItem.textContent="★"
            }
            else {
                ratingItem.textContent="☆"
            }
        }
    }
    renderButton();
});

function renderButton() {

    const urlGetPost = 'http://localhost:3000/api/album/rating';
    const urlJson = 'app-data/library/picture-library.json';
    const li = document.querySelectorAll('.rating .rating-item');

    for (let i = 0; i < li.length; i++) {

        li[i].addEventListener('click', async (event) => {

            li[i].textContent = "★"

            li[i].classList.add('selected');

            let parentDiv = li[i].parentNode;

            console.log(parentDiv.dataset.albumId);

            let score = li[i].getAttribute('data-rate');

            let galleryJSON = await myFetch(urlGetPost);

            galleryJSON.albums.forEach(function (album) {
                if (parentDiv.dataset.albumId === album.id) {
                    let index = galleryJSON.albums.indexOf(album);
                    galleryJSON.albums[index].rating = score;
                }
            });

            console.log(galleryJSON.albums);
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

function renderAlbums(albumTitle, headerImage, id, albumComment, albumRating) {


    const div = document.createElement('div');
    div.className = `album-item`;
    div.dataset.albumId = id;

    const a = document.createElement('a');
    a.className = "album-link";
    a.href = `pictureGallery.html`;

    const albumTitleDiv = document.createElement('p');
    albumTitleDiv.className = 'albumTitle';
    albumTitleDiv.textContent = `${albumTitle}`;
    div.appendChild(albumTitleDiv);

    const img = document.createElement('img');
    img.src = `${headerImage}`;
    a.appendChild(img);
    div.appendChild(a);

    const albumCommentDiv = document.createElement('div');
    albumCommentDiv.className = 'album-comment';
    albumCommentDiv.textContent = albumComment;

    const rating = document.createElement('div');
    rating.name = "ratingDiv"
    rating.dataset.albumId = id;
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

    rating.appendChild(li1);
    rating.appendChild(li2);
    rating.appendChild(li3);
    rating.appendChild(li4);
    rating.appendChild(li5);


    albumCommentDiv.appendChild(rating);
    div.appendChild(albumCommentDiv);

    const imgFlex = document.querySelector('.album-wrap');
    imgFlex.appendChild(div);


    a.addEventListener("click", () => {
        localStorage.setItem('selectedId', JSON.stringify(id))
    });




    // const starsTotal = 5;
    //
    // const ratings = {
    //     sony: 4.7,
    //     samsung: 3.4,
    //     vizio: 2.3,
    //     panasonic: 3.6,
    //     phillips: 4.1
    // }
    //
    // function getRatings() {
    //     for (let rating in ratings) {
    //         // Get percentage
    //         const starPercentage = (ratings[rating] / starsTotal) * 100;
    //
    //         // Round to nearest 10
    //         let starPercentageRounded = `${Math.round(starPercentage / 5) * 5}%`;
    //
    //         // Set width of stars-inner to percentage
    //         document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded;
    //
    //         // Add number rating
    //         document.querySelector(`.${rating} .number-rating`).innerHTML = ratings[rating];
    //     }
    // }


    // li.forEach(function (li) {
    //     li.addEventListener('mouseover', function() {
    //         console.log(this.getAttribute('data-rate'));
    //             li.textContent = "★"
    //     });
    //
    //     li.addEventListener('click', function() {
    //         console.log(this.getAttribute('data-rate'));
    //         li.textContent = "★"
    //     });
    // });
}


//      <div class="rating rating2"><!--
//      <input name="stars" id="e5" type="radio"></a><label for="e5">☆</label><!--
//     --><input name="stars" id="e4" type="radio"></a><label for="e4">☆</label><!--
//     --><input name="stars" id="e3" type="radio"></a><label for="e3">☆</label><!--
//     --><input name="stars" id="e2" type="radio"></a><label for="e2">☆</label><!--
//     --><input name="stars" id="e1" type="radio"></a><label for="e1">☆</label>
// </div>


// const input5 = document.createElement('input'); input5.name="stars"; input5.id="e5"; input5.type="radio"; input5.for="e5";
// const input4 = document.createElement('input'); input4.name="stars"; input4.id="e4"; input4.type="radio"; input4.for="e4";
// const input3 = document.createElement('input'); input3.name="stars"; input3.id="e3"; input3.type="radio"; input3.for="e3";
// const input2 = document.createElement('input'); input2.name="stars"; input2.id="e2"; input2.type="radio"; input2.for="e2";
// const input1 = document.createElement('input'); input1.name="stars"; input1.id="e1"; input1.type="radio"; input1.for="e1";
//
//
// const label5 = document.createElement('label'); label5.textContent="☆"; label5.for="e5";
// const label4 = document.createElement('label'); label4.textContent="☆"; label4.for="e4";
// const label3 = document.createElement('label'); label3.textContent="☆"; label3.for="e3";
// const label2 = document.createElement('label'); label2.textContent="☆"; label2.for="e2";
// const label1 = document.createElement('label'); label1.textContent="☆"; label1.for="e1";
//
// input1.appendChild(label1); input2.appendChild(label2); input3.appendChild(label3); input4.appendChild(label4); input5.appendChild(label5);


// input1.appendChild(label1); input2.appendChild(label2); input3.appendChild(label3); input4.appendChild(label4); input5.appendChild(label5);

// rating.appendChild(input1); rating.appendChild(input2); rating.appendChild(input3); rating.appendChild(input4); rating.appendChild(input5);


//


// const a5 = document.createElement('a');
// a5.href = "#5";
// a5.textContent = "★";
// a5.title = "Give 5 stars";
// a5.class = "star"
// a5.type='submit'
//
// const a4 = document.createElement('a');
// a4.href = "#4";
// a4.textContent = "★";
// a4.title = "Give 4 stars";
// a4.class = "star"
// a4.type='submit'
// const a3 = document.createElement('a');
// a3.href = "#3";
// a3.textContent = "★";
// a3.title = "Give 3 stars";
// a3.class = "star"
// a3.type='submit'
//
// const a2 = document.createElement('a');
// a2.href = "#2";
// a2.textContent = "★";
// a2.title = "Give 2 stars";
// a2.class = "star"
// a2.type='submit'
//
// const a1 = document.createElement('a');
// a1.href = "#1";
// a1.textContent = "★";
// a1.title = "Give 1 stars";
// a1.class = "star"
// a1.type='submit'
//
// rating.appendChild(a5);
// rating.appendChild(a4);
// rating.appendChild(a3);
// rating.appendChild(a2);
// rating.appendChild(a1);


// const li5 = document.createElement('li');
// // li5.type = "radio";
// li5.class = "rating-item"
// li5.name = "star"
// li5.textContent = "☆"
// li5.value = 5;
// li5.setAttribute('data-rate', '5')
//
// const li4 = document.createElement('li');
// li4.class = "rating-item"
// li4.name = "star"
// li4.textContent = "☆"
// li5.value = 4;
//
// li4.setAttribute('data-rate', '4')
//
// const li3 = document.createElement('li');
// li3.class = "rating-item"
// li3.name = "star"
// li3.textContent = "☆"
// li3.setAttribute('data-rate', '3')
//
// const li2 = document.createElement('li');
// li2.class = "rating-item"
// li2.name = "star"
// li2.textContent = "☆"
// li2.setAttribute('data-rate', '2')
//
// const li1 = document.createElement('li');
// li1.class = "rating-item"
// li1.textContent = "☆"
// li1.name = "star"
// li1.setAttribute('data-rate', '1')


// const input1 = document.createElement('input'); input1.name="stars"; input1.id="e1"; input1.type="radio"; input1.for="e1"; input1.setAttribute('data-value', "1")
// const input2 = document.createElement('input'); input2.name="stars"; input2.id="e2"; input2.type="radio"; input2.for="e2"; input2.setAttribute('data-value', "2")
// const input3 = document.createElement('input'); input3.name="stars"; input3.id="e3"; input3.type="radio"; input3.for="e3"; input3.setAttribute('data-value', "3")
// const input4 = document.createElement('input'); input4.name="stars"; input4.id="e4"; input4.type="radio"; input4.for="e4"; input4.setAttribute('data-value', "4")
// const input5 = document.createElement('input'); input5.name="stars"; input5.id="e5"; input5.type="radio"; input5.for="e5"; input5.setAttribute('data-value', "5")

// const label5 = document.createElement('label'); label5.textContent="☆"; label5.for="e5";
// const label4 = document.createElement('label'); label4.textContent="☆"; label4.for="e4";
// const label3 = document.createElement('label'); label3.textContent="☆"; label3.for="e3";
// const label2 = document.createElement('label'); label2.textContent="☆"; label2.for="e2";
// const label1 = document.createElement('label'); label1.textContent="☆"; label1.for="e1";
// input1.appendChild(label1); input2.appendChild(label2); input3.appendChild(label3); input4.appendChild(label4); input5.appendChild(label5);

// rating.appendChild(input1);
// rating.appendChild(input2);
// rating.appendChild(input3);
// rating.appendChild(input4);
// rating.appendChild(input5);

