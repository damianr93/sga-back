import { Injectable } from '@nestjs/common';
import { CreateSpecialLiquidDto } from './dto/create-special-liquid.dto';
import { UpdateSpecialLiquidDto } from './dto/update-special-liquid.dto';

@Injectable()
export class SpecialLiquidsService {
  create(createSpecialLiquidDto: CreateSpecialLiquidDto) {
    return 'This action adds a new specialLiquid';
  }

  findAll() {
    return `This action returns all specialLiquids`;
  }

  findOne(id: number) {
    return `This action returns a #${id} specialLiquid`;
  }

  update(id: number, updateSpecialLiquidDto: UpdateSpecialLiquidDto) {
    return `This action updates a #${id} specialLiquid`;
  }

  remove(id: number) {
    return `This action removes a #${id} specialLiquid`;
  }
}
