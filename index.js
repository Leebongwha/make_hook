const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/ro18ayqk755ijh6vprb93sowg109syje';

app.use(express.json());

app.post('/webhook', async (req, res) => {
  try {
    // 요청 본문을 그대로 Make로 전달
    const response = await axios.post(MAKE_WEBHOOK_URL, req.body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res.status(200).send('Forwarded to Make');
  } catch (error) {
    console.error('Error forwarding to Make:', error.message);
    res.status(500).send('Failed to forward');
  }
});

app.get('/', (req, res) => {
  res.send('Webhook Proxy is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
