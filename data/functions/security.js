const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();

const users = {
    admin: process.env.ADMIN_PASS,
    user: process.env.USER_PASS
}


/**
 * Generate access token: the token will define the user session and cookies which will last for what has been defined in process.env.TOKEN_SECRET.{ expiresIn: "5h" }
 *
 * @param {String} username 
 * @return {String} access token
 */
function generateAccessToken(username) {
    const signature = [
        { username },
        process.env.TOKEN_SECRET,
        { expiresIn: "5h" }
    ]
    return jwt.sign(...signature);
}

function verifyAccessToken(token) {
    return jwt.verify(token, process.env.TOKEN_SECRET);
}

/**
 * 
 * @param {*} user gets the value of the user sent by form on login file
 * @param {*} pass get value of pass sent by form
 * @returns true if the value sent by from matchs hash from the compareSync function, if pass doesn't match it will return false
 */
function checkPass(user="", pass="") {
    try {
        const encPass = users[user];
        if (encPass && bcrypt.compareSync(pass, encPass)) {
            return true;
        } else {
            return false;
        }
    }
    catch (err) {
        return false;
    }
}


module.exports = {
    generateAccessToken,
    checkPass,
    verifyAccessToken
};
