require("dotenv/config");
require("./db");

const express = require("express");
const contRouters = require("./routes/contRouters");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/cont', contRouters);

app.listen(process.env.PORT || 3000);