import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/userRoutes';
import { notFound, errorHandler } from './middleware/errorMiddleware';
dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRoute);
app.use(errorHandler);
app.use(notFound);
app.listen(port, () => console.log(`Server running on port ${port}`));
