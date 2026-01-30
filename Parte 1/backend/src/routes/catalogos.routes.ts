import { Router } from 'express';
import { getPaises, getEmpresasPorPais, getSedesPorEmpresa } from '../controllers/catalogos.controller';

const router = Router();

router.get('/paises', getPaises);
router.get('/empresas/:paisId', getEmpresasPorPais);
router.get('/sedes/:empresaId', getSedesPorEmpresa);

export default router;