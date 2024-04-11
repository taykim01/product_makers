const functions = require('firebase-functions');
const vision = require('@google-cloud/vision');

exports.detectText = functions.https.onRequest(async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    try {
        const client = new vision.ImageAnnotatorClient();
        const [result] = await client.textDetection({ image: { content: req.body.image } });
        const detections = result.textAnnotations;
        const text = detections?.[0]?.description ?? '';

        res.status(200).json({ text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error processing image' });
    }
});
