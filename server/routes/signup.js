const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = 'test';

module.exports = function (router) {
  const signUpRoute = router.route('/signup');

  signUpRoute.post(async (req, res) => {

    const { email, password, username } = req.body;

    try {
      const oldUser = await User.findOne({ email });

      if (oldUser) return res.status(400).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 12);

      const result = await User.create({ email, password: hashedPassword, username: `${username}` });

      const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

      res.status(201).json({ result, token });
    } catch (err) {
      res.status(500).json({ 'message': "Something went wrong", 'err': err });
      console.log(err);
    }

  });

  return router;
}
