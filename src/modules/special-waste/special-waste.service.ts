import { Injectable } from '@nestjs/common';
import { CreateSpecialWasteDto } from './dto/create-special-waste.dto';
import { UpdateSpecialWasteDto } from './dto/update-special-waste.dto';

@Injectable()
export class SpecialWasteService {
  create(createSpecialWasteDto: CreateSpecialWasteDto) {
    return 'This action adds a new specialWaste';
  }

  findAll() {
    return `This action returns all specialWaste`;
  }

  findOne(id: number) {
    return `This action returns a #${id} specialWaste`;
  }

  update(id: number, updateSpecialWasteDto: UpdateSpecialWasteDto) {
    return `This action updates a #${id} specialWaste`;
  }

  remove(id: number) {
    return `This action removes a #${id} specialWaste`;
  }
}
