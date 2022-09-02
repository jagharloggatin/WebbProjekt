// const path = require('path');

// const express = require('express');

// import {prototypeAlbum, uniqueId} from '/model/picture-album-prototypes.js';
// import {pictureLibraryNode} from '/model/picture-library-node.js';


'use strict';
import * as lib from '../model/picture-library-browser.js';

const libraryJSON = "picture-library.json";
let library;

window.addEventListener('DOMContentLoaded', async () => {

    library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);

    // for (const album of library.albums) {
    let newAlbum = updateJSON();
    // }

});

function updateJSON() {
    // let titleInput = document.getElementById("titleInput");
    // let commentInput = document.getElementById("commentInput");

    const div = document.createElement('div');
    div.className = "test";

    const inputTitle = document.createElement('input');
    inputTitle.type = "text";
    inputTitle.id = "title";
    div.appendChild(inputTitle);

    const input = document.createElement('input');
    input.type = "file";
    input.id = "fileInput";
    div.appendChild(input);

    const button = document.createElement('button');
    button.textContent = "YO";
    div.appendChild(button);
    //
    // const displayImg = document.createElement('img');
    // div.appendChild(displayImg);

    const imgFlex = document.querySelector('.myDiv');
    imgFlex.appendChild(div);

    button.addEventListener('click', () => {

        let image = document.getElementById('fileInput').value;
        let imgContentArray = [];
        let imageObj = {
            id: Date.now(),
            title: document.getElementById(title).textContent,
            filename: document.getElementById('fileInput').value
        }
        imgContentArray.push(imageObj);
        localStorage.setItem('MyImageList',JSON.stringify(imgContentArray));
    });
}




//
// function setVal(update) {
//     /* Included to show an option if you care to use jQuery
//     var defaults = { jsonRS: null, lookupField: null, lookupKey: null,
//         targetField: null, targetData: null, checkAllRows: false };
//     //update = $.extend({}, defaults, update); */
//
//     for (var i = 0; i < update.jsonRS.length; i++) {
//         if (update.jsonRS[i][update.lookupField] === update.lookupKey || update.lookupKey === '*') {
//             update.jsonRS[i][update.targetField] = update.targetData;
//             if (!update.checkAllRows) { return; }
//         }
//     }
// }
//
// function clickedBtn() {
//     let saveFile=[];
//     const addImage=(ev)=>{
//         ev.preventDefault();
//         let imageTF = {
//             id: Date.now(),
//             title: document.getElementById('title').value,
//             filename: document.getElementById('myFile').value
//         }
//         saveFile.push(imageTF);
//         /* document.forms[0].reset();/
//          /document.querySelector('form').reset();*/
//         console.warn('added', {saveFile});
//         let answerImg = document.querySelector('#answerImg');
//         answerImg.textContent= '\n' + JSON.stringify(saveFile, '\t',2);
//
//         localStorage.setItem('MyImageList',JSON.stringify(saveFile) );
//     }
//     document.addEventListener('DOMContentLoaded', ()=>{
//         document.getElementById('btn').addEventListener('added', addImage);
//     });
//
// }

// const addImage=(ev)=>{
//     ev.preventDefault();
//     let imageTF = {
//         id: Date.now(),
//         title: document.getElementById('title').value,
//         filename: document.getElementById('myFile').value
//     }
//     saveFile.push(imageTF);
//     /* document.forms[0].reset();/
//      /document.querySelector('form').reset();*/
//     console.warn('added', {saveFile});
//     let answerImg = document.querySelector('#answerImg');
//     answerImg.textContent= '\n' + JSON.stringify(saveFile, '\t',2);
//
//     localStorage.setItem('MyImageList',JSON.stringify(saveFile) );
// }
//


// const albumContent = [
//     {
//         "content": "critters",
//         "items": ['puppies', 'kittens', 'guinea pigs']
//     },
//     {
//         "content": "sweets",
//         "items": ['licorice', 'cake', 'cookies', 'custard']
//     },
//     {
//         "content": "birds",
//         "items": ['robin', 'mockingbird', 'finch', 'dove']
//     },
//     {
//         "content": "flowers",
//         "items": ['roses', 'lilys', 'daffodils', 'pansies']
//     }
// ];


// function titleTest() {
//     const fs = require('fs');
//
//     const path = `./app-data/library/${titleInput}`;
//
//     fs.access(path, (error) => {
//         // To check if the given directory
//         // already exists or not
//         if (error) {
//             // If current directory does not exist
//             // then create it
//             fs.mkdir(path, (error) => {
//                 if (error) {
//                     console.log("HELLO");
//                 } else {
//                     console.log("New Directory created successfully !!");
//                 }
//             });
//         } else {
//             console.log("Given Directory already exists !!");
//         }
//     });
// }


//
// let selectionItems = (function initAppData() {
//
//     //initialize if it does not exist as file, otherwise load it
//     if (pictureLibraryNode.fromJSON(`selection-items.json`)) {
//
//         const album = pictureLibraryNode.fromJSON(`selection-items.json`);
//         return album;
//     }
//
//     //If the file does not exist, lets create it with default values
//     //as initial application data
//     const albumContent = [
//         {
//             "content": "critters",
//             "items": ['puppies', 'kittens', 'guinea pigs']
//         },
//         {
//             "content": "sweets",
//             "items": ['licorice', 'cake', 'cookies', 'custard']
//         },
//         {
//             "content": "birds",
//             "items": ['robin', 'mockingbird', 'finch', 'dove']
//         },
//         {
//             "content": "flowers",
//             "items": ['roses', 'lilys', 'daffodils', 'pansies']
//         }
//     ];
//
//     pictureLibraryNode.createJSON(`selection-items.json`, album);
// })();
//
//
// class albumsTemplate {
//     static NASA() {
//         return [
//             //properties needs to be writable and enumaberable to be able to use JSON.stringify(..)
//             Object.create(prototypeAlbum,
//                 {
//                     id: { value: uniqueId(), writeable: true, enumerable: true },
//                     title: { value: `${titleInput}`, writeable: true, enumerable: true },
//                     comment: { value: `${commentInput}`, writeable: true, enumerable: true },
//                     path: { value: `${pictureDir}/\`${titleInput}\`,`, writeable: true, enumerable: true },
//                     headerImage: { value: `${pictureDir}/album-header/PIA04921~small.jpg`, writeable: true, enumerable: true },
//                 })
//         ];
//     }
// }
