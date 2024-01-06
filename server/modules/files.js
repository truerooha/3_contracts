const express = require('express');
const router = express.Router();
const Database = require('./db');

async function getFilesByContractId(contractId, res) {
    const db = new Database();
    try { 
      await db.connect();
  
      const sqlQuery = `
        SELECT attachment_files.file_name AS name,
              attachment_files.file_ext AS type,
              attachment_files.file_data AS data
        FROM attachment_owners
        JOIN attachment_files ON attachment_owners.owner_id = attachment_files.owner_id
        WHERE attachment_owners.contract_id = ?;
      `
      const results = await db.query(sqlQuery, [contractId]);
      const resultArray = results.map(row => ({
        name: row.name,
        type: row.type,
        size: null,
        data: row.data
      }));
  
      res.send(resultArray);
      
    } catch (error) {
      console.error('Ошибка: ', error);
    } finally {
      await db.end();
    }
}

router.get('/:id', (req, res) => {
    const contractId = req.params.id;
    getFilesByContractId(contractId,res)
});

module.exports = router;