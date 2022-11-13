const express = require("express");
const app = express();
const path = require("path");
// console.dir(app);
const mongoose = require("mongoose");
const methodOverride = require("method-override");

mongoose.connect('mongodb://localhost:27017/farmerMarket_errorSection', { useNewUrlParser: true })
    .then(() => {
        console.log("Mongo connection is active.");
    })
    .catch((err) => {
        console.log("Error in Mongo connection.", err);
        // console.log(err);
    })

app.set("view engine", "ejs");
// Setting the "views" folder path.
app.use(express.static(path.join(__dirname, "/public")));
// Setting up the location of public folder for serving static files like CSS/JavaScript.
app.set("views", path.join(__dirname, "/views"));
// Setting up the views directory for templates.

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Parsing middleware for POST requests.

app.use(methodOverride("_method"));
// Middleware for the method-override package.


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











app.listen(8081, () => {
    console.log(`Express connection is ACTIVE`);
});