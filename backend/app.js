const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const routes = require("./routes");

const { environment } = require("./config");
const isProduction = environment === "production";

const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

// Security middleware

// enable cors in development only
if (!isProduction) app.use(cors());


// enable helmet
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin",
    })
);

app.use(helmet({ contentSecurityPolicty: false }));

// set up csrf
app.use(csurf({
    cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true,
    }
}));

// set up routes
app.use(routes);


module.exports = app;
