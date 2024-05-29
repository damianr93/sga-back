import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MetalWasteService } from './metal-waste.service';
import { CreateMetalWasteDto } from './dto/create-metal-waste.dto';
import { UpdateMetalWasteDto } from './dto/update-metal-waste.dto';

@Controller('metal-waste')
export class MetalWasteController {
  constructor(private readonly metalWasteService: MetalWasteService) {}

  @Post()
  create(@Body() createMetalWasteDto: CreateMetalWasteDto) {
    return this.metalWasteService.create(createMetalWasteDto);
  }

  @Get()
  findAll() {
    return this.metalWasteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.metalWasteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMetalWasteDto: UpdateMetalWasteDto) {
    return this.metalWasteService.update(+id, updateMetalWasteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.metalWasteService.remove(+id);
  }
}
