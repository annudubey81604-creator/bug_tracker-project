const bcrypt = require("bcryptjs");

const password = "password123"; // yahan apna password likho
const hash = bcrypt.hashSync(password, 10);

console.log("Password:", password);
console.log("Hash:", hash);
