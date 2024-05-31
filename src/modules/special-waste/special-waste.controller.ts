import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecialWasteService } from './special-waste.service';
import { CreateSpecialWasteDto } from './dto/create-special-waste.dto';
import { UpdateSpecialWasteDto } from './dto/update-special-waste.dto';

@Controller('special-waste')
export class SpecialWasteController {
  constructor(private readonly specialWasteService: SpecialWasteService) {}

  @Post()
  create(@Body() createSpecialWasteDto: CreateSpecialWasteDto) {
    return this.specialWasteService.create(createSpecialWasteDto);
  }

  @Get()
  findAll() {
    return this.specialWasteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specialWasteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpecialWasteDto: UpdateSpecialWasteDto) {
    return this.specialWasteService.update(id, updateSpecialWasteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialWasteService.remove(id);
  }
}
