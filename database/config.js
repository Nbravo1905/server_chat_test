const mongoose = require('mongoose');

const dbConnection = async () => {
  
  try {

    await mongoose.connect(process.env.DB_CNN, () => {
        console.log("Mongo connected");
    });

  } catch (err) {
    console.log(err);
    throw new Error('Error en la base de datos...');
  }

}

module.exports = {
  dbConnection
}