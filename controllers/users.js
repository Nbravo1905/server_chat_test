const { response } = require("express");
const User = require('../models/user');

const getUsers = async (req, res = response) => {

  const to = Number( req.query.to ) || 0;

  const users = await User
    .find({ _id: { $ne: req.uid } })
    .sort('-online')
    .skip(to)
    .limit(20)

  res.json({
    ok: true,
    users,
    to
  });

}



module.exports = {
  getUsers
}