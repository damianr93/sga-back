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
  ) { }

  async create(createEnvironmentalAspectDto: CreateEnvironmentalAspectDto) {
    try {

      const createdEnvironmentalAspect = await this.enviromentalAspectsModel.create(createEnvironmentalAspectDto);

      return createdEnvironmentalAspect;

    } catch (error) {

      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);

    };
  };

  async findAll() {
    try {

      const enviromentalAspects = await this.enviromentalAspectsModel.find();

      return enviromentalAspects;

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    };
  };

  async findOne(id: string) {
    try {

      const enviromentalAspect = await this.enviromentalAspectsModel.findById(id);

      return enviromentalAspect;

    } catch (error) {

      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)

    }
  }

  async update(id: string, updateEnvironmentalAspectDto: UpdateEnvironmentalAspectDto) {
    try {

      const updatedEnviromentalAspect = await this.enviromentalAspectsModel.findByIdAndUpdate(id, updateEnvironmentalAspectDto, { new: true });

      return updatedEnviromentalAspect;

    } catch (error) {

      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)

    };
  };

  async remove(id: string) {
    try {
      
      const removedEnviromentalAspect = await this.enviromentalAspectsModel.findByIdAndDelete(id)

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    };
  };
};
