import { Injectable } from '@nestjs/common';
import { CreateWashWaterDto } from './dto/create-wash-water.dto';
import { UpdateWashWaterDto } from './dto/update-wash-water.dto';

@Injectable()
export class WashWaterService {
  create(createWashWaterDto: CreateWashWaterDto) {
    return 'This action adds a new washWater';
  }

  findAll() {
    return `This action returns all washWater`;
  }

  findOne(id: number) {
    return `This action returns a #${id} washWater`;
  }

  update(id: number, updateWashWaterDto: UpdateWashWaterDto) {
    return `This action updates a #${id} washWater`;
  }

  remove(id: number) {
    return `This action removes a #${id} washWater`;
  }
}
