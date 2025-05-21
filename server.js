const express = require('express');
const request = require('request');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/proxy', (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl || !targetUrl.startsWith('http')) {
    return res.status(400).send('Invalid URL. Must start with http or https.');
  }

  request({ url: targetUrl, followRedirect: true }, (error, response, body) => {
    if (error) {
      return res.status(500).send('Error fetching the URL.');
    }
    res.send(body);
  });
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
