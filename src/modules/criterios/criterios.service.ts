import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCriterioDto } from './dto/create-criterio.dto';
import { UpdateCriterioDto } from './dto/update-criterio.dto';
import { Model } from 'mongoose';
import { Criterios } from './interface/criterios.interface';

@Injectable()
export class CriteriosService {

  constructor(
    @Inject('CRITERIOS-MODEL')
    private readonly criteriosModel: Model<Criterios>
  ) { }

  async create(createCriterioDto: CreateCriterioDto) {
    try {
      // Extraemos el type del DTO
      const { type } = createCriterioDto;

      // Buscamos si ya existe un criterio con este tipo
      const foundCriterio = await this.criteriosModel.findOne({ type });

      if (foundCriterio) {
        throw new HttpException(
          `Ya existe un criterio de tipo "${type}", puede actualizarlo`,
          HttpStatus.CONFLICT
        );
      }

      // Creamos el nuevo criterio
      const createdCriterio = await this.criteriosModel.create(createCriterioDto);

      return createdCriterio;
    } catch (error) {
      // Manejo más detallado de errores
      if (error instanceof HttpException) {
        throw error; // Re-lanzamos errores HTTP que ya hemos creado
      }

      throw new HttpException(
        `Error al crear el criterio: ${error.message}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
  async findAll() {
    try {
      const criterios = await this.criteriosModel.find().exec();
      return criterios;
    } catch (error) {
      throw new HttpException(
        `Error al obtener criterios: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findOne(id: string) {
    try {
      const criterio = await this.criteriosModel.findById(id).exec();

      if (!criterio) {
        throw new HttpException(
          `No se encontró el criterio con ID ${id}`,
          HttpStatus.NOT_FOUND
        );
      }

      return criterio;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      // Error específico para IDs inválidos de MongoDB
      if (error.name === 'CastError') {
        throw new HttpException(
          'ID de criterio inválido',
          HttpStatus.BAD_REQUEST
        );
      }

      throw new HttpException(
        `Error al buscar criterio: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id: string, updateCriterioDto: UpdateCriterioDto) {
    try {
      const updatedCriterio = await this.criteriosModel.findByIdAndUpdate(
        id,
        updateCriterioDto,
        { new: true, runValidators: true }
      ).exec();

      if (!updatedCriterio) {
        throw new HttpException(
          `No se encontró el criterio con ID ${id}`,
          HttpStatus.NOT_FOUND
        );
      }

      return updatedCriterio;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      // Error específico para IDs inválidos de MongoDB
      if (error.name === 'CastError') {
        throw new HttpException(
          'ID de criterio inválido',
          HttpStatus.BAD_REQUEST
        );
      }

      throw new HttpException(
        `Error al actualizar criterio: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async remove(id: string) {
    try {
      const deletedCriterio = await this.criteriosModel.findByIdAndDelete(id).exec();

      if (!deletedCriterio) {
        throw new HttpException(
          `No se encontró el criterio con ID ${id}`,
          HttpStatus.NOT_FOUND
        );
      }

      return {
        message: `Se eliminó correctamente el criterio ${deletedCriterio.type}`,
        criterio: deletedCriterio
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      // Error específico para IDs inválidos de MongoDB
      if (error.name === 'CastError') {
        throw new HttpException(
          'ID de criterio inválido',
          HttpStatus.BAD_REQUEST
        );
      }

      throw new HttpException(
        `Error al eliminar criterio: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
