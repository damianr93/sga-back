import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMetalWasteDto } from './dto/create-metal-waste.dto';
import { UpdateMetalWasteDto } from './dto/update-metal-waste.dto';
import { MetalWaste } from './interface/metal-waste.interface';
import { Model } from 'mongoose';

@Injectable()
export class MetalWasteService {

  constructor(
    @Inject('METAL-WASTE-MODEL')
    private readonly metalWaste: Model<MetalWaste>
  ) { }

  create(createMetalWasteDto: CreateMetalWasteDto) {
    return this.metalWaste.create(createMetalWasteDto);
  }

  async findAll() {
    const data = await this.metalWaste.find()
    if (data.length === 0) return new NotFoundException({ message: 'No hay datos' })
    let lastRegister = data.pop()

    const dataToExport = {
      id: lastRegister.id,
      createdBy: lastRegister.createdBy,
      measurement: lastRegister.measurement,
      createdAt: lastRegister.createdAt,
      history: data
    };

    return dataToExport;
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
