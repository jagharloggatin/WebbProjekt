//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict';  // Try without strict mode

//import * as proto from './picture-album-prototypes.js';
import * as lib from '../model/picture-library-browser.js';

const libraryJSON ="picture-library.json";
let library;  //Global varibale, Loaded async from the current server in window.load event


//use the DOMContentLoaded, or window load event to read the library async and render the images
window.addEventListener('DOMContentLoaded', async () => {

    library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);  //reading library from JSON on local server
//library = lib.pictureLibraryBrowser.createFromTemplate();  //generating a library template instead of reading JSON

    for (const album of library.albums) {

        renderImage(album.headerImage, album.id);
        for (const picture of album.pictures) {
            renderImage(`${album.path}/${picture.imgLoRes}`, picture.id);
            renderImage(`${album.path}/${picture.imgHiRes}`, picture.id);
        }
    }
})

/*window.addEventListener('click', async  () => {

    library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);

    for (const album of library.albums) {
        console.log(album.title);
    }
    //just to confirm that the library is accessible as a global variable read async
    console.log (`library has ${library.albums.length} albums`);
});*/

window.addEventListener('DOMContentLoaded', async  () => {

    library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);

    for (const album of library.albums) {
        renderAlbumTitles(`${album.title}`, `${album.path}`);
    }
});

// function renderAlbum(title){
//     const div = document.createElement('div');
//     div.className = `dropdown-menu`;
//
//     const ul = document.createElement('ul');
//
//     const li = document.createElement('li');
//
//     const a = document.createElement('a');
//     a.textContent = title;
//     a.href = "#";
//
//     div.append(ul);
//     ul.append(li);
//     li.append(a);
//
//     const album = document.querySelector('#dropdown-menu');
//     album.appendChild(div);
// }


function renderAlbumTitles(title, path){

    const a = document.createElement('a');
    a.textContent = title;
    a.href = "#";

    const album = document.querySelector('#dropdown-list');
    album.appendChild(a);
}



//Render the images
function renderImage(src, tag) {

/*    const div = document.createElement('div');
    div.className = `FlexItem`;
    div.dataset.albumId = tag;

    const img = document.createElement('img');
    img.src = src;
    div.appendChild(img);

    const imgFlex = document.querySelector('.FlexWrap');
    imgFlex.appendChild(div);


    const div = document.createElement('div');
    div.className = `imageContainer`;
    div.dataset.albumId = tag;

    const img = document.createElement('img');
    img.src = src;
    div.appendChild(img);

    const imgFlex = document.querySelector('.imageContainer');
    imgFlex.appendChild(div);*/
};




