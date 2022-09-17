// Läs för att förstå formidable
// https://www.npmjs.com/package/formidable
// https://www.section.io/engineering-education/uploading-files-using-formidable-nodejs/
// https://www.tabnine.com/code/javascript/functions/formidable/Files/image
// https://www.w3schools.com/nodejs/nodejs_uploadfiles.asp

//To get past cors policy
//https://www.npmjs.com/package/cors
//https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

const express = require('express');
const formidable = require('formidable');
const path = require("path");
const fs = require("fs");
const cors = require('cors');
const bodyParser = require('body-parser')
let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: false })


const libraryDir = "app-data";
const applicationDir = path.resolve('./');
const libraryJsonPath = 'app-data/library/picture-library.json';

const app = express();

app.use(cors());

app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000 ...');
});

//UPLOAD ALBUM
app.post('/api/upload', (req, res) => {

    //Creates a formidable object of the incoming data
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

        if (!fileIsValidImage(files.myImage)) {
            alert("wrong file format, try again!");
            return;
        }
        // fs.mkdirSync(path.resolve(`app-data/library/pictures/${fields.title}`));

        let newName = files.myImage.originalFilename.trim().replace(' ', '-').replace(/(\s|-|_|~)+/g, '-').toLowerCase();
        let oldPath = files.myImage.filepath;
        let title = fields.title.trim().replace(' ', '-').replace(/(\s|-|_|~)+/g, '-').toLowerCase();
        const dir = `app-data/library/pictures/${title}`;

        let newPath = 'app-data/library/pictures/album-header/' + newName;

        console.log(newPath)

        fs.mkdirSync(dir, {recursive: true}, (err) => {
            if (err) {
                throw err;
            }
        });

        const data = fs.readFileSync(oldPath)

        fs.writeFileSync(newPath, data, function (err) {
            res.status(501).send('Couldnt create album');
            return;
        })

        let libraryJson = JSON.parse(fs.readFileSync(path.resolve('app-data', 'library/' + 'picture-library.json'), 'utf8'));

        // libraryJson = JSON.parse(path.resolve(albumHeaderDir, libraryJsonPath));
        // console.log(libraryJson.albums);

        let albumObj = {
            id: uniqueId(),
            title: title,
            comment: fields.albumComment.trim().replace(' ', '-').replace(/(\s|-|_|~)+/g, '-').toLowerCase(),
            path: dir,
            headerImage: newPath,
            pictures: [],
        };

        libraryJson.albums.push(albumObj);

        fs.writeFileSync(libraryJsonPath, JSON.stringify(libraryJson), function (err) {
            // Todo: remove album header picture and directory in case of an error
            res.sendStatus(501);
            return;
        });
        res.sendStatus(200);
    });
});

//UPLOAD PICTURE
app.post('/api/upload/picture', (req, res) => {

    let libraryJson = JSON.parse(fs.readFileSync(path.resolve('app-data', 'library/' + 'picture-library.json'), 'utf8'));
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

        if (!fileIsValidImage(files.pictureToUpload)) {
            alert("wrong file format, try again!");
            return;
        }

        let pictureFileName;
        let pictureComment = stringHandler(fields.pictureComment);

        let oldPath = files.pictureToUpload.filepath;
        let pictureTitle = stringHandler(fields.pictureTitle);
        let pictureObj = {};

        const imageSize = files.pictureToUpload;

        if ((imageSize.size / (1024 * 1024)) > 2) {
            pictureFileName = "large~" + stringHandler(files.pictureToUpload.originalFilename);
        } else {
            pictureFileName = "small~" + stringHandler(files.pictureToUpload.originalFilename);
        }
        let uploadPath = `app-data/library/pictures/${fields.selectAlbum}/` + pictureFileName;

        libraryJson.albums.forEach(function (alb) {
            if (alb.title === fields.selectAlbum) {
                if ((imageSize.size / (1024 * 1024)) > 2) {
                    pictureObj = {
                        id: uniqueId(),
                        title: pictureTitle,
                        comment: pictureComment,
                        imgLoRes: "none",
                        imgHighRes: pictureFileName,
                    };
                } else {
                    pictureObj = {
                        id: uniqueId(),
                        title: pictureTitle,
                        comment: pictureComment,
                        imgLoRes: pictureFileName,
                        imgHighRes: "none",
                    };
                }
                alb.pictures.push(pictureObj);
            }
        });

        fs.writeFileSync(libraryJsonPath, JSON.stringify(libraryJson), function (err) {
            res.sendStatus(501);
            return;
        });

        const data = fs.readFileSync(oldPath);
        fs.writeFileSync(uploadPath, data);

        res.sendStatus(200);
    });
});

