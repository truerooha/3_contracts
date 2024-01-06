const express = require('express');
var cors = require('cors')
const app = express();
const port = 3000;

app.use(cors())
app.use(express.json())

const middleware = require('./modules/middlware');
const contractsRoutes = require('./modules/contracts.js');
const filesRoutes = require('./modules/files.js');
const CPRoutes = require('./modules/CP.js');
const usersRoutes = require('./modules/users.js');

app.use(middleware.requestMiddleware);

app.use('/files', filesRoutes);
app.use('/contracts', contractsRoutes);
app.use('/CP', CPRoutes);
app.use('/users', usersRoutes);

app.get('/api', (req, res) => {
    res.json({ message: 'API' });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});