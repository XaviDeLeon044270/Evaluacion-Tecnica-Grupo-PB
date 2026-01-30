import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPaises = async (_req: Request, res: Response) => {
  try {
    const paises = await prisma.paises.findMany();
    res.json(paises);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener países' });
  }
};

export const getEmpresasPorPais = async (req: Request, res: Response) => {
  const { paisId } = req.params;
  try {
    const empresas = await prisma.empresas.findMany({
      where: { id_pais: Number(paisId) }
    });
    res.json(empresas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener empresas' });
  }
};

export const getSedesPorEmpresa = async (req: Request, res: Response) => {
  const { empresaId } = req.params;
  try {
    const sedes = await prisma.sedes.findMany({
      where: { id_empresa: Number(empresaId) }
    });
    res.json(sedes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener sedes' });
  }
};