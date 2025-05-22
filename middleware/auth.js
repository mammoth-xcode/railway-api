const API_TOKEN = process.env.API_TOKEN || '3c3240cf-0949-4400-a0cd-6b1a857bc30e';

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