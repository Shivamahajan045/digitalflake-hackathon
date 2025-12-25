const bcrypt = require("bcryptjs");

const users = [
  {
    id: 1,
    email: "admin@digitalflake.com",
    password: bcrypt.hashSync("admin123", 10),
  },
];

module.exports = users;
