const User = require('../models/user.js'),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  secret = 'test';

module.exports = function (router) {

  console.log('ran auth.js line 10');
  console.log('');

  // const signInRoute = router.route('/signin');
  const signInRoute = router.route('/signin');

  signInRoute.post(async (req, res) => {
    const { email, password } = req.body;

    try {
      const oldUser = await User.findOne({ email });

      if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

      const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

      res.status(200).json({ result: oldUser, token });
    } catch (err) {
      console.log('user.js ;line 24' + err);
      res.status(500).json({ message: "Something went wrong" });
    }
  });


  const signUpRoute = router.route('/signup');

  signUpRoute.post(async (req, res) => {
    const { email, password, userName } = req.body;

    try {
      const oldUser = await User.findOne({ email });

      if (oldUser) return res.status(400).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 12);

      const result = await User.create({ email, password: hashedPassword, userName: `${userName}` });

      const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

      console.log('try to sign in');

      res.status(201).json({ result, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }

  });

  return router;
}
