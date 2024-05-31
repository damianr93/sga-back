import { Inject, Injectable } from '@nestjs/common';
import { CreateSpecialLiquidDto } from './dto/create-special-liquid.dto';
import { UpdateSpecialLiquidDto } from './dto/update-special-liquid.dto';
import { Model } from 'mongoose';
import { SpecialLiquids } from './interface/special-liquids.interface';

@Injectable()
export class SpecialLiquidsService {

  constructor(
    @Inject("SPECIAL-LIQUIDS-MODEL")
    private readonly specialLiquids: Model<SpecialLiquids>
  ){}

  create(createSpecialLiquidDto: CreateSpecialLiquidDto) {
    return this.specialLiquids.create(createSpecialLiquidDto);
  }

  findAll() {
    return this.specialLiquids.find();
  }

  findOne(id: string) {
    return this.specialLiquids.findById(id);
  }

  update(id: string, updateSpecialLiquidDto: UpdateSpecialLiquidDto) {
    return this.specialLiquids.findByIdAndUpdate(id, updateSpecialLiquidDto);
  }

  remove(id: string) {
    return this.specialLiquids.findByIdAndDelete(id);
  }
}
