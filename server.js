import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import dotenv from "dotenv";
import { engine } from "express-handlebars";
import { fileURLToPath } from "url";
import { createClient } from '@supabase/supabase-js'

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
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SECRET = process.env.SUPABASE_ANON_KEY;
const supabase = createClient("https://vlwmqovyhcdwxrgfkrml.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsd21xb3Z5aGNkd3hyZ2Zrcm1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NjQ4NTYsImV4cCI6MjA2MzM0MDg1Nn0.T--U4EDN0tTk-nmHGuQa0DZuSg_sA0UFIofME74tn2A");
const { data, error } = await supabase
    .from('test')
    .select()

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