const API_TOKEN = process.env.API_TOKEN || 'your-secure-api-token';

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ status: 'Error', message: 'Missing API token.' });
  }

  if (token !== `Bearer ${API_TOKEN}`) {
    return res.status(403).json({ status: 'Error', message: 'Invalid API token.' });
  }

  next();
}

module.exports = authenticateToken;