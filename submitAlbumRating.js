// const urlGetPost = 'http://localhost:3000/api/album/rating';
// const urlJson = 'app-data/library/picture-library.json';
// const li = document.querySelectorAll('.rating .rating-item');
//
// for (let i = 0; i < li.length; i++) {
//
//     li[i].addEventListener('click', async (event) => {
//
//         console.log("HELLO")
//         let parentDiv = li[i].parentNode;
//
//         console.log(parentDiv.dataset.albumId);
//
//         let score = li[i].getAttribute('data-rate');
//
//         li[i].textContent = "★";
//
//         let galleryJSON = await myFetch(urlGetPost);
//
//         let libJSON = await myFetch(urlJson);
//
//         galleryJSON.albums.forEach(function (album) {
//             if (parentDiv.dataset.albumId === album.id) {
//
//                 let index = galleryJSON.albums.indexOf(album);
//                 galleryJSON.albums[index].rating = score;
//             }
//         });
//
//         console.log(galleryJSON.albums);
//
//         // console.log(galleryJSON.albums);
//
//         //add an ingredient
//
//         //write the object to the url
//         galleryJSON = await myFetch(urlGetPost, 'POST', galleryJSON);
//         console.log(galleryJSON)
//         //Alternatively read the updates from a urlSrc that referes to a json file
//         // const ingredients2 = await myFetch(urlJson);
//         // console.log(ingredients2);
//
//     });
// }
//
//
// async function myFetch(url, method = null, body = null) {
//     try {
//
//         let res = await fetch(url, {
//             method: method ?? 'GET',
//             headers: {'content-type': 'application/json'},
//             body: body ? JSON.stringify(body) : null
//         });
//
//         if (res.ok) {
//
//             console.log("Request successful");
//
//             //get the data from server
//             let data = await res.json();
//             return data;
//         } else {
//
//             //typcially you would log an error instead
//             console.log(`Failed to recieved data from server: ${res.status}`);
//             alert(`Failed to recieved data from server: ${res.status}`);
//         }
//     } catch (err) {
//
//         //typcially you would log an error instead
//         console.log(`Failed to recieved data from server: ${err.message}`);
//         alert(`Failed to recieved data from server: ${err.message}`);
//     }
// }