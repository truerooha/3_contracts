const express = require('express');
const md5 = require('md5');
const router = express.Router();
const Database = require('./db');

async function getUsers(req, res) {
  const db = new Database();
  try {
    await db.connect();

    const sqlQuery = 'SELECT * FROM users';
    const results = await db.query(sqlQuery);
    res.send(results)

  } catch (error) {
    console.error('Ошибка: ', error);
  } finally {
    await db.end();
  }
}

async function login(req, res) {
  const db = new Database();
  const { username, password } = req.body;
  const hashedPassword = md5(password + 'itsalive');
  try {
    await db.connect();

    const sqlQuery = 'SELECT * FROM `users` WHERE `username` = ? AND `password` = ?'
    const results = await db.query(sqlQuery, [username, hashedPassword]);
    if (results.length === 0) {
      res.json({ authorized: false });
    } else {
      res.json({ authorized: true });
    }
  } catch (error) {
    res.status(500).json({ authorized: false, error: 'Ошибка сервера' });
  } finally {
    await db.end();
  }
}

router.get('/', (req, res) => {
    getUsers(req,res)
});

router.post('/login', (req, res) => {
  login(req, res)
});
  
router.get('/:id', (req, res) => {
  const contractId = req.params.id;
  res.send(`Метод для получения контрагента по ID: ${contractId}`);
});
  
router.post('/', (req, res) => {
  res.send('Метод для создания нового конрагента');
});
  
module.exports = router;