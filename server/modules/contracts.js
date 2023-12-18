const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Метод для получения всех договоров');
  });
  
  router.get('/:id', (req, res) => {
    const contractId = req.params.id;
    res.send(`Метод для получения договора по ID: ${contractId}`);
  });
  
  router.post('/', (req, res) => {
    res.send('Метод для создания нового договора');
  });
  
  module.exports = router;