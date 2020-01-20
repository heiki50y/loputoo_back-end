const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const cors = require("cors");

// Load env vars
dotenv.config({ path: './app/config/config.env' });

// Route files
const studentDocument = require('./app/routes/studentdoc.routes');
const companyDocument = require('./app/routes/practicedoc.routes');
const users = require('./app/routes/user.routes');

const app = express();

// // var corsOptions = {
// //   origin: "http://localhost:8081"
// // };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });


// Mount routes
app.use('/api/studentdoc', studentDocument);
app.use('/api/practicedocs', companyDocument);
app.use('/api/users', users);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error ${err.message}`);
    server.close(() => process.exit(1));
});
