const express = require('express');
const md5 = require('md5');
const router = express.Router();
const Database = require('./db');
const jwt = require('jsonwebtoken');
const config = require('./config')

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
       res.status(401).json({ message: 'Invalid credentials' });
     } else {
      const user = { username, userId: results[0].id };
      const token = jwt.sign(user, config.jwtSecret, { expiresIn: '24h' });

      res.json({ token });
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

    const sqlQuery = 'SELECT * FROM users WHERE `username` = ? ';
    const results = await db.query(sqlQuery, [username]);
    if (results.length > 0) {
      const errorMessage = { Message: 'Пользователь с таким логином уже существует', Code: '0001' };
      res.json({ statusCode: 207, body: JSON.stringify(errorMessage) }); //todo доделать отправку статуса, сейчас не работает
    }

    const hashedPassword= md5(password + 'itsalive');
    const sqlNewUser = "INSERT INTO users (username, password) VALUES (?, ?)";
    const resultNewUser = await db.query(sqlNewUser, [username, hashedPassword]);
    if (resultNewUser.affectedRows > 0) {
      const successMessage = { Message: 'Пользователь успешно создан', Code: '0002' };
      res.json({ success: true, successMessage});
    }

  } catch (error) {
    console.error('Ошибка: ', error);
  } finally {
    await db.end();
  }
}

async function removeUser(userId, res) {
  const db = new Database();
  try {
    await db.connect();

    const sqlQuery = 'DELETE FROM users WHERE `id` = ? ';
    const results = await db.query(sqlQuery, [userId]);
    res.status(200).json({ message: 'Пользователь успешно удален.' });
  } catch (error) {
    console.error('Ошибка: ', error);
    res.status(500).json({ error: 'Произошла ошибка при удалении пользователя.' });
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
  removeUser(req.params.id, res)
});
  
module.exports = router;