import { Document, Types } from 'mongoose';

export interface RiesgoOportunidad extends Document {
  contexto: Types.ObjectId;
  partesInteresadas: Types.ObjectId;
  process: Types.ObjectId;
  type: 'riesgo' | 'oportunidad';
  description: string;
  probabilidad?: number;
  ocurrencia?: number;
  probabilidadDeOcurencia?: number;
  perdidaDeClientesPotencial?: number;
  dañoPotencial?: number;
  conflictosGremialesPosibles?: number;
  incumplimientoLegal?: number;
  perdidaDeImagen?: number;
  costoCorreccion?: number;
  consecuencia?: number;
  factorDeRiesgo?: number;
}