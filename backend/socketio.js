import { Server } from 'socket.io';
import { userJoin, userLeft, users, getUsers } from './utilitis/userSocket.js';

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
            io.emit("getUsers", getUsers());
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

        socket.on('send_chatMessage', (data) => {
            console.log('reached send chat socket.on with data', data)
            const { reciever: { recieverId }, sender: { senderId } } = data;

            const receiver = users.find((e) => e.userId === recieverId);
            const sender = users.find((e) => e.userId === senderId);
            if (receiver && sender) {
                console.log('found both sender and reciever', receiver, sender)
                socket.to(receiver.socketId).emit('recieve_chatMessage', data);
                socket.to(sender.socketId).emit('recieve_chatMessage', data)
            }
        })

        socket.on("disconnect", () => {
            userLeft(socket.id);
            io.emit("getUsers", getUsers());
        });
    });
    return io;
};

export default initializeSocket;
