const express = require("express");
const mysql   = require("mysql2");
const cors    = require("cors");
const multer  = require("multer");
const path    = require("path");

const app  = express();
const port = 4000;

// load env for sensitive data
require("dotenv").config();
const dbPassword = process.env.REACT_APP_MYSQL_PW;


//middleware
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Origin"]
}));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


// multer for simpler file uploads
// multer 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //path to save the uploaded images
        cb(null, "../uploads");
    },
    filename: (req, file, cb) => {
        //give the file a unique name
        cb(null, `${Date.now()}_${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });




//database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "slyandlethal",
    password: dbPassword,
    database: "SparrTruckPartsInventory"
});

// handling errors if db connection fails
db.connect((err) => {
    if (err){
        console.error("Database connection failed:", err);
    }
    else {
        console.log("Connected to MySQL Database.");
    }
});


//API routes
app.get("/trucks", (req, res) => {
    db.query("SELECT * FROM trucks", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });    
        res.json(results);
    });
});

app.post("/add-truck", upload.single("image"), (req, res) => {
    const { year, make, model, status, description } = req.body;
    const image_file = req.file;
    const imageUrl = `./uploads/${image_file.filename}`

    const query = "INSERT INTO trucks (year, make, model, status, description, image_url) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(query, [year, make, model, status, description, imageUrl], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
            message: "Truck added successfully",
            truck: {
                id: results.insertId, // Return the newly inserted truck ID
                year,
                make,
                model,
                status,
                description,
                image_url: imageUrl,
            }
        });
    });
});

app.delete("/delete-truck/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM trucks WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: "Truck not found" });
        res.json({ message: "Truck deleted successfully" });
    });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});