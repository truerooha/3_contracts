const express = require('express');
const router = express.Router();
const Database = require('./db');

async function getSummary(req, res) {
  const db = new Database();
  try {
    await db.connect();

    const sqlQuery = `
        SELECT
            COUNT(*) AS total_contracts,
            SUM(CASE WHEN expiration_date < CURRENT_DATE THEN 1 ELSE 0 END) AS expired_contracts
        FROM
            Contracts`
    const results = await db.query(sqlQuery);
    
    const summary = results.length > 0 ? results[0] : null;
    res.send(summary);
  } catch (error) {
    console.error('Ошибка: ', error);
  } finally {
    await db.end();
  }
}

router.get('/summary', (req, res) => {
  getSummary(req, res)
});

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