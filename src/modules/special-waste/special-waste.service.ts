import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpecialWasteDto } from './dto/create-special-waste.dto';
import { UpdateSpecialWasteDto } from './dto/update-special-waste.dto';
import { Model } from 'mongoose';
import { SpecialWaste } from './interface/special-waste.interface';

@Injectable()
export class SpecialWasteService {

  constructor(
    @Inject('SPECIAL-WASTE-MODEL')
    private readonly specialWaste: Model<SpecialWaste>
  ){}

  create(createSpecialWasteDto: CreateSpecialWasteDto) {
    return this.specialWaste.create(createSpecialWasteDto);
  }

  async findAll() {
  
    const data = await this.specialWaste.find()
    if(data.length === 0) return new NotFoundException({message:'No hay datos'})
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
    return this.specialWaste.findById(id);
  }

  update(id: string, updateSpecialWasteDto: UpdateSpecialWasteDto) {
    return this.specialWaste.findByIdAndUpdate(id, updateSpecialWasteDto);
  }

  remove(id: string) {
    return this.specialWaste.findByIdAndDelete(id);
  }
}
