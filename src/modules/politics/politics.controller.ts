import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PoliticsService } from './politics.service';
import { CreatePoliticDto } from './dto/create-politic.dto';
import { UpdatePoliticDto } from './dto/update-politic.dto';

@Controller('politics')
export class PoliticsController {
  constructor(private readonly politicsService: PoliticsService) {}

  @Post()
  create(@Body() createPoliticDto: CreatePoliticDto) {
    return this.politicsService.create(createPoliticDto);
  }

  @Get()
  findAll() {
    return this.politicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.politicsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePoliticDto: UpdatePoliticDto) {
    return this.politicsService.update(id, updatePoliticDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.politicsService.remove(id);
  }
}
