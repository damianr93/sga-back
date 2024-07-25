import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContextAnalysisService } from './context-analysis.service';
import { CreateContextAnalysisDto } from './dto/create-context-analysis.dto';
import { UpdateContextAnalysisDto } from './dto/update-context-analysis.dto';

@Controller('context-analysis')
export class ContextAnalysisController {
  constructor(private readonly contextAnalysisService: ContextAnalysisService) {}

  @Post()
  create(@Body() createContextAnalysisDto: CreateContextAnalysisDto) {
    return this.contextAnalysisService.create(createContextAnalysisDto);
  }

  @Get()
  findAll() {
    return this.contextAnalysisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contextAnalysisService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContextAnalysisDto: UpdateContextAnalysisDto) {
    return this.contextAnalysisService.update(id, updateContextAnalysisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contextAnalysisService.remove(id);
  }
}
