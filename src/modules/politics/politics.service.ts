import { Inject, Injectable } from '@nestjs/common';
import { CreatePoliticDto } from './dto/create-politic.dto';
import { UpdatePoliticDto } from './dto/update-politic.dto';
import { Model } from 'mongoose';
import { Politics } from './interface/politics.interface';

@Injectable()
export class PoliticsService {

  constructor(
    @Inject('POLITICS-MODEL')
    private readonly politicsModel:Model<Politics>
  ){}

  create(createPoliticDto: CreatePoliticDto) {
    return this.politicsModel.create(createPoliticDto);
  }

  findAll() {
    return this.politicsModel.find();
  }

  findOne(id: string) {
    return this.politicsModel.findById(id);
  }

  update(id: string, updatePoliticDto: UpdatePoliticDto) {
    return this.politicsModel.findByIdAndUpdate(id, updatePoliticDto);
  }

  remove(id: string) {
    return this.politicsModel.findByIdAndDelete(id);
  }
}
