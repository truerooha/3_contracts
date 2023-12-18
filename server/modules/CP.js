const express = require('express');
const router = express.Router();
const Database = require('./db');

async function getCPs(req, res) {
  const db = new Database();
  try {
    await db.connect();

    const sqlQuery = 'SELECT * FROM counterparties';
    const results = await db.query(sqlQuery);
    console.log('Результаты запроса: ', results);
    res.send(results)
  } catch (error) {
    console.error('Ошибка: ', error);
  } finally {
    await db.end();
  }
}

router.get('/', (req, res) => {
    getCPs(req,res)
  });
  
  router.get('/:id', (req, res) => {
    const contractId = req.params.id;
    res.send(`Метод для получения контрагента по ID: ${contractId}`);
  });
  
  router.post('/', (req, res) => {
    res.send('Метод для создания нового конрагента');
  });
  
module.exports = router;