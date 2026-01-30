import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getEncuestaCompleta = async (_req: Request, res: Response) => {
  try {
    const encuesta = await prisma.preguntas.findMany({
      include: {
        opciones: true
      }
    });
    return res.json(encuesta); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al cargar la encuesta' });
  }
};

export const saveRespuestas = async (req: Request, res: Response) => {
  const { id_sede, respuestas } = req.body; 

  try {
    const operacion = await prisma.respuestas_usuario.createMany({
      data: respuestas.map((r: any) => ({
        id_sede: Number(id_sede),
        id_pregunta: Number(r.id_pregunta),
        id_opcion: Number(r.id_opcion)
      }))
    });

    res.status(201).json({
      message: 'Encuesta guardada con éxito',
      count: operacion.count
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar las respuestas' });
  }
};

export const exportarResultados = async (_req: Request, res: Response) => {
  try {
    const datos = await prisma.respuestas_usuario.findMany({
      include: {
        sedes: {
          include: {
            empresas: {
              include: { paises: true }
            }
          }
        },
        preguntas: true,
        opciones: true
      },
      orderBy: { id: 'desc' }
    });

    const reportePlano = datos.map((item: any) => ({
      ID: item.id,
      Fecha: item.fecha_respuesta ? new Date(item.fecha_respuesta).toLocaleDateString() : new Date().toLocaleDateString(),
      Pais: item.sedes?.empresas?.paises?.nombre ?? 'Sin Asignar',
      Empresa: item.sedes?.empresas?.nombre ?? 'Sin Asignar',
      Sede: item.sedes?.nombre ?? 'Sin Asignar',
      Pregunta: item.preguntas?.texto_pregunta ?? 'Pregunta Borrada',
      Respuesta: item.opciones?.texto_opcion ?? 'Respuesta Borrada'
    }));

    return res.json(reportePlano);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error generando reporte' });
  }
};