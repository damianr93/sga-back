import { Controller, Get } from '@nestjs/common';
import { WastesDataService } from './wastes-data.service';

@Controller('wastes-data')
export class WastesDataController {
  constructor(private readonly wastesDataService: WastesDataService) {}


  @Get()
  findAll() {
    return this.wastesDataService.findAll();
  }

}
