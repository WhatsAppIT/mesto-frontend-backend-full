const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
const allowedCors = [
  'https://krivolapov.nomoredomainsmonster.ru',
  'http://krivolapov.nomoredomainsmonster.ru',
  'http://localhost:3000',
  'https://api.krivolapov.nomoredomainsmonster.ru',
  'http://api.krivolapov.nomoredomainsmonster.ru',
  'localhost:3000',
];

const corsAllow = (req, res, next) => {
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', true);
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Headers', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders);
      return res.end();
  }

  return next();
};

module.exports = corsAllow;