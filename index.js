import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

const targetUrl = 'https://hiveonboard.com/api/tickets';

app.post('/forward-requests', (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).send('Access token is required');
  }

  const requests = Array.from({ length: 20 }).map(() =>
    axios.post(targetUrl, { accessToken })
      .catch(() => {}) 
  );

  Promise.all(requests);

  res.status(200).send('Requests sent to target API');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Final server listening on port ${port}`);
});
