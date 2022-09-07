//required node library
const path = require('path');
const fs = require('fs');
const libraryDir = "app-data/library";
const applicationDir = path.resolve('./');


//from the downloaded npm
const express = require('express');
const cors = require('cors');
const formidable = require('formidable');
const multer = require("multer");

const app = express();
const port = 3000;

app.get('/album', (req, res) => {
    res.send(`
    <h2>Add Album</h2>
    <form action="/api/upload/Album" enctype="multipart/form-data" method="post">
      <div>Text field title: <input type="text" name="title" /></div>
      <div>File: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
      <input type="submit" value="Upload" />
    </form>
  `);
});

app.get('/picture', (req, res) => {
    res.send(`
    <h2>Add Picture</h2>
    <form action="/api/upload/Picture" enctype="multipart/form-data" method="post">
      <div>Text field title: <input type="text" name="title" /></div>
      <div>File: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
      <input type="submit" value="Upload" />
    </form>
  `);
});

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './app-data/library')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + path.extname(file.originalname));
    }
});

const upload = multer({storage: fileStorageEngine});

app.use(cors({
    origin: '*'
}));

let dir = './app-data/library/pictures/';

app.post('/api/upload/Album', (req, res, next) => {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        writeJSON('albumCache.json', {err, fields, files});
        res.json({ fields, files });
        dir += fields.title;
    });

    fs.mkdir(dir, { recursive: true }, (err) => {
        if (err) {
            throw err;
        }
        console.log("Directory is created.");
    });
});

app.post('/api/upload/Picture', (req, res, next) => {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }

        writeJSON('pictureCache.json', {err, fields, files});
        res.json({ fields, files });
        dir += fields.title;
    });
    res.redirect('/upload')
});

app.get('/upload', (req, res) => {

    res.send(fileStorageEngine.getFilename);
});
// const dir = `./app-data/library/pictures/abc3.json`





// const json = readJSON(`./app-data/library/pictures/abc3.json`);

// let dir = './app-data/library/pictures/';
// for (let i = 0; i < dir.length; i++) {
//     dir += json[i].title;
// }

// app.post('/api/upload', upload.single('someExpressFiles'), (req, res) => {
//
//     console.log(fileStorageEngine.getFilename);
// });

// app.get('/api/upload', function(req, res) {
//     let abc = readJSON('picture-library.json');
//     console.log(abc);
// });

function writeJSON(fname, obj) {
    const dir = path.join(applicationDir, `/${libraryDir}`);
    // let s = JSON.stringify(obj);

    fs.writeFileSync(path.resolve(dir, fname), JSON.stringify(obj));
}

function readJSON(fname) {
    const appDataDir = `app_data/library`
    obj = JSON.parse(fs.readFileSync(path.resolve(appDataDir, fname), 'utf8'));
    return obj;
}






app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});





