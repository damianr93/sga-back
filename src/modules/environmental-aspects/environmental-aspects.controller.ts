import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnvironmentalAspectsService } from './environmental-aspects.service';
import { CreateEnvironmentalAspectDto } from './dto/create-environmental-aspect.dto';
import { UpdateEnvironmentalAspectDto } from './dto/update-environmental-aspect.dto';

@Controller('environmental-aspects')
export class EnvironmentalAspectsController {
  constructor(private readonly environmentalAspectsService: EnvironmentalAspectsService) {}

  @Post()
  create(@Body() createEnvironmentalAspectDto: CreateEnvironmentalAspectDto) {
    return this.environmentalAspectsService.create(createEnvironmentalAspectDto);
  }

  @Get()
  findAll() {
    return this.environmentalAspectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.environmentalAspectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnvironmentalAspectDto: UpdateEnvironmentalAspectDto) {
    return this.environmentalAspectsService.update(+id, updateEnvironmentalAspectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.environmentalAspectsService.remove(+id);
  }
}
