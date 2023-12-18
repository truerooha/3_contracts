const express = require('express');
var cors = require('cors')
const app = express();
const port = 3000;

app.use(cors())

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Node.js API!' });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});