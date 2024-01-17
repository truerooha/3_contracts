const express = require('express');
const router = express.Router();
const Database = require('./db');
const jwt = require('jsonwebtoken');
const config = require('./config')


function getUserIdFromToken(req) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, config.jwtSecret);
    return decodedToken.userId;
}  
async function getProfileById(req, res) {
    const db = new Database();
    try { 
      await db.connect();
  
      const sqlQuery = `
        SELECT user_profiles.first_name,
                user_profiles.last_name,
                user_profiles.avatar
        FROM user_profiles
        WHERE user_profiles.user_id = ?;
      `
      const userId = getUserIdFromToken(req);
      const results = await db.query(sqlQuery, [userId]);
      if (results.length > 0) {
        const profile = {
            firstName: results[0].first_name,
            secondName: results[0].last_name,
            avatar: results[0].avatar
        };
        res.json(profile);

        } else {
            res.status(404).json({ error: 'Профиль не найден' });
        }
      
    } catch (error) {
      console.error('Ошибка: ', error);
    } finally {
      await db.end();
    }
}

router.get('/', (req, res) => {
    getProfileById(req,res)
});


module.exports = router;