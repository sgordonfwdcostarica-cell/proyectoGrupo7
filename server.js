const express = require('express');
const path = require('path');
const jsonServer = require('json-server');

const app = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Montar el router de json-server
app.use(router);

// Rutas para las páginas HTML (opcional si static ya las sirve, pero útil para "/" )
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages/index.html'));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});