import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import taskRoutes from '../src/routes/taskRoute';
import { handleTaskTimeouts } from '../src/utils/timeOutHandller';

dotenv.config(); // Load environment variables

const app = express();
app.use(cors({
  origin: "*",  // Change this if necessary
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api', taskRoutes);

// Start Timeout Handler
handleTaskTimeouts();

// Use MONGO_URI from .env
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in .env');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} & connected to DB`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
