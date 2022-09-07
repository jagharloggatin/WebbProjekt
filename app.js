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

const appDir = 'app-data';
const appJson = 'directories.json';

// app.get('/album', (req, res) => {
//     res.send(`
//     <h2>Add Album</h2>
//     <form action="/api/upload/Album" enctype="multipart/form-data" method="post">
//       <div>Text field title: <input type="text" name="title" /></div>
//       <div>File: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
//       <input type="submit" value="Upload" />
//     </form>
//   `);
// });

// app.get('/picture', (req, res) => {
//     res.send(`
//     <h2>Add Picture</h2>
//     <form action="/api/upload/Picture" enctype="multipart/form-data" method="post">
//       <div>Text field title: <input type="text" name="title" /></div>
//       <div>File: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
//       <input type="submit" value="Upload" />
//     </form>
//   `);
// });

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'app-data/library')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + path.extname(file.originalname));
    }
});

const upload = multer({storage: fileStorageEngine});

app.use(cors({
    origin: '*'
}));

let dir = 'app-data/library/pictures/hey';

app.post('/api/upload/album', (req, res, next) => {
    const form = formidable();



    form.parse(req, (err, fields, files) => {
        if (err) {
            return;
        }

        writeJSON('albumCache.json', {err, fields, files});
        res.json({ fields, files });
        dir += fields.title;

        console.log('POST body:', fields);

        let dirStruct = [];
        if (fileExists(appJson))
            dirStruct  = readJSON(appJson);

        //get the data sent over from browser
        const dirToCreate = fields['directory'];



        //create the directory
        const pathToCreate = path.join(__dirname, appDir, dirToCreate);
        if (pathToCreate != '' && !fs.existsSync(path.resolve(pathToCreate)))
        {
            //make sure appDir exists
            const appDataPath = path.join(__dirname, appDir);
            if (!fs.existsSync(path.resolve(appDataPath)))
                fs.mkdirSync(path.resolve(appDataPath));

            //create the directory
            if (!fs.existsSync(path.resolve(pathToCreate)))
                fs.mkdirSync(path.resolve(pathToCreate));

            //update the json file
            dirStruct.push(dirToCreate)
            writeJSON(appJson, dirStruct);

        }

        //send success response
        res.sendStatus(200);
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

});


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

function fileExists(fname) {
    const appDataDir = path.join(__dirname, appDir);
    return fs.existsSync(path.resolve(appDataDir, fname));
}





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});





