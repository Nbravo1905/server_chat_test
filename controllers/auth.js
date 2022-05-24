const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generateJWT } = require("../helpers/jwt");

const User = require('../models/user');

const createUser = async (req, res = response) => {

  const { email, password } = req.body;

  try {

    const mailExists = await User.findOne({ email });
    if( mailExists ) {
      return res.status(400).json({
        ok: false,
        msg: 'Este correo ya tiene dueño :)'
      });
    }

    const user = new User( req.body );
    
    // Refactor Password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt);

    await user.save();
    //Generate Token
    const token = await generateJWT( user.id );

    return res.json({
      ok: true,
      user,
      token
    });

    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok:false,
      msg: 'Hubo un error intente mas tarde.'
    });
  }

}


const loginUser = async (req, res = response) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if ( !user ) {
      return res.status(404).json({
        ok: false,
        msg: 'Email no encontrado'
      });
    }

    const validatePass = bcryptjs.compareSync( password, user.password );
    if ( !validatePass ) {
      return res.status(400).json({
        ok: false,
        msg: 'La contraseña no coinciden'
      });
    }

    //Generate jwt
    const token = await generateJWT( user.id );

    return res.json({
      ok: true,
      user,
      token
    });
    
  } catch (error) {
    return res.status(500).json({
      ok:false,
      msg: 'Hubo un error intente mas tarde.'
    });
  }

}


const refreshToken = async ( req, res = response) => {

  const uid = req.uid;

  try {

    const token = await generateJWT( uid );

    const user = await User.findById( uid );


    return res.json({
      ok: true,
      user,
      token
    });

  } catch (error) {
    return res.status(500).json({
      ok:false,
      msg: 'Hubo un error intente mas tarde.'
    });
  }

}



module.exports = {
  createUser,
  loginUser,
  refreshToken
};