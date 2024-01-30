const express = require('express');
const router = express.Router();
const Database = require('./db');

async function getFilesByContractId(contractId, res) {
    const db = new Database();
    try { 
      await db.connect();
  
      const sqlQuery = `
        SELECT attachment_files.file_name AS name,
              attachment_files.file_ext AS type
        FROM attachment_owners
        JOIN attachment_files ON attachment_owners.id = attachment_files.owner_id
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

async function saveFileMetadata(req, res) {
  const db = new Database();

  try {
    await db.connect();
    const data = req.body;

    if (data.attaches && data.attaches.length > 0) {
      const sqlOwner = 'INSERT INTO attachment_owners (contract_id, owner_type) VALUES (?, ?)';
      const ownerResult = await db.query(sqlOwner, [data.contractId, 'contracts']);
    
      const ownerId = ownerResult.insertId;
    
      const valuesToInsert = data.attaches.map(attach => {
        const fileName = attach.name.replace(/[^\w\s.]/gi, '');
        const fileType = attach.type;
        const fileExt = attach.ext;
        return [ownerId, fileName, fileType, fileExt];
      });
    
      const sqlAttach = 'INSERT INTO attachment_files (owner_id, file_name, file_type, file_ext) VALUES ?';
      await db.query(sqlAttach, [valuesToInsert]);
    }
  } catch (error) {
    console.error('Ошибка: ', error);
  } finally {
    await db.end();
  }
}

router.post('/', (req, res) => {
  saveFileMetadata(req,res)
});

router.get('/:id', (req, res) => {
    const contractId = req.params.id;
    getFilesByContractId(contractId,res)
});

module.exports = router;