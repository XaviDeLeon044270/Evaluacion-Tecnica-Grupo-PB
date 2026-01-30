import { Router } from 'express';
import { getEncuestaCompleta, saveRespuestas, exportarResultados } from '../controllers/encuesta.controller';

const router = Router();

router.get('/preguntas', getEncuestaCompleta);
router.post('/responder', saveRespuestas);
router.get('/exportar', exportarResultados);

export default router;