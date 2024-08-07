import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from './interface/middlewares/errorMiddleware.js';
import connectDb from './infrastructure/config/db.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { createServer } from 'http';
import initializeSocket from './socketio.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const allowedOrigins = ['http://localhost:3000', 'http://localhost:8000',`${process.env.API_URL}`, `${process.env.NEXT_APP_URL}`];
dotenv.config();
const port = process.env.PORT;

connectDb();

import userRoutes from './interface/routes/user/userRoutes.js';
import adminRoutes from './interface/routes/admin/adminActivitiesRoutes.js';
import clientRoutes from './interface/routes/clients/clientAuthRoutes.js'
import adminClientRoutes from './interface/routes/admin/manageClientRoutes.js'
import therapistRoutes from './interface/routes/therapists/therapistAuthRoute.js'
import adminTherapistRoutes from './interface/routes/admin/manageTherapists.js'
import therapistProfileRoutes from './interface/routes/therapists/therapistProfileRoutes.js'
import clientConnectionRoutes from './interface/routes/clients/clientAcctivitiesRoutes.js'
import clientPaymentRoutes from './interface/routes/clients/paymentRoutes.js'
import webhookRoutes from './interface/routes/clients/webhook.js'
import therapistActivitiesRoutes from './interface/routes/therapists/therapistActivitiesRoutes.js'

const app = express();
const server = createServer(app);
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
const io = initializeSocket(server)


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/users', userRoutes)
app.use('/admin', adminRoutes);
app.use('/client', clientRoutes, clientPaymentRoutes, clientConnectionRoutes);
app.use('/admin/clients', adminClientRoutes);
app.use('/therapist', therapistRoutes, therapistActivitiesRoutes, therapistProfileRoutes)
app.use('/admin/therapists', adminTherapistRoutes)


app.get('/', (req, res) => res.send('Serve is ready'))
app.use(notFound);
app.use(errorHandler);
server.listen(port, () => console.log(`Server started on port ${port}`));