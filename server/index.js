const express = require("express");
const app = express();

const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const taskRoute = require("./routes/tasks");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
)

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
)


const passport = require("passport")
const session = require('express-session')


app.use(session({
    secret: `${process.env.session_key}`,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


app.use(passport.initialize());
app.use(passport.session());



//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/task", taskRoute);


//def route

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: 'Your server is up and running....'
    });
});

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
})