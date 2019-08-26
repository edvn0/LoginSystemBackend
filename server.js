import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

const port = process.env.PORT || 4201;
const app = express();
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());


// Declare routes
import api from './routes/api';
app.use('/api', api);

// Middleware


// Listen app and start
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
