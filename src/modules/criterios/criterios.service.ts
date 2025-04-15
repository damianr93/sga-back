import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCriterioDto } from './dto/create-criterio.dto';
import { UpdateCriterioDto } from './dto/update-criterio.dto';
import { Model } from 'mongoose';
import { Criterios } from './interface/criterios.interface';
import { EnvironmentalAspects } from '../environmental-aspects/interface/environmental-aspects.interface';
import { RiesgoOportunidad } from '../risk-and-opportunities/interface/risk-and-opportunities.interface';
import { IRiskOpportunityActions } from '../risk-opportunity-actions/interface/risk-opportunity-actions.interface';

@Injectable()
export class CriteriosService {

  constructor(
    @Inject('CRITERIOS-MODEL')
    private readonly criteriosModel: Model<Criterios>,
    @Inject('ENVIROMENTAL-ASPECTS-MODEL')
    private readonly enviromentalAspectsModel: Model<EnvironmentalAspects>,
    @Inject('RISK_OPPORTUNITIES_MODEL')
    private readonly riskOportunitiesModel: Model<RiesgoOportunidad>,
    @Inject('RISK-OPPORTUNITY-ACTIONS')
    private readonly riskOpportunityActionsModel: Model<IRiskOpportunityActions>
  ) { }

  async create(createCriterioDto: CreateCriterioDto) {
    try {
      const { type } = createCriterioDto;

      const foundCriterio = await this.criteriosModel.findOne({ type });

      if (foundCriterio) {
        throw new HttpException(
          `Ya existe un criterio de tipo "${type}", puede actualizarlo`,
          HttpStatus.CONFLICT
        );
      }

      const createdCriterio = await this.criteriosModel.create(createCriterioDto);

      // Si es un criterio de umbral, actualizar las colecciones correspondientes
      if (type === 'umbral-riesgo' || type === 'umbral-aspectos-ambientales') {
        await this.applyNewCriterioToExistingItems(type, +createdCriterio.valor);
      }

      return createdCriterio;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
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
      const existingCriterio = await this.criteriosModel.findById(id).exec();
      
      if (!existingCriterio) {
        throw new HttpException(
          `No se encontró el criterio con ID ${id}`,
          HttpStatus.NOT_FOUND
        );
      }
      
      const updatedCriterio = await this.criteriosModel.findByIdAndUpdate(
        id,
        updateCriterioDto,
        { new: true, runValidators: true }
      ).exec();

      // Si cambió el valor del umbral, actualizar las colecciones correspondientes
      if (updatedCriterio && 
          updateCriterioDto.valor !== undefined && 
          +updatedCriterio.valor !== +existingCriterio.valor &&
          (existingCriterio.type === 'umbral-riesgo' || existingCriterio.type === 'umbral-aspectos-ambientales')) {
        await this.applyNewCriterioToExistingItems(existingCriterio.type, +updatedCriterio.valor);
      }

      return updatedCriterio;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

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

  /**
   * Aplica el nuevo valor de criterio a los elementos existentes en las colecciones
   * correspondientes (aspectos ambientales o riesgos/oportunidades)
   */
  private async applyNewCriterioToExistingItems(criterioType: string, newThresholdValue: number): Promise<void> {
    try {
      if (criterioType === 'umbral-aspectos-ambientales') {
        // Obtener todos los aspectos ambientales
        const aspectos = await this.enviromentalAspectsModel.find().exec();
        
        for (const aspecto of aspectos) {
          // Verificar si existe una acción asociada
          const existingAction = await this.riskOpportunityActionsModel.findOne({
            riskOrOpportunity: aspecto.id,
            riskOrOpportunityModel: 'enviromental-aspects'
          });

          // Si la significancia supera el umbral y no existe acción, crear una
          if (+aspecto.significance > newThresholdValue && !existingAction) {
            await this.riskOpportunityActionsModel.create({
              riskOrOpportunity: aspecto.id,
              riskOrOpportunityModel: 'enviromental-aspects'
            });
          } 
          // Si la significancia NO supera el umbral pero existe una acción, eliminarla
          else if (+aspecto.significance <= newThresholdValue && existingAction) {
            await this.riskOpportunityActionsModel.findByIdAndDelete(existingAction.id);
          }
        }
      } 
      else if (criterioType === 'umbral-riesgo') {
        // Obtener todos los riesgos/oportunidades
        const riesgos = await this.riskOportunitiesModel.find().exec();
        
        for (const riesgo of riesgos) {
          if (riesgo.factorDeRiesgo !== undefined) {
            // Verificar si existe una acción asociada
            const existingAction = await this.riskOpportunityActionsModel.findOne({
              riskOrOpportunity: riesgo.id,
              riskOrOpportunityModel: 'riskAndOpportunities'
            });

            // Si el factor de riesgo supera el umbral y no existe acción, crear una
            if (+riesgo.factorDeRiesgo > newThresholdValue && !existingAction) {
              await this.riskOpportunityActionsModel.create({
                riskOrOpportunity: riesgo.id,
                riskOrOpportunityModel: 'riskAndOpportunities'
              });
            } 
            // Si el factor de riesgo NO supera el umbral pero existe una acción, eliminarla
            else if (+riesgo.factorDeRiesgo <= newThresholdValue && existingAction) {
              await this.riskOpportunityActionsModel.findByIdAndDelete(existingAction.id);
            }
          }
        }
      }
    } catch (error) {
      throw new HttpException(
        `Error al aplicar nuevo criterio a elementos existentes: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}