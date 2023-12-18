const express = require('express');
var cors = require('cors')
const app = express();
const port = 3000;

app.use(cors())

const contractsRoutes = require('./modules/contracts.js');
const CPRoutes = require('./modules/CP.js');
app.use('/contracts', contractsRoutes);
app.use('/CP', CPRoutes);

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from Node.js API!' });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});