// Import required dependencies
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Constants
const PDL_API_KEY = process.env.PDL_API_KEY || 'your_api_key_here';
const PDL_BASE_URL = 'https://api.peopledatalabs.com/v5/person/search';

// Main search endpoint
app.post('/api/search', async (req, res) => {
    try {
        const searchParams = req.body;
        
        // Make request to PDL API
        const response = await axios.post(PDL_BASE_URL, searchParams, {
            headers: {
                'X-API-Key': PDL_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        
        res.json(response.data);
    } catch (error) {
        // Handle PDL API errors
        if (error.response) {
            return res.status(error.response.status).json({
                error: error.response.data
            });
        }
        
        // Handle other errors
        res.status(500).json({
            error: {
                message: 'An internal server error occurred',
                details: error.message
            }
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});