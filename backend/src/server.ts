import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/userRoutes';
import studentRoute from './routes/studentRoutes';
import dataRoute from './routes/dataRoutes';
import resultRoute from './routes/resultRoutes';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import cookieParser = require('cookie-parser');
import cors from 'cors';

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

const corsOptions = {
  origin: process.env.PUBLIC_DOMAIN,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRoute);
app.use('/api/students', studentRoute);
app.use('/api/data', dataRoute);
app.use('/api/results', resultRoute);
app.use(errorHandler);
app.use(notFound);
app.listen(port, () => console.log(`Server running on port ${port}`));
