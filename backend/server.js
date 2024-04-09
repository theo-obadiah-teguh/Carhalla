require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express'); 

const enterExitRouter = require('./routes/EnterExit');
const basicRouter = require('./routes/basic');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.use('/enterexit', enterExitRouter);
app.use('/basic', basicRouter);

app.listen(3500, function() {
    console.log('Listening on http://localhost:3500');
});