const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const assignmentRoutes = require('./routes/Assigment');
const mongoose = require('mongoose');
const Users = require('./routes/Users');
const notificationRoutes = require('./routes/Notification');
const staff = require('./routes/Staff');
const marksheet = require('./routes/Marksheet');
const markingrubric = require('./routes/Markingrubrics');
const submissions = require('./routes/Submission');



const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// MongoDB Connection

const mongoURL = 'mongodb+srv://sliit:sliit@cluster0.i250eoq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Routes
app.use('/assigment', assignmentRoutes);
app.use('/users', Users);
app.use('/notification',notificationRoutes);
app.use('/staff',staff);
app.use('/marksheet',marksheet);
app.use('/markingrubric',markingrubric);
app.use('/submissions',submissions);

// File Upload Middleware
app.use(fileUpload());

// File Upload Route
app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'No File Uploaded' });
    }

    const file = req.files.file;

    // Adjust the path to point to the uploads directory in the client folder
    const uploadPath = path.join(__dirname, '../client/public/uploads');

    file.mv(`${uploadPath}/${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });
});

// CORS Configuration
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
