const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const vision = require('@google-cloud/vision');
const { Storage } = require('@google-cloud/storage');
const { v4: uuidv4 } = require('uuid');

const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);

const storage = new Storage({
    credentials: serviceAccount
});
const bucketName = 'kairos-3326d-pdf-tmp';

const client = new vision.ImageAnnotatorClient({
    credentials: serviceAccount
});

exports.detectText = functions.region('asia-northeast3').https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        if (req.method !== 'POST') {
            return res.status(405).send('Method Not Allowed');
        }

        try {
            const fileType = req.body.fileType;
            const uniqueId = uuidv4();

            if (fileType === 'image') {
                const [result] = await client.textDetection({ image: { content: req.body.image } });
                const detections = result.textAnnotations;
                const text = detections?.[0]?.description ?? '';
                res.status(200).json({ text });
            } else if (fileType === 'pdf') {
                const base64EncodedPdf = req.body.pdf;
                const pdfBuffer = Buffer.from(base64EncodedPdf, 'base64');
                const fileName = `uploads/${uniqueId}.pdf`;
                const file = storage.bucket(bucketName).file(fileName);
                await file.save(pdfBuffer);

                const [operation] = await client.asyncBatchAnnotateFiles({
                    requests: [{
                        inputConfig: {
                            gcsSource: {
                                uri: `gs://${bucketName}/${fileName}`
                            },
                            mimeType: 'application/pdf'
                        },
                        features: [{type: 'DOCUMENT_TEXT_DETECTION'}],
                        outputConfig: {
                            gcsDestination: {
                                uri: `gs://${bucketName}/results/${uniqueId}/`
                            },
                            batchSize: 1,
                        },
                    }],
                });

                const [filesResponse] = await operation.promise();
                const files = filesResponse.responses[0].outputConfig.gcsDestination.uri.replace('gs://', '').split('/');
                const folderPath = files.slice(1).join('/');
                
                const [filesList] = await storage.bucket(files[0]).getFiles({ prefix: folderPath });
                let combinedText = '';

                for (const file of filesList) {
                    const [downloadedFile] = await file.download();
                    const resultJson = JSON.parse(downloadedFile.toString('utf8'));
                    combinedText += resultJson.responses[0].fullTextAnnotation.text + '\n';
                    await file.delete(); 
                    console.log(`File ${file.name} deleted`);
                }

                await file.delete(); 
                res.status(200).json({ text: combinedText });
            } else {
                res.status(400).json({ error: 'Unsupported file type' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error processing request' });
        }
    });
});
