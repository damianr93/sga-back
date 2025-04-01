import { Model } from "mongoose";
import { RiesgoOportunidad } from "./interface/risk-and-opportunities.interface";
import { BadRequestException, Inject, NotFoundException } from "@nestjs/common";
import { CreateRiskAndOpportunityDto } from "./dto/create-risk-and-opportunity.dto";
import { UpdateRiskAndOpportunityDto } from "./dto/update-risk-and-opportunity.dto";

export class RiskAndOpportunitiesService {
  constructor(
    @Inject('RISK_OPPORTUNITIES_MODEL')
    private readonly riskOportunitiesModel: Model<RiesgoOportunidad>
  ) { }

  async create(createRiskAndOpportunityDto: CreateRiskAndOpportunityDto): Promise<RiesgoOportunidad> {
    const createdRiskOpportunity = await this.riskOportunitiesModel.create(createRiskAndOpportunityDto);
    return this.riskOportunitiesModel.findById(createdRiskOpportunity._id)
      .populate('contexto')
      .populate('partesInteresadas')
      .populate('process')
      .exec();
  }
  async findAll(filter = {}): Promise<RiesgoOportunidad[]> {
    return this.riskOportunitiesModel.find(filter)
      .populate('contexto')
      .populate('partesInteresadas')
      .populate('process')
      .exec();
  }

  async findOne(id: string): Promise<RiesgoOportunidad> {
    try {
      const riskOpportunity = await this.riskOportunitiesModel.findById(id)
        .populate('contexto')
        .populate('partesInteresadas')
        .populate('process')
        .exec();

      if (!riskOpportunity) {
        throw new NotFoundException(`Riesgo/Oportunidad con ID ${id} no encontrado`);
      }

      return riskOpportunity;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new BadRequestException('ID proporcionado no válido');
      }
      throw error;
    }
  }

  async update(id: string, updateRiskAndOpportunityDto: UpdateRiskAndOpportunityDto) {
    try {
      const updatedRiskOpportunity = await this.riskOportunitiesModel.findByIdAndUpdate(
        id,
        updateRiskAndOpportunityDto,
        { new: true, runValidators: true }
      ).populate('contexto')
        .populate('partesInteresadas')
        .populate('process')
        .exec()

      if (!updatedRiskOpportunity) {
        throw new NotFoundException(`Riesgo/Oportunidad con ID ${id} no encontrado`);
      }

      return updatedRiskOpportunity;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new BadRequestException('ID proporcionado no válido');
      }
      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const result = await this.riskOportunitiesModel.findByIdAndDelete(id).exec();

      if (!result) {
        throw new NotFoundException(`Riesgo/Oportunidad con ID ${id} no encontrado`);
      }

      return { deleted: true };
    } catch (error) {
      if (error.name === 'CastError') {
        throw new BadRequestException('ID proporcionado no válido');
      }
      throw error;
    }
  }

  async findByType(type: 'riesgo' | 'oportunidad'): Promise<RiesgoOportunidad[]> {
    return this.riskOportunitiesModel.find({ type })
      .populate('contexto')
      .populate('partesInteresadas')
      .populate('process')
      .exec();
  }

  async findByProcess(processId: string): Promise<RiesgoOportunidad[]> {
    return this.riskOportunitiesModel.find({ process: processId })
      .populate('contexto')
      .populate('partesInteresadas')
      .populate('process')
      .exec();
  }
}