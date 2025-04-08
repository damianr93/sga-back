import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateTargetDto } from './dto/create-target.dto';
import { UpdateTargetDto } from './dto/update-target.dto';
import { Model, Types } from 'mongoose';
import { Targets } from './interface/targets.interface';

@Injectable()
export class TargetsService {

  constructor(
    @Inject('TARGETS-MODEL')
    private readonly targetModel: Model<Targets>
  ){}

  async create(createTargetDto: CreateTargetDto) {
    try {
      if (Types.ObjectId.isValid(createTargetDto.id)) {
        const existingTarget = await this.targetModel.findById(createTargetDto.id);
  
        if (existingTarget && existingTarget.description !== createTargetDto.description) {
          // Solo actualiza si la descripción cambió
          await this.targetModel.findByIdAndUpdate(createTargetDto.id, createTargetDto, { new: true });
        }
        
        return existingTarget; // Retorna el mismo documento si no hubo cambios
      }
  
      // Si el ID no es un MongoID válido, crea un nuevo registro
      const createdTarget = await this.targetModel.create(createTargetDto);
      return createdTarget;
  
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      const targets = await this.targetModel.find()

      return targets
      
    } catch (error) {

      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      
    }
  }

  async findOne(id: string) {
    try {
      const target = await this.targetModel.findById(id)

      return target
      
    } catch (error) {

      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      
    }
  }

  async update(id: string, updateTargetDto: UpdateTargetDto) {
    try {
      const target = await this.targetModel.findByIdAndUpdate(id, updateTargetDto)

      return target
      
    } catch (error) {

      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      
    }
  }

  async remove(id: string) {
    try {
      const target = await this.targetModel.findByIdAndDelete(id)

      return target
      
    } catch (error) {

      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      
    }
  }
}
