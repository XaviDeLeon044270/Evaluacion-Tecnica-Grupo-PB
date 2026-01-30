import express from 'express';
import cors from 'cors';
import catalogosRoutes from './routes/catalogos.routes';
import encuestaRoutes from './routes/encuesta.routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/catalogos', catalogosRoutes);
app.use('/api/encuesta', encuestaRoutes); 

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});