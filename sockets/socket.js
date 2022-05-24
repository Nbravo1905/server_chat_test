const {io} = require('../index');

const { checkJWT } = require('../helpers/jwt');
const { userConnect, userDesconnect, saveMessage } = require('../controllers/socket');


//Mensaje de Sockets
io.on('connection', client => {

  const [ check, uid ] = checkJWT(client.handshake.headers['x-token']);

  if ( !check ) { return client.disconnect(); }

  userConnect(uid);


  client.join(uid);

  client.on('mensaje-personal', async (payload) => {
    console.log(payload);

    await saveMessage(payload);

    io.to( payload.para ).emit('mensaje-personal', payload);

  })

  
  client.on('disconnect', () => { 
    userDesconnect(uid);
  });

});