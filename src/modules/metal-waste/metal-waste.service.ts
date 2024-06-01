import { Inject, Injectable } from '@nestjs/common';
import { CreateMetalWasteDto } from './dto/create-metal-waste.dto';
import { UpdateMetalWasteDto } from './dto/update-metal-waste.dto';
import { MetalWaste } from './interface/metal-waste.interface';
import { Model } from 'mongoose';

@Injectable()
export class MetalWasteService {

  constructor(
    @Inject('METAL-WASTE-MODEL')
    private readonly metalWaste:Model<MetalWaste>
  ){}

  create(createMetalWasteDto: CreateMetalWasteDto) {
    return this.metalWaste.create(createMetalWasteDto);
  }

  findAll() {
    return this.metalWaste.find();
  }

  findOne(id: string) {
    return this.metalWaste.findById(id);
  }

  update(id: string, updateMetalWasteDto: UpdateMetalWasteDto) {
    return this.metalWaste.findByIdAndUpdate(id, updateMetalWasteDto);
  }

  remove(id: string) {
    return this.metalWaste.findByIdAndDelete(id);
  }
}
