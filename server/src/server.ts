import express from 'express'
import http from 'http'
import { Socket, Server as SocketServer} from 'socket.io';
import cors from 'cors'
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import {DefaultEventsMap} from 'socket.io/dist/typed-events';

const FETCH_INTERVAL = 5000;
const PORT = 4000;

const tickers = [
  'AAPL', // Apple
  'GOOGL', // Alphabet
  'MSFT', // Microsoft
  'AMZN', // Amazon
  'FB', // Facebook
  'TSLA', // Tesla
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
}

function getQuotes(socket: {
  emit: (arg0: string, arg1: {
    ticker: string;
    exchange: string;
    price: string;
    change: string;
    change_percent: string;
    dividend: string;
    yield: string;
    last_trade_time: Date;
  }[]) => void;
}) {

  const quotes = tickers.map(ticker => ({
    ticker,
    exchange: 'NASDAQ',
    price: randomValue(100, 300, 2),
    change: randomValue(0, 200, 2),
    change_percent: randomValue(0, 1, 2),
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    last_trade_time: utcDate(),
  }));

  socket.emit('ticker', quotes);
}

function trackTickers(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
  // run the first time immediately
  getQuotes(socket);

  // every N seconds
  const timer = setInterval(function() {
    getQuotes(socket);
  }, FETCH_INTERVAL);

  socket.on('disconnect', function() {
    clearInterval(timer);
  });
}

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = new SocketServer(server, {
  cors: {
    origin: "*",
  }
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

let activeSessions: number = 0;

socketServer.on('connection', (socket) => {
  activeSessions += 1;
  socketServer.emit('sessionCountUpdate', activeSessions);

  socket.on('disconnect', () => {
    activeSessions -= 1;
    socketServer.emit('sessionCountUpdate', activeSessions);
  });

  socket.on('getSessionCount', () => {
    socketServer.to(socket.id).emit('sessionCountUpdate', activeSessions);
  });
});

socketServer.on('connection', (socket) => {
  socket.on('start', () => {
    trackTickers(socket);
  });
  console.log('you are connected with id:', socket.id)
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on port: ${PORT}`);
});
