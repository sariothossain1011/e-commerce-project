const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv")
const httpError = require("http-errors");
const xssClean = require("xss-clean");
const expressRateLimit = require("express-rate-limit")
const app = express();


const limiter = expressRateLimit({
	windowMs: 1 * 60 * 1000, // 15 minutes
	limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  message:"Too many requests from this IP. please try again", // when cross the limit then show this message . 
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	// store: ... , // Use an external store for more precise rate limiting
})

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(xssClean());
app.use(limiter);








app.get("/hello", (req, res) => {
  res.status(200).json({ message: "hello hello hello" });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: " hello" });
});

// CLIENT ERROR HANDLING
app.use((req, res, next) => {
  next(httpError(404,"Route Not Found"));
});
// SERVER ERROR HANDLING
app.use((err,req, res, next) => {
  return res.status(err.status || 500).json({
    success:false,
    message:err.message,
  })
});



module.exports = app;
