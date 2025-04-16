import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateRiskOpportunityActionDto } from './dto/create-risk-opportunity-action.dto';
import { UpdateRiskOpportunityActionDto } from './dto/update-risk-opportunity-action.dto';
import { Model } from 'mongoose';
import { EnvironmentalAspects } from '../environmental-aspects/interface/environmental-aspects.interface';
import { RiesgoOportunidad } from '../risk-and-opportunities/interface/risk-and-opportunities.interface';
import { IRiskOpportunityActions } from './interface/risk-opportunity-actions.interface';

@Injectable()
export class RiskOpportunityActionsService {

  constructor(
    @Inject('RISK-OPPORTUNITY-ACTIONS')
    private readonly riskOpportunityModel: Model<IRiskOpportunityActions>,
    @Inject('ENVIROMENTAL-ASPECTS-MODEL')
    private readonly environmentalAspectsModel: Model<EnvironmentalAspects>,
    @Inject('RISK_OPPORTUNITIES_MODEL')
    private readonly riskOportunitiesModel: Model<RiesgoOportunidad>,
  ) { }

  async create(createRiskOpportunityActionDto: CreateRiskOpportunityActionDto) {

    try {

      const existRegister = await this.riskOpportunityModel.find({ riskOrOpportunity: createRiskOpportunityActionDto.riskOrOpportunity })

      if (existRegister.length > 0) {
        throw new HttpException('Ya se tomaron acciones con este riesgo u oportunidad', HttpStatus.CONFLICT)
      }

      const createdRiskOpportunityAction = await this.riskOpportunityModel.create(createRiskOpportunityActionDto)

      return createdRiskOpportunityAction

    } catch (error) {

      throw new HttpException('Error al crear el registro', HttpStatus.INTERNAL_SERVER_ERROR)

    }

  }

  async findAll() {
    try {

      const risksOpportunitiesActions = await this.riskOpportunityModel.find();


      const populatedResults = [];


      for (const doc of risksOpportunitiesActions) {

        const plainDoc = doc.toObject();


        if (doc.riskOrOpportunityModel === 'enviromental-aspects') {
          const referencedDoc = await this.environmentalAspectsModel.findById(doc.riskOrOpportunity);
          plainDoc.riskOrOpportunity = referencedDoc;
        } else if (doc.riskOrOpportunityModel === 'riskAndOpportunities') {
          const referencedDoc = await this.riskOportunitiesModel.findById(doc.riskOrOpportunity);
          plainDoc.riskOrOpportunity = referencedDoc;
        }

        populatedResults.push(plainDoc);
      }

      return populatedResults;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    try {
      const riskOpportunityAction = await this.riskOpportunityModel.findById(id)

      if (!riskOpportunityAction) {
        throw new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND)
      }

      return riskOpportunityAction
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException('Error al buscar el registro', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: string, updateRiskOpportunityActionDto: UpdateRiskOpportunityActionDto) {
    try {
      const updatedRiskOpportunityAction = await this.riskOpportunityModel.findByIdAndUpdate(
        id,
        updateRiskOpportunityActionDto,
        { new: true }
      )

      if (!updatedRiskOpportunityAction) {
        throw new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND)
      }

      return updatedRiskOpportunityAction
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException('Error al actualizar el registro', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: string) {
    try {
      const deletedRiskOpportunityAction = await this.riskOpportunityModel.findByIdAndDelete(id)

      if (!deletedRiskOpportunityAction) {
        throw new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND)
      }

      return { message: 'Registro eliminado exitosamente' }
    } catch (error) {
      throw new HttpException('Error al eliminar el registro', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
