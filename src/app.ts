import express from 'express';
import constellationRoutes from './routes/universeRoutes';

const app = express();
const port = 3000; // Puedes cambiar el puerto según tus necesidades

app.use(express.json());

app.use('/', constellationRoutes);

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
