import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RiskAndOpportunitiesService } from './risk-and-opportunities.service';
import { CreateRiskAndOpportunityDto } from './dto/create-risk-and-opportunity.dto';
import { UpdateRiskAndOpportunityDto } from './dto/update-risk-and-opportunity.dto';

@Controller('risk-and-opportunities')
export class RiskAndOpportunitiesController {
  constructor(private readonly riskAndOpportunitiesService: RiskAndOpportunitiesService) {}

  @Post()
  create(@Body() createRiskAndOpportunityDto: CreateRiskAndOpportunityDto) {
    return this.riskAndOpportunitiesService.create(createRiskAndOpportunityDto);
  }

  @Get()
  findAll() {
    return this.riskAndOpportunitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.riskAndOpportunitiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRiskAndOpportunityDto: UpdateRiskAndOpportunityDto) {
    return this.riskAndOpportunitiesService.update(id, updateRiskAndOpportunityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.riskAndOpportunitiesService.remove(id);
  }
}
