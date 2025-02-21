const express = require('express');
const dotenv = require('dotenv');
const twilio = require('twilio');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.post('/send-sms', async (req, res) => {
    const { to, message } = req.body;

    try {
        const result = await twilioClient.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: to
        });
        res.status(200).json({ success: true, message: 'SMS sent successfully!', result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});