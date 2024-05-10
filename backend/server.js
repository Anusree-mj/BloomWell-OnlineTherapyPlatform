import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from './interface/middlewares/errorMiddleware.js';
import connectDb from './infrastructure/config/db.js';
import { fileURLToPath } from 'url'; 
import path from 'path';

const __filename = fileURLToPath(import.meta.url); // Get the current file's path
const __dirname = path.dirname(__filename);
const allowedOrigins = ['http://localhost:3000','http://localhost:8000'];
dotenv.config();
const port = process.env.PORT ;

connectDb();

import userRoutes from './interface/routes/userRoutes.js';
import adminRoutes from './interface/routes/adminRoutes.js';

const app = express();
const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  };
  
  app.options('*', cors(corsOptions));
  app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes);


app.get('/', (req, res) => res.send('Server is ready'))
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));