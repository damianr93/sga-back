import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RiskOpportunityActionsService } from './risk-opportunity-actions.service';
import { CreateRiskOpportunityActionDto } from './dto/create-risk-opportunity-action.dto';
import { UpdateRiskOpportunityActionDto } from './dto/update-risk-opportunity-action.dto';

@Controller('risk-opportunity-actions')
export class RiskOpportunityActionsController {
  constructor(private readonly riskOpportunityActionsService: RiskOpportunityActionsService) {}

  @Post()
  create(@Body() createRiskOpportunityActionDto: CreateRiskOpportunityActionDto) {
    return this.riskOpportunityActionsService.create(createRiskOpportunityActionDto);
  }

  @Get()
  findAll() {
    return this.riskOpportunityActionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.riskOpportunityActionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRiskOpportunityActionDto: UpdateRiskOpportunityActionDto) {
    return this.riskOpportunityActionsService.update(id, updateRiskOpportunityActionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.riskOpportunityActionsService.remove(id);
  }
}
