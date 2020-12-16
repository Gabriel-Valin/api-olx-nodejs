require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');
const apiRoutes = require('./src/route');

// connection db

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
  console.log('Error: ', error.message);
})

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(fileupload());

server.use(express.static(__dirname+'/public'));
server.use('/', apiRoutes);
server.get('/ping', (req, res) => {
  res.json({message: true})
});

server.listen(process.env.PORT, () => {
  console.log(`✔✔ - Back-end server is running on PORT: ${process.env.PORT}`);
});