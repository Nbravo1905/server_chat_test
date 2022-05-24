/*

  path: api/login

*/

const { Router } = require('express');
const { check } = require('express-validator');

const { createUser, loginUser, refreshToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateRes } = require('../middlewares/validate-res');

const router = Router();

router.post('/new', [
  check('name', 'El nombre es Obligatorio').not().isEmpty(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  check('email', 'El correo es Obligatorio').isEmail(),
  validateRes
] ,createUser);

router.post('/', [
  check('email', 'El correo es Obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  validateRes
] ,loginUser);

router.get('/refresh', validateJWT, refreshToken);

module.exports = router;