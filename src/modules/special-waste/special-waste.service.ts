import { Inject, Injectable } from '@nestjs/common';
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

  findAll() {
    return this.specialWaste.find();
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
