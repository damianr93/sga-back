import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CriteriosService } from './criterios.service';
import { CreateCriterioDto } from './dto/create-criterio.dto';
import { UpdateCriterioDto } from './dto/update-criterio.dto';

@Controller('criterios')
export class CriteriosController {
  constructor(private readonly criteriosService: CriteriosService) {}

  @Post()
  create(@Body() createCriterioDto: CreateCriterioDto) {
    return this.criteriosService.create(createCriterioDto);
  }

  @Get()
  findAll() {
    return this.criteriosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.criteriosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCriterioDto: UpdateCriterioDto) {
    return this.criteriosService.update(id, updateCriterioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.criteriosService.remove(id);
  }
}
