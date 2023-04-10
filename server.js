const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const vehicleDataRoutes = require('./src/routes/vehicleDataRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));
app.set('io', io);
app.use(express.json());
app.use('/vehicle-data', vehicleDataRoutes);

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
