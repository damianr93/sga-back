import { Inject, Injectable } from '@nestjs/common';
import { CreateWaterDto } from './dto/create-water.dto';
import { UpdateWaterDto } from './dto/update-water.dto';
import { Model } from 'mongoose';
import { Water } from './interface/water.interface';

@Injectable()
export class WaterService {

  constructor(
    @Inject('WATER_MODEL')
    private readonly waterModel: Model<Water>,
  ) {}

  create(createWaterDto: CreateWaterDto) {
    return this.waterModel.create(createWaterDto);
  }

  findAll() {
    return this.waterModel.find();
  }

  findOne(id: string) {
    return this.waterModel.findById(id);
  }

  update(id: string, updateWaterDto: UpdateWaterDto) {
    return this.waterModel.findByIdAndUpdate(id, updateWaterDto);
  }

  remove(id: string) {
    return this.waterModel.findByIdAndDelete(id);
  }
}
