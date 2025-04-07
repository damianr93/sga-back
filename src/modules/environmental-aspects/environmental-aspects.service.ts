import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateEnvironmentalAspectDto } from './dto/create-environmental-aspect.dto';
import { UpdateEnvironmentalAspectDto } from './dto/update-environmental-aspect.dto';
import { Model } from 'mongoose';
import { EnvironmentalAspects } from './interface/environmental-aspects.interface';

@Injectable()
export class EnvironmentalAspectsService {

  constructor(
    @Inject('ENVIROMENTAL-ASPECTS-MODEL')
    private readonly enviromentalAspectsModel: Model<EnvironmentalAspects>
  ){}

  async create(createEnvironmentalAspectDto: CreateEnvironmentalAspectDto) {
    try {
      
      const createdEnvironmentalAspect = await this.enviromentalAspectsModel.create(createEnvironmentalAspectDto);

      return createdEnvironmentalAspect;

    } catch (error) {
      
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);

    };
  };

  findAll() {
    return `This action returns all environmentalAspects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} environmentalAspect`;
  }

  update(id: number, updateEnvironmentalAspectDto: UpdateEnvironmentalAspectDto) {
    return `This action updates a #${id} environmentalAspect`;
  }

  remove(id: number) {
    return `This action removes a #${id} environmentalAspect`;
  }
}
