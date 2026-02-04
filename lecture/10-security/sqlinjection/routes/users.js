var express = require("express");
var router = express.Router();
var Sequelize = require("sequelize");

const sequelize = new Sequelize("test", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  dialectOptions: {
    multipleStatements: true
  }
});

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// florian';drop table users;

router.post("/search", async (req, res) => {
  let username = req.body.username;

  const safeQuery = await sequelize.query("select * from users where name=?", [
    username
  ]);
  console.log("SAFE: ", safeQuery);

  let unsafeQuery = "select * from users where name='" + username + "';";
  console.log("UNSAFE: ", unsafeQuery);
  const [results, metadata] = await sequelize.query(unsafeQuery);

  res.json(results);
});

module.exports = router;
