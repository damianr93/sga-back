import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompressedCardboardService } from './compressed-cardboard.service';
import { CreateCompressedCardboardDto } from './dto/create-compressed-cardboard.dto';
import { UpdateCompressedCardboardDto } from './dto/update-compressed-cardboard.dto';

@Controller('compressed-cardboard')
export class CompressedCardboardController {
  constructor(private readonly compressedCardboardService: CompressedCardboardService) {}

  @Post()
  create(@Body() createCompressedCardboardDto: CreateCompressedCardboardDto) {
    return this.compressedCardboardService.create(createCompressedCardboardDto);
  }

  @Get()
  findAll() {
    return this.compressedCardboardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.compressedCardboardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompressedCardboardDto: UpdateCompressedCardboardDto) {
    return this.compressedCardboardService.update(+id, updateCompressedCardboardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.compressedCardboardService.remove(+id);
  }
}
