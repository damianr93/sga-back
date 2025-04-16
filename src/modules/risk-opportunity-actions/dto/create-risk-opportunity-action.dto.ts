import { IsString, IsEnum, IsNotEmpty, ValidateNested, IsArray, IsNumber, IsBoolean, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class TaskStepDto {
  @IsNumber()
  @IsNotEmpty()
  stepNumber: number;

  @IsString()
  @IsNotEmpty()
  task: string;

  @IsBoolean()
  completed: boolean;
}

export class TaskDto {
  @IsString()
  @IsNotEmpty()
  objetivo: string;

  @IsString()
  @IsNotEmpty()
  responsible: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => TaskStepDto)
  taskSteps: TaskStepDto[];
}

export class CreateRiskOpportunityActionDto {
  @IsString()
  @IsNotEmpty()
  riskOrOpportunity: string;

  @IsEnum(['enviromental-aspects', 'riskAndOpportunities'])
  @IsNotEmpty()
  riskOrOpportunityModel: 'enviromental-aspects' | 'riskAndOpportunities';

  @ValidateNested()
  @Type(() => TaskDto)
  action: TaskDto;

  @IsString()
  createdAt: string;
}