import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import path from "path";

const PORT = 5000 || process.env.PORT;
const dbURL = "mongodb+srv://Admin:Admin123@cluster0.xeif9.mongodb.net/Ashapoorna?retryWrites=true&w=majority";

const app = express();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/products/fashion/");
    },
    filename: (req, file, cb) => {
        const {originalname} = file;
        cb(null, req.body.number + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

mongoose.connect(dbURL)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

const tileSchema = new mongoose.Schema({
    name: String,
    price: String,
    number: String,
});

const Tile = mongoose.model("tile", tileSchema);

app.post("/upload", upload.single('avatar'), async (req, res) => {
    await Tile.findOneAndDelete({
        number: req.body.number
    });
    const tile = new Tile({
        name: req.body.name,
        price: req.body.price,
        number: req.body.number,
    });
    tile.save();
    res.redirect("/");
});

app.get("/getTiles", (req, res) => {
    Tile.find((err, tilesInfo) => {
        res.send(tilesInfo);
    });
});

app.listen(PORT, (req, res) =>
    {
        console.log("Listening on PORT " + PORT);
    }
);