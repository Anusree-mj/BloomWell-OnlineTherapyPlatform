import { Server } from 'socket.io';
import { userJoin, userLeft, users } from './utilitis/userSocket.js';

const allowedOrigins = ['http://localhost:3000', 'http://localhost:8000'];

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: function (origin, callback) {
                if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
            credentials: true,
        },
    });

    io.on('connection', (socket) => {
        socket.on('joinRoom', ({ userId, role }) => {
            userJoin(socket.id, userId);
            // io.emit('getUsers')
        });

        socket.on('send_Connection', (data) => {
            console.log('raeached socket.io js with data', data)
            const { therapistId, clientName } = data;
            const deliverTo = users.find((e) => e.userId === therapistId);
            if (deliverTo) {
                console.log('deliverto address', deliverTo);
                socket.to(deliverTo.socketId).emit('recieve_connectionMessage', clientName)
            } else {
                console.log('deliver to address not found')
            }
        });

        socket.on("disconnect", () => {
            userLeft(socket.id);
            // io.emit("getUsers", getUsers());
        });
    });
    return io;
};

export default initializeSocket;
