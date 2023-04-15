const bcrypt = require('bcrypt');

function hashPassword(salt, password) {
    const hash = bcrypt.genSaltSync(salt);
    console.log("PASSWORD: " + password);
    return bcrypt.hashSync(password, hash);
}

function comparePassword(receivedPassword, hashedPassword) {
    return bcrypt.compareSync(receivedPassword, hashedPassword);
}

module.exports = {
    hashPassword,
    comparePassword,
};