//EDIT ALBUMS
app.post('/api/edit/album', (req, res) => {

    let libraryJson = JSON.parse(fs.readFileSync(path.resolve('app-data', 'library/' + 'picture-library.json'), 'utf8'));

    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

        libraryJson.albums.forEach(function (album) {
            if (album.title === fields.selectedAlbum) {
                album.title = fields.newTitle;
                album.comment = fields.newComment;
            }
        });
        const oldPath = path.resolve('app-data/library/pictures/' + fields.selectedAlbum.toLowerCase());
        let newPath = path.resolve('app-data/library/pictures/' + fields.newTitle.toLowerCase());

        fs.renameSync(oldPath, newPath);

        fs.writeFileSync(libraryJsonPath, JSON.stringify(libraryJson), function (err) {
            res.sendStatus(501);
            return;
        });
        res.sendStatus(200);
    });
});

//EDIT PICTURE
app.post('/api/edit/picture', (req, res) => {

    let libraryJson = JSON.parse(fs.readFileSync(path.resolve('app-data', 'library/' + 'picture-library.json'), 'utf8'));

    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

        let newTitle = stringHandler(fields.newPictureTitle);
        let newComment = stringHandler(fields.newPictureComment);

        libraryJson.albums.forEach(function (alb) {
            alb.pictures.forEach(function (picture) {
                if (picture.title === fields.selectedPicture) {

                    picture.title = newTitle;
                    picture.comment = newComment;
                }
            });
        });

        fs.writeFileSync(libraryJsonPath, JSON.stringify(libraryJson), function (err) {
            res.sendStatus(501);
            return;
        });
        res.sendStatus(200);
    });
});

//REMOVE PICTURE
app.post('/api/remove/picture', (req, res) => {
    let libraryJson = JSON.parse(fs.readFileSync(path.resolve('app-data', 'library/' + 'picture-library.json'), 'utf8'));

    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

        libraryJson.albums.forEach(function (alb) {
            alb.pictures.forEach(function (picture) {
                if(fields.selectedPictureRemove === picture.title) {

                    let index = alb.pictures.indexOf(picture)
                    let element = alb.pictures.splice(index, 1)
                    console.log(element)
                }
            });
        });

        fs.writeFileSync(libraryJsonPath, JSON.stringify(libraryJson), function (err) {
            res.sendStatus(501);
            return;
        });
        res.sendStatus(200);
    });
});


//GET JSON API
app.get('/api/album/rating', (req, res) => {
    let libraryJson = JSON.parse(fs.readFileSync(path.resolve('app-data', 'library/' + 'picture-library.json'), 'utf8'));
    res.send(libraryJson)
});


//POST RATING TO JSON
app.post('/api/album/rating', jsonParser, (req, res) => {

    let library = req.body;

    fs.writeFileSync(libraryJsonPath, JSON.stringify(library));

    res.json(library)

    console.clear();
    console.log(library.albums)

});


function writeJSON(fname, obj) {
    const dir = path.join(applicationDir, `/${libraryDir}`);
    let s = JSON.stringify(obj);

    fs.writeFileSync(path.resolve(dir, fname), JSON.stringify(obj));
}

function stringHandler(fname) {
    return fname.trim().replace(' ', '-').replace(/(\s|-|_|~)+/g, '-').toLowerCase();
}

function uniqueId() {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substring(2);
    return dateString + randomness;
};

function fileIsValidImage(file) {
    //Is there a file
    if (file.originalFilename === '' || file.size === 0)
        return false;

    //check if the img format is correct
    const type = file.mimetype.split("/").pop();
    const validTypes = ["jpg", "jpeg", "png", "webp"];
    if (validTypes.indexOf(type) === -1) {
        return false;
    }
    return true;
};

// function fileSizeCheck(fi) {
//     if (fi.files.length > 0) {
//
//         for (let i = 0; i <= fi.files.length - 1; i++) {
//
//             const fsize = fi.files.item(i).size;
//             const file = Math.round((fsize / 1024));
//             // The size of the file.
//             if (file >= 4096) {
//                 console.log("large file")
//                 return false;
//
//             } else if (file < 2048) {
//                 console.log("small file")
//                 return true;
//             } else {
//                 document.getElementById('size').innerHTML = '<b>'
//                     + file + '</b> KB';
//             }
//         }
//     }
// }

