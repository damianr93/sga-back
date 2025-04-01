import { Document, Types } from 'mongoose';

export interface RiesgoOportunidad extends Document {
  contexto: Types.ObjectId;
  partesInteresadas: Types.ObjectId;
  process: Types.ObjectId;
  type: 'riesgo' | 'oportunidad';
  description: string;
  probabilidad?: string;
  ocurrencia?: string;
  probabilidadDeOcurencia?: number;
  perdidaDeClientesPotencial?: string;
  dañoPotencial?: string;
  conflictosGremialesPosibles?: string;
  incumplimientoLegal?: string;
  perdidaDeImagen?: string;
  costoCorreccion?: string;
  consecuencia?: number;
  factorDeRiesgo?: number;
}