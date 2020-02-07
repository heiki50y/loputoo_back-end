const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const errorHandler = require('./app/middleware/error')
const cors = require("cors");
const cookieParser = require('cookie-parser');

// Load env vars
dotenv.config({ path: './app/config/config.env' });

// Route files

const users = require('./app/routes/user.routes');
const auth = require('./app/routes/auth.routes');
const taotlus = require('./app/routes/taotlus.routes')
const hinnanguleht = require('./app/routes/hinnanguleht.routes');

const app = express();

// // var corsOptions = {
// //   origin: "http://localhost:8081"
// // };

// app.use(cors(corsOptions));

// Body parser and Cookie parser
app.use(express.json());
app.use(cookieParser());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });


// Mount routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/taotlus', taotlus)
app.use('/api/hinnanguleht', hinnanguleht);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error ${err.message}`);
    server.close(() => process.exit(1));
});
