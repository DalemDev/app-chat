import express from 'express'
import morgan from 'morgan'
import { Server as socketServer } from 'socket.io'
import http from 'http'
import cors from 'cors'
import { PORT } from './config.js'

const app = express()
const server = http.createServer(app)
const io = new socketServer(server, {
  cors: {
    origin: true
  }
})

app.use(cors())
app.use(morgan('dev'))

io.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('mensaje', mensaje => {
    socket.broadcast.emit('mensaje', {
      body: mensaje,
      from: socket.id
    })
  })
})

server.listen(PORT, () => {
  console.log(`Servidor en el puerto ${PORT}`);
})