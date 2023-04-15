const isemail = require('isemail');

function validateEmail(email) {
    return isemail.validate(email);
};

module.exports = {
    validateEmail,
};
