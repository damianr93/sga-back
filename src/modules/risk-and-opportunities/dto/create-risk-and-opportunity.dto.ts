import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateRiskAndOpportunityDto {
  @IsNotEmpty()
  @IsMongoId()
  contexto: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  partesInteresadas: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  process: Types.ObjectId;

  @IsNotEmpty()
  @IsEnum(['riesgo', 'oportunidad'], { message: 'Type debe ser "riesgo" o "oportunidad"' })
  type: 'riesgo' | 'oportunidad';

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  probabilidad?: string;

  @IsOptional()
  @IsString()
  ocurrencia?: string;

  @IsOptional()
  @IsNumber()
  probabilidadDeOcurencia?: number;

  @IsOptional()
  @IsString()
  perdidaDeClientesPotencial?: string;

  @IsOptional()
  @IsString()
  dañoPotencial?: string;

  @IsOptional()
  @IsString()
  conflictosGremialesPosibles?: string;

  @IsOptional()
  @IsString()
  incumplimientoLegal?: string;

  @IsOptional()
  @IsString()
  perdidaDeImagen?: string;

  @IsOptional()
  @IsString()
  costoCorreccion?: string;

  @IsOptional()
  @IsNumber()
  consecuencia?: number;

  @IsOptional()
  @IsNumber()
  factorDeRiesgo?: number;
}
