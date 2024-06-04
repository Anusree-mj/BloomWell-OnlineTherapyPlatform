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
const allowedOrigins = ['http://localhost:3000', 'http://localhost:8000'];
dotenv.config();
const port = process.env.PORT;

connectDb();

import userRoutes from './interface/routes/userLogin/userRoutes.js';
import adminRoutes from './interface/routes/admin/adminLogin.js';
import clientRoutes from './interface/routes/clients/clientAuth/clientAuthRoutes.js'
import adminClientRoutes from './interface/routes/admin/clients/manageClientRoutes.js'
import therapistRoutes from './interface/routes/therapists/therapistsAuth/therapistAuthRoute.js'
import adminTherapistRoutes from './interface/routes/admin/therapists/manageTherapists.js'
import therapistProfileRoutes from './interface/routes/therapists/profile/therapistProfileRoutes.js'
import clientConnectionRoutes from './interface/routes/clients/clientAccessibilities/clientAccessRoutes.js'
import clientPaymentRoutes from './interface/routes/clients/payments/paymentRoutes.js'
import webhookRoutes from './interface/routes/clients/payments/webhook.js'
import therapistAccessRoutes from './interface/routes/therapists/therapistAccessibilities/therapistAccessRoutes.js'

const app = express();
app.use('/webhook', webhookRoutes);
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

app.use('/users', userRoutes)
app.use('/admin', adminRoutes);
app.use('/client', clientRoutes, clientConnectionRoutes, clientPaymentRoutes);
app.use('/admin/clients', adminClientRoutes);
app.use('/therapist', therapistRoutes, therapistAccessRoutes, therapistProfileRoutes)
app.use('/admin/therapists', adminTherapistRoutes)


app.get('/', (req, res) => res.send('Server is ready'))
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));