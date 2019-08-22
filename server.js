import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const port = 4201;
const app = express();

// Declare routes
import login from './routes/login';
app.use('/api', login);

// Middleware
app.use(morgan('combined'));
app.use(cors());

// Listen app and start
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
