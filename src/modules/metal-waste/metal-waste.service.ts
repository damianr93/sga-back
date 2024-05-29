import { Injectable } from '@nestjs/common';
import { CreateMetalWasteDto } from './dto/create-metal-waste.dto';
import { UpdateMetalWasteDto } from './dto/update-metal-waste.dto';

@Injectable()
export class MetalWasteService {
  create(createMetalWasteDto: CreateMetalWasteDto) {
    return 'This action adds a new metalWaste';
  }

  findAll() {
    return `This action returns all metalWaste`;
  }

  findOne(id: number) {
    return `This action returns a #${id} metalWaste`;
  }

  update(id: number, updateMetalWasteDto: UpdateMetalWasteDto) {
    return `This action updates a #${id} metalWaste`;
  }

  remove(id: number) {
    return `This action removes a #${id} metalWaste`;
  }
}
