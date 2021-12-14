const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

/**
 *
 * @param {Number} _id user._id
 * @param {String} email user.email
 * @returns {String}
 */

function generateAccessToken(id, email) {
  return jwt.sign({ id, email }, JWT_SECRET, { expiresIn: '1d' });
}

/**
 *
 * @param {String} token
 * @returns {{ _id: Number, email: String }}
 */
function verifyAccessToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  generateAccessToken,
  verifyAccessToken,
};