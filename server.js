const express = require('express');
const multer = require('multer');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

// Initialize Express
const app = express();
const port = 3000;

// Set up file storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Save files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Add timestamp to filename
  }
});

const upload = multer({ storage: storage });

// Endpoint to upload image and get detection result
app.post('/detect-image', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded.' });
  }

  try {
    const imagePath = path.join(__dirname, 'uploads', req.file.filename);
    const apiKey = 'AIzaSyDFKBSEfUzRGhy3JdJYawIjjzWl2jK9O88';  // Your Google API key
    const apiEndpoint = 'https://vision.googleapis.com/v1/images:annotate';  // Google Vision API endpoint

    // Read the image file and convert it to base64
    const imageBuffer = fs.readFileSync(imagePath);
    const imageBase64 = imageBuffer.toString('base64');

    // Create the request payload for Vision API
    const requestBody = {
      requests: [
        {
          image: {
            content: imageBase64
          },
          features: [
            {
              type: 'LABEL_DETECTION', // Specify detection type (you can change it)
              maxResults: 10
            }
          ]
        }
      ]
    };

    // Send the image to the Google Vision API for analysis
    const response = await axios.post(`${apiEndpoint}?key=${apiKey}`, requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Delete the uploaded file after processing
    fs.unlinkSync(imagePath);

    // Return the API response to the client
    res.json(response.data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while processing the image.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
