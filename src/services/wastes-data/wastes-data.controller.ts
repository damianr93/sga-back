import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WastesDataService } from './wastes-data.service';
import { CreateWastesDatumDto } from './dto/create-wastes-datum.dto';
import { UpdateWastesDatumDto } from './dto/update-wastes-datum.dto';

@Controller('wastes-data')
export class WastesDataController {
  constructor(private readonly wastesDataService: WastesDataService) {}


  @Get()
  findAll() {
    return this.wastesDataService.findAll();
  }

}
