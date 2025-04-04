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
  description: number;

  @IsOptional()
  @IsNumber()
  probabilidad?: number;

  @IsOptional()
  @IsNumber()
  ocurrencia?: number;

  @IsOptional()
  @IsNumber()
  probabilidadDeOcurencia?: number;

  @IsOptional()
  @IsNumber()
  perdidaDeClientesPotencial?: number;

  @IsOptional()
  @IsNumber()
  dañoPotencial?: number;

  @IsOptional()
  @IsNumber()
  conflictosGremialesPosibles?: number;

  @IsOptional()
  @IsNumber()
  incumplimientoLegal?: number;

  @IsOptional()
  @IsNumber()
  perdidaDeImagen?: number;

  @IsOptional()
  @IsNumber()
  costoCorreccion?: number;

  @IsOptional()
  @IsNumber()
  consecuencia?: number;

  @IsOptional()
  @IsNumber()
  factorDeRiesgo?: number;
}
