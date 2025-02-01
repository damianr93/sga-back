import { Controller, Get} from '@nestjs/common';
import { WaterDataService } from './water-data.service';


@Controller('water-data')
export class WaterDataController {
  constructor(private readonly waterDataService: WaterDataService) {}

  @Get()
  findAll() {
    return this.waterDataService.findAll();
  }

}
