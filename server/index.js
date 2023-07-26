const Buffer = require('buffer').Buffer;
global.Buffer = Buffer;

const path = require('path');
const { BlobServiceClient } = require('@azure/storage-blob');
const express = require('express');

// Middleware for handling multipart/form-data. Primarily used for uploading files.
const multer = require('multer'); 

// HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) 
//other than its own from which a browser should permit loading resources
const cors = require('cors'); 

// For POST, PATCH, or PUT HTTP request wherein the info needed is within the body.
//Using body - parser allows you to access req.
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());;
app.use(express.json());

const upload = multer();
const port = process.env.PORT || 5000;

const connectionString = 'YOUR_AZURE_CONNECTION_STRING';
const containerName = 'YOUR_AZURE_CONTAINER_NAME';
const accountKey = 'YOUR_AZURE_ACCOUNT_KEY';
const accountName = 'YOUR_AZURE_ACCOUNT_NAME';
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

const uploadFile = async (file, timeRange, place, description, name, address, contactNumber, email) => {
    console.log(file.name);
    const fileExt = path.extname(file.originalname);;
    const blobName = `Public_Evidence_${place}_${timeRange}${fileExt}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    if (!name || !address || !contactNumber || !email) {
        name = address = contactNumber = email = "NA";
    }
    const metadata = {
        timeRange,
        place,
        description,
        name,
        address,
        contactNumber,
        email
    };
    await blockBlobClient.upload(file.buffer, file.size, {
        metadata
    });
    const url = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;
    return url;
};

app.get('/', (req, res) => {
    console.log("Connected to Server");
});


app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { timeRange, place, description, name, address, contactNumber, email } = req.body;
        const file = req.file;
        console.log("File name", file.name);
        const url = await uploadFile(file, timeRange, place, description, name, address, contactNumber, email);
        res.json({ url });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

app.post("/search", async (req, res) => {
    const searchText = req.body.searchText;
    console.log("Search Text", searchText);

    try {
        const blobs = [];

        for await (const blob of containerClient.listBlobsFlat()) {
            const blobName = blob.name;
            const blobClient = containerClient.getBlockBlobClient(blobName);
            const blobUrl = blobClient.url;
            const blobProperties = await blobClient.getProperties();
            const metadata = blobProperties.metadata;

            if (blobName.includes(searchText)) {
                blobs.push({ name: blobName, url: blobUrl, metadata: metadata });
            } else {
                for (const [key, value] of Object.entries(metadata)) {
                    if (value.toLowerCase().includes(searchText.toLowerCase())) {
                        blobs.push({ name: blobName, url: blobUrl, metadata: metadata });
                        break;
                    }
                }
            }
        }
        res.send(blobs);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
