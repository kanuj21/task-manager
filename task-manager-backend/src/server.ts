import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoute';
import { handleTaskTimeouts } from './utils/timeOutHandller';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/', taskRoutes);

// Start Timeout Handler
handleTaskTimeouts();

mongoose
  .connect("mongodb+srv://vatsambuj2:EU1ad76409lw7FXv@cluster0.0a5iq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running & connected to DB`)
    );
  })
  .catch((err) => console.error(err));
