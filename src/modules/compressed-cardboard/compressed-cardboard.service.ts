import { Injectable } from '@nestjs/common';
import { CreateCompressedCardboardDto } from './dto/create-compressed-cardboard.dto';
import { UpdateCompressedCardboardDto } from './dto/update-compressed-cardboard.dto';

@Injectable()
export class CompressedCardboardService {
  create(createCompressedCardboardDto: CreateCompressedCardboardDto) {
    return 'This action adds a new compressedCardboard';
  }

  findAll() {
    return `This action returns all compressedCardboard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} compressedCardboard`;
  }

  update(id: number, updateCompressedCardboardDto: UpdateCompressedCardboardDto) {
    return `This action updates a #${id} compressedCardboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} compressedCardboard`;
  }
}
