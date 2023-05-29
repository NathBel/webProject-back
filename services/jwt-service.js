const jwt = require('jsonwebtoken');
require('dotenv').config();

async function generateToken(dataId, dataIsAdmin, dataFirstname, dataLastname, dataEmail){
    return jwt.sign({dataId, dataIsAdmin, dataFirstname, dataLastname, dataEmail}, process.env.TOKEN_SECRET);
}

// Verify JWT and check admin status middleware
function requireAdmin(req, res, next) {
  // Get the JWT from the request (e.g., from the Authorization header)
  const token = req.headers.authorization;

  
  if(token !== undefined) {
      // Remove the 'Bearer ' prefix from the token

      const bearer = token.split(' ');
      const bearerToken = bearer[1];

    // Verify the JWT
    jwt.verify(bearerToken, process.env.TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        // Invalid or expired token
        res.status(401).json({ error: 'Invalid token.' });
      } else {
        // Check if user is an admin
        if (decodedToken.dataIsAdmin === 1) {
          // They were an admin, so continue to the specified next function
          next();
        } else {
          // User is not an admin, send a 403 Forbidden response
          res.status(403).json({ error: 'Access denied. Admin privileges required.' });
        }
      }
    });
  } else {
    // No token was sent, so return a 401 Unauthorized response
    res.status(401).json({ error: 'No token provided.' });
  }
}

module.exports = { generateToken, requireAdmin };