import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecialLiquidsService } from './special-liquids.service';
import { CreateSpecialLiquidDto } from './dto/create-special-liquid.dto';
import { UpdateSpecialLiquidDto } from './dto/update-special-liquid.dto';

@Controller('special-liquids')
export class SpecialLiquidsController {
  constructor(private readonly specialLiquidsService: SpecialLiquidsService) {}

  @Post()
  create(@Body() createSpecialLiquidDto: CreateSpecialLiquidDto) {
    return this.specialLiquidsService.create(createSpecialLiquidDto);
  }

  @Get()
  findAll() {
    return this.specialLiquidsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specialLiquidsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpecialLiquidDto: UpdateSpecialLiquidDto) {
    return this.specialLiquidsService.update(id, updateSpecialLiquidDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialLiquidsService.remove(id);
  }
}
