import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WashWaterService } from './wash-water.service';
import { CreateWashWaterDto } from './dto/create-wash-water.dto';
import { UpdateWashWaterDto } from './dto/update-wash-water.dto';

@Controller('wash-water')
export class WashWaterController {
  constructor(private readonly washWaterService: WashWaterService) {}

  @Post()
  create(@Body() createWashWaterDto: CreateWashWaterDto) {
    return this.washWaterService.create(createWashWaterDto);
  }

  @Get()
  findAll() {
    return this.washWaterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.washWaterService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWashWaterDto: UpdateWashWaterDto) {
    return this.washWaterService.update(id, updateWashWaterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.washWaterService.remove(id);
  }
}
