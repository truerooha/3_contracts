const express = require('express');
const router = express.Router();
const Database = require('./db');

async function getPermissions(req, res) {
    const db = new Database();
    let permissions = []
    try {
        await db.connect();

        const sqlQuery = 'SELECT role_id FROM user_roles WHERE user_id = ?';
        const userId = req.user.userId;
        const resultsRoles = await db.query(sqlQuery, [userId]);

        if (resultsRoles.length === 0) {
            res.send(permissions);
            return;
        }
        const roleIds = resultsRoles.map(result => result.role_id);
        const sqlQueryPermissions = `SELECT permission_id, permissions.permission_name 
                                        FROM role_permissions
                                        JOIN permissions ON role_permissions.permission_id = permissions.id
                                        WHERE role_id IN (?)`;
        const results = await db.query(sqlQueryPermissions, [roleIds]);
        const resultsPermissions = results.map(result => result.permission_name);

        res.send(resultsPermissions)
    } catch (error) {
        console.error('Ошибка: ', error);
    } finally {
        await db.end();
    }
  }

router.get('/', (req, res) => {
    getPermissions(req,res)
});

module.exports = router;