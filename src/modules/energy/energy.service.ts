import { Inject, Injectable } from '@nestjs/common';
import { CreateEnergyDto } from './dto/create-energy.dto';
import { UpdateEnergyDto } from './dto/update-energy.dto';
import { Model } from 'mongoose';
import { Energy } from './interface/enerfy.interface';

@Injectable()
export class EnergyService {

  constructor(
    @Inject('ENERGY-MODEL')
    private readonly energy: Model<Energy>
  ){}

  create(createEnergyDto: CreateEnergyDto) {
    return this.energy.create(createEnergyDto);
  }

  findAll() {
    return this.energy.find();
  }

  findOne(id: string) {
    return this.energy.findById(id);
  }

  update(id: string, updateEnergyDto: UpdateEnergyDto) {
    return this.energy.findByIdAndUpdate(id, updateEnergyDto);
  }

  remove(id: string) {
    return this.energy.findByIdAndDelete(id);
  }
}
