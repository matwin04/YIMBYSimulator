import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import dotenv from "dotenv";
import { engine } from "express-handlebars";
import { fileURLToPath } from "url";

// Load env variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const VIEWS_DIR = path.join(__dirname, "views");
const PARTIALS_DIR = path.join(VIEWS_DIR, "partials");
const PUBLIC_DIR = path.join(__dirname, "public");

const upload = multer();
const PORT = process.env.PORT || 3003;
const IMMICH_URL = process.env.IMMICH_URL;
const IMMICH_API_KEY = process.env.IMMICH_API_KEY;

// Template engine
app.engine("html", engine({ extname: ".html", defaultLayout: false, partialsDir: PARTIALS_DIR }));
app.set("view engine", "html");
app.set("views", VIEWS_DIR);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(PUBLIC_DIR));

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});