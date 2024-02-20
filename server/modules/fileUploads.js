const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const uploadPath = path.join(__dirname, '../uploads/files');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
const upload = multer({ storage });

router.post('/', upload.array('files'), (req, res) => {

  try {
    const files = req.files.map(file => file.filename);
    console.log('Received files:', files);
    res.json({ success: true, files });

  } catch (error) {
    console.error('Ошибка загрузки файла:', error);
    res.status(500).json({ error: 'Ошибка загрузки файла' });
  }
});

router.get('/:filename', (req, res) => {
 // const { filename } = req.params;
  const filename = "1706594009671.jpeg" //todo времянка
  const filePath = path.join(uploadPath, filename);

  try {
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ error: 'Файл не найден' });
    }
  } catch (error) {
    console.error('Ошибка при отправке файла:', error);
    res.status(500).json({ error: 'Ошибка при отправке файла' });
  }
});

module.exports = router;
