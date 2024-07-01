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
    return `This action returns a #${id} politic`;
  }

  update(id: string, updatePoliticDto: UpdatePoliticDto) {
    return `This action updates a #${id} politic`;
  }

  remove(id: string) {
    return `This action removes a #${id} politic`;
  }
}
