const express = require('express');
const path = require('path');
require('dotenv').config();

require('./database/config').dbConnection();


// App Express
const app = express();

//Lectura JSON y parseo
app.use( express.json() );

//Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');


//path
const publicPath = path.resolve( __dirname, 'public');
app.use( express.static(publicPath) );


//Rutas
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/users', require('./routes/users') );
app.use( '/api/messages', require('./routes/messages') );


server.listen(process.env.PORT, (err) => {
  if (err) throw new Error(err);

  console.log('Servidor Puerto', process.env.PORT);
})
