const express = require('express');

const app = express();

app.get('/health', (req, res) => {
  res.send('online');
})

app.listen(3000, () => console.log('now live'));