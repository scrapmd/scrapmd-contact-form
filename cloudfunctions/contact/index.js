/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const https = require('https');
 
exports.submit = (httpReq, httpRes) => {
  const { method, body } = httpReq;
  if (method === 'OPTIONS') {
    httpRes.set('Access-Control-Allow-Origin', "*");
    httpRes.set('Access-Control-Allow-Methods', 'POST');
    httpRes.status('204').send('');
    return;
  }
  if (method !== 'POST') {
    httpRes.status(400).send(`Method ${method} is not allowed.`);
    return;
  }

  console.info(body);

  const postData = JSON.stringify(body);
  const macroId = process.env.MACRO_ID;
  const options = {
    host: 'script.google.com',
    port: '443',
    path: `/macros/s/${macroId}/exec`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };
  const req = https.request(options, (res) => {
    res.on('end', () => {
      httpRes.status(200).send('ok');
    });
  });
  req.on('error', (e) => {
    console.error(e);
    httpRes.status(500).send('error');
  });
  req.write(postData);
  req.end();
};
