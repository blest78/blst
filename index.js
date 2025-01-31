const http = require('http');
const axios = require('axios');

const targetUrl = 'https://hiveonboard.com/api/tickets';

const server = http.createServer((req, res) => {
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const { accessToken } = JSON.parse(body);

    const requests = Array.from({ length: 20 }).map(() => 
      axios.post(targetUrl, { accessToken })
    );

    Promise.all(requests)
      .catch(() => {});

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Requests sent to target API.');
  });
});

server.listen(3000);
