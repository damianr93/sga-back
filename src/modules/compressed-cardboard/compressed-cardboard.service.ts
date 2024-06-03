import { Inject, Injectable } from '@nestjs/common';
import { CreateCompressedCardboardDto } from './dto/create-compressed-cardboard.dto';
import { UpdateCompressedCardboardDto } from './dto/update-compressed-cardboard.dto';
import { CompressedCardboard } from './interface/compressed-cardboard.interface';
import { Model } from 'mongoose';

@Injectable()
export class CompressedCardboardService {

  constructor(
    @Inject('COMPRESSED-CARDBOARD-MODEL')
    private readonly compressedCardboard: Model<CompressedCardboard>
  ){}

  create(createCompressedCardboardDto: CreateCompressedCardboardDto) {
    return this.compressedCardboard.create(createCompressedCardboardDto);
  }

  findAll() {
    return this.compressedCardboard.find();
  }

  findOne(id: string) {
    return this.compressedCardboard.findById(id);
  }

  update(id: string, updateCompressedCardboardDto: UpdateCompressedCardboardDto) {
    return this.compressedCardboard.findByIdAndUpdate(id, updateCompressedCardboardDto);
  }

  remove(id: string) {
    return this.compressedCardboard.findByIdAndDelete(id);
  }
}
