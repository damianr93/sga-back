import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProcessDefinitionService } from './process-definition.service';
import { CreateProcessDefinitionDto } from './dto/create-process-definition.dto';
import { UpdateProcessDefinitionDto } from './dto/update-process-definition.dto';

@Controller('process-definition')
export class ProcessDefinitionController {
  constructor(private readonly processDefinitionService: ProcessDefinitionService) {}

  @Post()
  create(@Body() createProcessDefinitionDto: CreateProcessDefinitionDto) {
    return this.processDefinitionService.create(createProcessDefinitionDto);
  }

  @Get()
  findAll() {
    return this.processDefinitionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.processDefinitionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcessDefinitionDto: UpdateProcessDefinitionDto) {
    return this.processDefinitionService.update(+id, updateProcessDefinitionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.processDefinitionService.remove(+id);
  }
}
