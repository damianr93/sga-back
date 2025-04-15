import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class TaskStepsDto {
  @IsNumber()
  @IsNotEmpty()
  stepNumber: number;

  @IsString()
  @IsNotEmpty()
  task: string;

  @IsBoolean()
  @IsOptional()
  completed: boolean = false;
}

export class TasksDto {
  @IsString()
  @IsNotEmpty()
  tasksDescription: string;

  @IsString()
  @IsNotEmpty()
  responsible: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TaskStepsDto)
  taskSteps: TaskStepsDto[];
}

export class CreateRiskOpportunityActionDto {
  @IsMongoId()
  @IsNotEmpty()
  riskOrOpportunity: string;

  @IsEnum(['enviromental-aspects', 'riskAndOpportunities'], { 
    message: 'riskOrOpportunityModel must be either "enviromental-aspects" or "riskAndOpportunities"' 
  })
  @IsNotEmpty()
  riskOrOpportunityModel: 'enviromental-aspects' | 'riskAndOpportunities';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TasksDto)
  Actions: TasksDto[];

  @IsString()
  @IsOptional()
  createdAt?: string;
}