const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Метод для получения всех контрагентов');
  });
  
  router.get('/:id', (req, res) => {
    const contractId = req.params.id;
    res.send(`Метод для получения контрагента по ID: ${contractId}`);
  });
  
  router.post('/', (req, res) => {
    res.send('Метод для создания нового конрагента');
  });
  
  module.exports = router;