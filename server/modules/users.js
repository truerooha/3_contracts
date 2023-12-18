const express = require('express');
const router = express.Router();
const Database = require('./db');

async function getUsers(req, res) {
  const db = new Database();
  try {
    await db.connect();

    const sqlQuery = 'SELECT * FROM users';
    const results = await db.query(sqlQuery);
    console.log(results)
    res.send(results)

  } catch (error) {
    console.error('Ошибка: ', error);
  } finally {
    await db.end();
  }
}

router.get('/', (req, res) => {
    getUsers(req,res)
});
  
router.get('/:id', (req, res) => {
  const contractId = req.params.id;
  res.send(`Метод для получения контрагента по ID: ${contractId}`);
});
  
router.post('/', (req, res) => {
  res.send('Метод для создания нового конрагента');
});
  
module.exports = router;