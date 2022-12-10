const express = require("express"),
      router = express.Router(),
      { signin, signup } = require("../controllers/user.js");

router.post("/signin", signin);
router.post("/signup", signup);

module.export = {
    router,
}
