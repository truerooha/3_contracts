const express = require('express');
const router = express.Router();
const dayjs = require('dayjs');
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

async function getContractById(contractId, res) {
  const db = new Database();
  try { 
    await db.connect();

    const sqlQuery = 'SELECT * FROM contracts WHERE contract_id = ?';
    const results = await db.query(sqlQuery, [contractId]);
    const result = results.length > 0 ? results[0] : null;
    if (result && result.contract_date) {
      result.contract_date = dayjs(result.contract_date).format('YYYY-MM-DD');
    }
    res.send(result);
    
  } catch (error) {
    console.error('Ошибка: ', error);
  } finally {
    await db.end();
  }
}

async function getContracts(req, res) {
  const db = new Database();
  try { 
    await db.connect();

    const sqlQuery = `
    SELECT 
        Contracts.contract_id AS id,
        Contracts.contract_number AS number,
        Contracts.contract_date AS date,
        Contracts.contract_amount AS amount,
        counterparties.name AS CPname,
        CASE WHEN attachment_owners.contract_id IS NOT NULL THEN true ELSE false END AS hasFiles
    FROM Contracts
    INNER JOIN counterparties ON Contracts.counterparty_id = counterparties.id
    LEFT JOIN attachment_owners ON Contracts.contract_id = attachment_owners.contract_id;
    `
    const results = await db.query(sqlQuery);

    for (let result of results) {
      if (result && result.date) {
         result.date = dayjs(result.date).format('YYYY-MM-DD');
      }  
    }
    res.send(results);
    
  } catch (error) {
    console.error('Ошибка: ', error);
  } finally {
    await db.end();
  }
}

async function removeContract(contractId, res) {
  const db = new Database();
  try {
    // Проверяем наличие связанных записей в attachment_owners
    const sqlOwner = "SELECT * FROM attachment_owners WHERE `contract_id` = ?"
    const resultsOwner = await db.query(sqlOwner, [contractId]);

    if (resultsOwner.length > 0) {
        const resultOwner = resultsOwner[0]

        const owner_id = resultOwner.owner_id;
        const sqlAttach = "DELETE FROM attachment_files WHERE `owner_id` = ?";
        await db.query(sqlAttach, [owner_id])

        const sqlDeleteOwners = "DELETE FROM attachment_owners WHERE `contract_id` = ?"
        await db.query(sqlDeleteOwners, [contractId])
         
    }
    const sqlQuery = 'DELETE FROM Contracts WHERE `contract_id` = ? ';
    const results = await db.query(sqlQuery, [contractId]);
    res.send("Договор успешно удален.");

    } catch (error) {
        console.error(error);
        res.status(500).send("Ошибка при удалении договора: " + error.message);
    }
}


router.get('/summary', (req, res) => {
  getSummary(req, res)
});

router.get('/', (req, res) => {
  getContracts(req, res)
});
  
router.get('/:id', (req, res) => {
  const contractId = req.params.id;
  getContractById(contractId,res)  
});

router.delete('/remove/:id', (req, res) => {
  const contractId = req.params.id;
  removeContract(contractId,res)  
});

router.post('/', (req, res) => {
  res.send('Метод для создания нового договора');
});
  
  module.exports = router;