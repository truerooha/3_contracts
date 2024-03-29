const express = require('express');
var cors = require('cors')
const app = express();
const port = 3000;
const path = require('path');

app.use(cors())
app.use(express.json())

const middleware = require('./modules/middlware');
const contractsRoutes = require('./modules/contracts.js');
const filesRoutes = require('./modules/files.js');
const CPRoutes = require('./modules/CP.js');
const usersRoutes = require('./modules/users.js');
const profileRoutes = require('./modules/profile.js');
const fileUploadRoutes = require('./modules/fileUploads');
const permissionRoutes = require('./modules/permissions');


app.use(middleware.requestMiddleware);
app.use('/uploads', fileUploadRoutes);
app.use('/files', filesRoutes);
app.use('/contracts', contractsRoutes);
app.use('/CP', CPRoutes);
app.use('/users', usersRoutes);
app.use('/profile', profileRoutes);
app.use('/permissions', permissionRoutes);

app.get('/api', (req, res) => {
    res.json({ message: 'API' });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});