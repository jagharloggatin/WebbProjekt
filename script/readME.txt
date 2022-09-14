// Läs för att förstå formidable
// https://www.npmjs.com/package/formidable
// https://www.section.io/engineering-education/uploading-files-using-formidable-nodejs/
// https://www.tabnine.com/code/javascript/functions/formidable/Files/image
// https://www.w3schools.com/nodejs/nodejs_uploadfiles.asp

const express = require('express');
const formidable = require('formidable');
const path = require("path");
const fs = require("fs");
const cors = require('cors');

const libraryDir = "app-data/library";
const applicationDir = path.resolve('./');
const libraryJsonPath = 'app-data/library/picture-library.json';


const app = express();

//To get past cors policy
//https://www.npmjs.com/package/cors
//https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(cors());

app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000 ...');
});

//Post request
app.post('/api/upload', (req, res) => {

    //Creates a formidable object of the incoming data
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

        // fs.mkdirSync(path.resolve(`app-data/library/pictures/${fields.title}`));

        let newName = files.myImage.originalFilename.trim().replace(' ', '-').replace(/(\s|-|_|~)+/g, '-').toLowerCase();
        let oldPath = files.myImage.filepath;
        let title = fields.title.trim().replace(' ', '-').replace(/(\s|-|_|~)+/g, '-').toLowerCase();
        const dir = `app-data/library/pictures/${title}`;

        let newPath = 'app-data/library/pictures/album-header/' +  newName;

        console.log(newPath)

        fs.mkdirSync(dir, { recursive: true }, (err) => {
            if (err) {
                throw err;
            }
        });

        const data = fs.readFileSync(oldPath)

        fs.writeFileSync(newPath, data, function(err){
            res.status(501).send('Couldnt create album');
            return;
        })

        let libraryJson = JSON.parse(fs.readFileSync(path.resolve('app-data', 'library/' + 'picture-library.json'), 'utf8'));

        // libraryJson = JSON.parse(path.resolve(albumHeaderDir, libraryJsonPath));
        // console.log(libraryJson.albums);

        let albumObj = {
            id:  uniqueId(),
            title: title,
            comment: fields.albumComment.trim().replace(' ', '-').replace(/(\s|-|_|~)+/g, '-').toLowerCase(),
            path: dir,
            headerImage: newPath,
            pictures: [],
        };

        libraryJson.albums.push(albumObj);

        fs.writeFileSync(libraryJsonPath, JSON.stringify(libraryJson), function(err) {
            // Todo: remove album header picture and directory in case of an error
            res.sendStatus(501);
            return;
        });
        res.sendStatus(200);
    });
});

app.post('/api/edit/album', (req, res) => {

    //Creates a formidable object of the incoming data
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

        // fs.mkdirSync(path.resolve(`app-data/library/pictures/${fields.title}`));

        let newName = files.myImage.originalFilename.trim().replace(' ', '-').replace(/(\s|-|_|~)+/g, '-').toLowerCase();
        let oldPath = files.myImage.filepath;
        let title = fields.title.trim().replace(' ', '-').replace(/(\s|-|_|~)+/g, '-').toLowerCase();
        const dir = `app-data/library/pictures/${title}`;

        let newPath = 'app-data/library/pictures/album-header/' +  newName;

        console.log(newPath)

        fs.mkdirSync(dir, { recursive: true }, (err) => {
            if (err) {
                throw err;
            }
        });

        const data = fs.readFileSync(oldPath)

        fs.writeFileSync(newPath, data, function(err){
            res.status(501).send('Couldnt create album');
            return;
        })

        let libraryJson = JSON.parse(fs.readFileSync(path.resolve('app-data', 'library/' + 'picture-library.json'), 'utf8'));

        // libraryJson = JSON.parse(path.resolve(albumHeaderDir, libraryJsonPath));
        // console.log(libraryJson.albums);

        let albumObj = {
            id:  uniqueId(),
            title: title,
            comment: fields.albumComment.trim().replace(' ', '-').replace(/(\s|-|_|~)+/g, '-').toLowerCase(),
            path: dir,
            headerImage: newPath,
            pictures: [],
        };

        libraryJson.albums.push(albumObj);

        fs.writeFileSync(libraryJsonPath, JSON.stringify(libraryJson), function(err) {
            // Todo: remove album header picture and directory in case of an error
            res.sendStatus(501);
            return;
        });
        res.sendStatus(200);
    });
});



//Writes image info to albumCache.json to later unpack and use
// writeJSON('albumCache.json', {err, fields, files});
// res.json({ fields, files });

//Converts file info to JSON


function uniqueId() {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substring(2);
    return dateString + randomness;
};
function writeJSON(fname, obj) {
    const dir = path.join(applicationDir, `/${libraryDir}`);
    fs.writeFileSync(path.resolve(dir, fname), JSON.stringify(obj));
}

function readJSON(fname) {
    const dir2 = path.join(applicationDir, `/${libraryDir}`);

    const obj = JSON.parse(fs.readFileSync(path.resolve(dir2, fname), 'utf8'));
    return obj;
}
