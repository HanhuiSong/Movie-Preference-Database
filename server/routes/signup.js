const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = 'test';

module.exports = function (router) {

  // console.log('ran auth.js line 8');
  // console.log('');

  //  // api/auth/signin
  // const signInRoute = router.route('/signin');

  // console.log('ran auth.js line 15');

  // signInRoute.post(async (req, res) => {
  //   const { email, password } = req.body;

  //   try {
  //     const oldUser = await User.findOne({ email });

  //     if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

  //     const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

  //     if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

  //     const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

  //     res.status(200).json({ result: oldUser, token });
  //   } catch (err) {
  //     console.log('user.js ;line 24' + err);
  //     res.status(500).json({ message: "Something went wrong" });
  //   }
  // });


  const signUpRoute = router.route('/signup');

  console.log('ran auth.js line 39');

  signUpRoute.post(async (req, res) => {

    const { email, password, username } = req.body;

    try {
      console.log('ran auth.js line 54');
      const oldUser = await User.findOne({ email });
      console.log('ran auth.js line 56');
      if (oldUser) return res.status(400).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 12);

      const result = await User.create({ email, password: hashedPassword, username: `${username}` });

      const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

      console.log('try to sign in');

      res.status(201).json({ result, token });
    } catch (err) {
      console.log('auth.js line 55');
      res.status(500).json({ 'message': "Something went wrong", 'err': err });
      console.log(err);
    }

  });

  return router;
}
