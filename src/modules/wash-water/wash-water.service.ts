import { Inject, Injectable } from '@nestjs/common';
import { CreateWashWaterDto } from './dto/create-wash-water.dto';
import { UpdateWashWaterDto } from './dto/update-wash-water.dto';
import { Model } from 'mongoose';
import { WashWater } from './interface/wash-water.interface';

@Injectable()
export class WashWaterService {

  constructor(
    @Inject('WASH_WATER_MODEL')
    private readonly washWater: Model<WashWater>
  ){}

  create(createWashWaterDto: CreateWashWaterDto) {
    return this.washWater.create(createWashWaterDto);
  }

  findAll() {
    return this.washWater.find();
  }

  findOne(id: string) {
    return this.washWater.findById(id);
  }

  update(id: string, updateWashWaterDto: UpdateWashWaterDto) {
    return this.washWater.findByIdAndUpdate(id, updateWashWaterDto);
  }

  remove(id: string) {
    return this.washWater.findByIdAndDelete(id);
  }
}
