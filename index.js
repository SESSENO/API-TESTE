require("dotenv/config");
require("./db");

const express = require("express");
const contRouters = require("./routes/contRouters");
// const MongoDBStore = require("connect-mongodb-session")(session);

//Geração de Cookie com Id da sessão..Uma espécie de chave que fica armazenado no DB.
// const store = new MongoDBStore({
//   uri: process.env.MONGODB_URI,
//   collection: "sessions",
// });

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     saveUninitialized: true,
//     resave: false,
//     store,
//   })
// );

app.use('/cont', contRouters);

app.listen(process.env.PORT || 3000);