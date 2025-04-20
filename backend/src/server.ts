import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/userRoutes';
dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRoute);
app.listen(port, () => console.log(`Server running on port ${port}`));
