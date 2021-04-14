const dotenv = require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

const path = require("path");
const app = express();
const pdf = require('express-pdf');
const connectDB = require("./src/db/conn");

const PORT = process.env.PORT || 3000;

// mongodb connection
connectDB();

const static_path = path.join(__dirname, "./public");
const template_path = path.join(__dirname, "./templates/views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(pdf);

app.set("view engine", "ejs");
app.set("views", template_path);

app.use(express.static(static_path));

// app.use('/download-train-ticket', function(req, res){
//     res.pdfFromHTML({
//         filename: 'generated.pdf',
//         html: path.resolve(__dirname, './templates/views/trainTicket.ejs'),
//     });
// });

// load routers
app.use('/', require('./src/routes/router'))

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});
