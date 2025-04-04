import { Model } from "mongoose";
import { RiesgoOportunidad } from "./interface/risk-and-opportunities.interface";
import { BadRequestException, HttpException, HttpStatus, Inject, NotFoundException } from "@nestjs/common";
import { CreateRiskAndOpportunityDto } from "./dto/create-risk-and-opportunity.dto";
import { UpdateRiskAndOpportunityDto } from "./dto/update-risk-and-opportunity.dto";

export class RiskAndOpportunitiesService {
  constructor(
    @Inject('RISK_OPPORTUNITIES_MODEL')
    private readonly riskOportunitiesModel: Model<RiesgoOportunidad>
  ) { }

  async create(createRiskAndOpportunityDto: CreateRiskAndOpportunityDto): Promise<RiesgoOportunidad> {
    try {
      const {
        probabilidad,
        ocurrencia,
        perdidaDeClientesPotencial,
        dañoPotencial,
        conflictosGremialesPosibles,
        incumplimientoLegal,
        perdidaDeImagen,
        costoCorreccion,
      } = createRiskAndOpportunityDto

      if (probabilidad !== undefined && ocurrencia !== undefined) {
        //Promedio simple. Tambien podria utilizarse una suma ponterada pero depende del cliente
        const promedio = (+probabilidad + +ocurrencia) / 2

        createRiskAndOpportunityDto.probabilidadDeOcurencia = promedio
      }

      if (
        perdidaDeClientesPotencial !== undefined &&
        dañoPotencial !== undefined &&
        conflictosGremialesPosibles !== undefined &&
        incumplimientoLegal !== undefined &&
        perdidaDeImagen !== undefined &&
        costoCorreccion !== undefined) {

        createRiskAndOpportunityDto.consecuencia =
          (+perdidaDeClientesPotencial +
            +dañoPotencial +
            +conflictosGremialesPosibles +
            +incumplimientoLegal +
            +perdidaDeImagen +
            +costoCorreccion) / 6
      }

      if (createRiskAndOpportunityDto.consecuencia !== undefined && createRiskAndOpportunityDto.probabilidadDeOcurencia !== undefined) {
        createRiskAndOpportunityDto.factorDeRiesgo = ((createRiskAndOpportunityDto.consecuencia - 1) * (createRiskAndOpportunityDto.probabilidadDeOcurencia - 1) / 16 * 9) + 1;
      }

      const createdRiskOpportunity = await this.riskOportunitiesModel.create(createRiskAndOpportunityDto);
      const riskAndOpportunities = await this.riskOportunitiesModel.findById(createdRiskOpportunity._id)
        .populate('contexto')
        .populate('partesInteresadas')
        .populate('process')
        .exec();

      if (riskAndOpportunities.consecuencia !== undefined) {
        riskAndOpportunities.consecuencia = Number(riskAndOpportunities.consecuencia.toFixed(1));
      }

      if (riskAndOpportunities.probabilidad !== undefined) {
        riskAndOpportunities.probabilidad = Number(riskAndOpportunities.probabilidad.toFixed(1));
      }

      if (riskAndOpportunities.factorDeRiesgo !== undefined) {
        riskAndOpportunities.factorDeRiesgo = Number(riskAndOpportunities.factorDeRiesgo.toFixed(1));
      }

      return riskAndOpportunities;

    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll() {
    const riskOsOpportunities = await this.riskOportunitiesModel.find()
      .populate('contexto')
      .populate('partesInteresadas')
      .populate('process')
      .exec();

    riskOsOpportunities.forEach(item => {
      if (item.consecuencia !== undefined) {
        item.consecuencia = Number(item.consecuencia.toFixed(1));
      }

      if (item.probabilidad !== undefined) {
        item.probabilidad = Number(item.probabilidad.toFixed(1));
      }

      if (item.factorDeRiesgo !== undefined) {
        item.factorDeRiesgo = Number(item.factorDeRiesgo.toFixed(1));
      }
    });

    return riskOsOpportunities;
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
      // Apply the same calculation logic as in create method
      const {
        probabilidad,
        ocurrencia,
        perdidaDeClientesPotencial,
        dañoPotencial,
        conflictosGremialesPosibles,
        incumplimientoLegal,
        perdidaDeImagen,
        costoCorreccion
      } = updateRiskAndOpportunityDto;

      // Recalculate probabilidadDeOcurencia if relevant fields are present
      if (probabilidad !== undefined && ocurrencia !== undefined) {
        const promedio = (+probabilidad + +ocurrencia) / 2;
        updateRiskAndOpportunityDto.probabilidadDeOcurencia = promedio;
      }

      // Recalculate consecuencia if all relevant fields are present
      if (
        perdidaDeClientesPotencial !== undefined &&
        dañoPotencial !== undefined &&
        conflictosGremialesPosibles !== undefined &&
        incumplimientoLegal !== undefined &&
        perdidaDeImagen !== undefined &&
        costoCorreccion !== undefined
      ) {
        updateRiskAndOpportunityDto.consecuencia =
          (+perdidaDeClientesPotencial +
            +dañoPotencial +
            +conflictosGremialesPosibles +
            +incumplimientoLegal +
            +perdidaDeImagen +
            +costoCorreccion) / 6;
      }

      // Recalculate factorDeRiesgo if necessary values are present or were just calculated
      const consecuencia = updateRiskAndOpportunityDto.consecuencia;
      const probabilidadDeOcurencia = updateRiskAndOpportunityDto.probabilidadDeOcurencia;

      if (consecuencia !== undefined && probabilidadDeOcurencia !== undefined) {
        updateRiskAndOpportunityDto.factorDeRiesgo = probabilidadDeOcurencia + consecuencia;
      }

      // Perform the update with the recalculated values
      const updatedRiskOpportunity = await this.riskOportunitiesModel.findByIdAndUpdate(
        id,
        updateRiskAndOpportunityDto,
        { new: true, runValidators: true }
      )
        .populate('contexto')
        .populate('partesInteresadas')
        .populate('process')
        .exec();

      if (!updatedRiskOpportunity) {
        throw new NotFoundException(`Riesgo/Oportunidad con ID ${id} no encontrado`);
      }

      if (updatedRiskOpportunity.consecuencia !== undefined) {
        updatedRiskOpportunity.consecuencia = Number(updatedRiskOpportunity.consecuencia.toFixed(1));
      }

      if (updatedRiskOpportunity.probabilidad !== undefined) {
        updatedRiskOpportunity.probabilidad = Number(updatedRiskOpportunity.probabilidad.toFixed(1));
      }

      if (updatedRiskOpportunity.factorDeRiesgo !== undefined) {
        updatedRiskOpportunity.factorDeRiesgo = Number(updatedRiskOpportunity.factorDeRiesgo.toFixed(1));
      }

      return updatedRiskOpportunity

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