const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Hacer pública la carpeta uploads
app.use('/uploads', express.static('uploads'));

// Ruta para subir imágenes
app.post('/upload', upload.single('image'), (req, res) => {

  const imageUrl = `http://localhost:3001/uploads/${req.file.filename}`;

  res.json({
    success: true,
    url: imageUrl
  });

});

app.listen(3001, () => {
  console.log('Servidor ejecutándose en http://localhost:3001');
});