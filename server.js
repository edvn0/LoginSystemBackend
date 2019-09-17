import express from 'express';
const morgan = require('morgan');
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
// Middleware
const port = process.env.PORT || 4201;
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());

// Declare routes
import api from './routes/api';
app.use('/api', api);



// Listen app and start
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
