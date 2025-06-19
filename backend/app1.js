const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/Fakenews', upload.single('image'), async (req, res) => {
  try {
    const imageFile = req.file;
    const email = req.body.Email;

    if (!imageFile || !email) {
      return res.status(400).json({ error: 'Image file and email are required' });
    }

    // Create a FormData object and append the image file and email
    const formData = new FormData();
    formData.append('image', fs.createReadStream(imageFile.path));
    formData.append('email', email);

    // Make a POST request to the Flask API
    const axiosConfig = {
      headers: {
        ...formData.getHeaders(),
      },
    };
    const response = await axios.post('http://127.0.0.1:5000/upload', formData, axiosConfig);

    // Clean up the uploaded file
    fs.unlinkSync(imageFile.path);

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3005, () => {
  console.log('Server is running on port 3000');
});
