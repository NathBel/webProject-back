const bcrypt = require('bcrypt');
const cryptojs = require("crypto-js");
require('dotenv').config();

function hashPassword(salt, password) {
    const hash = bcrypt.genSaltSync(salt);
    console.log("PASSWORD: " + password);
    return bcrypt.hashSync(password, hash);
}

function comparePassword(receivedPassword, hashedPassword) {
    return bcrypt.compareSync(receivedPassword, hashedPassword);
}

function decryptPassword(password) {
    return cryptojs.AES.decrypt(password, process.env.ENCRYPTION_KEY).toString(cryptojs.enc.Utf8);
}


module.exports = {
    hashPassword,
    comparePassword,
    decryptPassword,
};
