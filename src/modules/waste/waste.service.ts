import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWasteDto } from './dto/create-waste.dto';
import { UpdateWasteDto } from './dto/update-waste.dto';
import { waste } from './interface/waste.interface';
import { Model } from 'mongoose';

@Injectable()
export class WasteService {

  constructor(
    @Inject('WASTE-MODEL')
    private readonly waste: Model<waste>
  ){}

  create(createWasteDto: CreateWasteDto) {
    return this.waste.create(createWasteDto);
  }

  async findAll() {
    const data = await this.waste.find()
    if(data.length === 0) return new NotFoundException({message:'No hay datos'})
    let lastRegister = data.pop()

    const dataToExport = {
      id: lastRegister.id,
      medidoPor: lastRegister.medidoPor,
      consumo: lastRegister.consumo,
      createdAt: lastRegister.createdAt,
      history: data
    };

    return dataToExport;
  }

  findOne(id: string) {
    return this.waste.findById(id);
  }

  update(id: string, updateWasteDto: UpdateWasteDto) {
    return this.waste.findByIdAndUpdate(id, updateWasteDto);
  }

  remove(id: string) {
    return this.waste.findByIdAndDelete(id);
  }
}
