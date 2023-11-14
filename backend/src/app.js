import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import routerUsuario from './routes/usuario.js';
import configuration from './config/config.js';
config();

const app = express();
app.use(cors());
app.use(express.json());
app.set('port', 5010);
app.set('host', "127.0.0.1");

app.get('/ping', (req, res) => {
    res.send(configuration)
});


app.get('/usuario', (req, res) => res.json({ message: 'message' }));
app.post('/usuario', (req, res) => {
    res.send(req.body)
});

app.get('/', (req, res) => {
    res.send('holi')
});


app.use('/usuario', routerUsuario)

// http://127.0.0.1:5010/usuario/nombres

export default app;