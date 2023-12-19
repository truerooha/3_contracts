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

async function saveUser(req, res) {
  const db = new Database();
  const { username, password } = req.body;
  try {
    await db.connect();

    //узнать, нет ли юзера 
    const sqlQuery = 'SELECT * FROM users WHERE `username` = ? ';
    const results = await db.query(sqlQuery, [username]);
    if (results.length > 0) {
      const errorMessage = { Message: 'Пользователь с таким логином уже существует', Code: '0001' };
      return { statusCode: 207, body: JSON.stringify(errorMessage) };
    }

    const hashedPassword= md5(password + 'itsalive');
    const sqlNewUser = "INSERT INTO users (username, password) VALUES (?, ?)";
    const resultNewUser = await db.query(sqlNewUser, [username, hashedPassword]);

  } catch (error) {
    console.error('Ошибка: ', error);
  } finally {
    await db.end();
  }
}

async function removeUser(userId) {
  const db = new Database();
  try {
    await db.connect();

    //узнать, нет ли юзера 
    const sqlQuery = 'DELETE FROM users WHERE `id` = ? ';
    const results = await db.query(sqlQuery, [userId]);
  } catch (error) {
    console.error('Ошибка: ', error);
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
  
router.post('/new', (req, res) => {
  saveUser(req,res)
});

router.delete('/remove/:id', (req, res) => {
  console.log(req.params.id)
  removeUser(req.params.id)
});
  
module.exports = router;