const express = require("express");
const app = express();
const path = require("path");
// console.dir(app);
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const bodyParser = require('body-parser');
const crypto = require('crypto');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
// const Terminal = require("xterm");



// Starting mongod:
// brew services start mongodb-community@5.0
// brew services stop mongodb-community@5.0
// brew services list
// mongosh

// Connecting to mongod through mongoose:
mongoose.connect('mongodb://localhost:27017/grid_fs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    // .then(() => {
    //     console.log("Mongo connection is active.");
    // })
    .catch((err) => {
        console.log("Error in initial Mongod connection.", err);
        // console.log(err);
    })

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database connection in ACTIVE");
    console.log("Initializing GridFS Stream: ")
    let gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
});
// The .on() is Node.js thing and not specifically mongoose thing.
// Both .on and .once are attached to listenerEvents().


// Initializing storage engine by multer-gridfs-storage:
const storage = new GridFsStorage({
    url: 'mongodb://localhost:27017/grid_fs',
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    // The bucket name should match the collection name:
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });




app.set("view engine", "ejs");
// Setting the "views" folder path.
app.use(express.static(path.join(__dirname, "/public")));
// Setting up the location of public folder for serving static files like CSS/JavaScript.
app.set("views", path.join(__dirname, "/views"));
// Setting up the views directory for templates.

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Parsing middleware for POST requests.

app.use(bodyParser.json());

// MongoURI:
// const mongoURI = "mongodb://localhost:27017/grid_fs";

app.use(methodOverride("_method"));
// Middleware for the method-override package.
// One of the 3 ways to use method-override (like delete) package for HTTP requests.


// wrapAsync function:
function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch((e) => {
            next(e);
        })
    }
}
// The wrapAsync() function to handle the Async errors without the try/catch block
// for every route handler.


// ROUTES:
app.get("/files/:id2", wrapAsync(async (req, res, next) => {
    // console.log(req.params);
    const { id } = req.params;
    const objById = await Product.findById(id)

    // .then((objById) => {
    //     res.render("show.ejs", { objById: objById });
    // })
    // .catch((err) => {
    //     console.log(err);
    //     res.send("ERROR caught in .catch()");
    // })
    // I don't think .catch will even work with mongoose calls as Product.findById(id)
    // will return a "thenable" not a promise and .catch dosen't handle thenables. (I think?).


    if (!objById) {
        throw new AppError("Error...Something broke!", 402);
    }
    res.render("show.ejs", { objById: objById });
    // Have to add return or an else block so that res.render doesn't run after the next(()) call
    // as the execution of the code will not stop. (stack/queue??).

    // Not doing it the try/catch way for all the middleware routes.



    // console.log(objById.name);
    // res.render("show.ejs", { objById: objById });
}));


app.get("/file_uploads", (req, res) => {
    res.render("index.ejs");
})


app.get("/", (req, res) => {
    res.render("test.ejs");
})

app.post("/upload", upload.single("doc"), (req, res) => {
    res.json({ file: req.file });
})

app.get("/test_terminal", (req, res) => {
    res.render("testTerminal.ejs");
})



// Connection to port 8081:
app.listen(8081, () => {
    console.log("8081: ACTIVE");
    console.log(`Express server at 8081 is up and running.`);
});