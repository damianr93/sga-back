import { Model } from "mongoose";
import { RiesgoOportunidad } from "./interface/risk-and-opportunities.interface";
import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateRiskAndOpportunityDto } from "./dto/create-risk-and-opportunity.dto";
import { UpdateRiskAndOpportunityDto } from "./dto/update-risk-and-opportunity.dto";
import { Criterios } from "../criterios/interface/criterios.interface";
import { IRiskOpportunityActions } from "../risk-opportunity-actions/interface/risk-opportunity-actions.interface";

@Injectable()
export class RiskAndOpportunitiesService {
  constructor(
    @Inject('RISK_OPPORTUNITIES_MODEL')
    private readonly riskOportunitiesModel: Model<RiesgoOportunidad>,
    @Inject('CRITERIOS-MODEL')
    private readonly criteriosModel: Model<Criterios>,
    @Inject('RISK-OPPORTUNITY-ACTIONS')
    private readonly riskOpportunityActionsModel: Model<IRiskOpportunityActions>
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

      // Verificar umbral y crear acción si es necesario
      const criterio = await this.criteriosModel.findOne({ type: 'umbral-riesgo' });

      if (criterio && riskAndOpportunities && riskAndOpportunities.factorDeRiesgo !== undefined) {
        if (+riskAndOpportunities.factorDeRiesgo > +criterio.valor) {
          await this.riskOpportunityActionsModel.create({
            riskOrOpportunity: riskAndOpportunities.id,
            riskOrOpportunityModel: 'risk-opportunities'
          });
        }
      }

      return riskAndOpportunities;

    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
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
      // Obtener los datos actuales antes de la actualización
      const currentRiskOpportunity = await this.riskOportunitiesModel.findById(id);
      if (!currentRiskOpportunity) {
        throw new NotFoundException(`Riesgo/Oportunidad con ID ${id} no encontrado`);
      }

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
      } else if (probabilidad !== undefined && currentRiskOpportunity.ocurrencia !== undefined) {
        const promedio = (+probabilidad + +currentRiskOpportunity.ocurrencia) / 2;
        updateRiskAndOpportunityDto.probabilidadDeOcurencia = promedio;
      } else if (ocurrencia !== undefined && currentRiskOpportunity.probabilidad !== undefined) {
        const promedio = (+currentRiskOpportunity.probabilidad + +ocurrencia) / 2;
        updateRiskAndOpportunityDto.probabilidadDeOcurencia = promedio;
      }

      // Determinar valores para cálculo de consecuencia
      const values = {
        perdidaDeClientesPotencial: perdidaDeClientesPotencial !== undefined ? +perdidaDeClientesPotencial : +currentRiskOpportunity.perdidaDeClientesPotencial,
        dañoPotencial: dañoPotencial !== undefined ? +dañoPotencial : +currentRiskOpportunity.dañoPotencial,
        conflictosGremialesPosibles: conflictosGremialesPosibles !== undefined ? +conflictosGremialesPosibles : +currentRiskOpportunity.conflictosGremialesPosibles,
        incumplimientoLegal: incumplimientoLegal !== undefined ? +incumplimientoLegal : +currentRiskOpportunity.incumplimientoLegal,
        perdidaDeImagen: perdidaDeImagen !== undefined ? +perdidaDeImagen : +currentRiskOpportunity.perdidaDeImagen,
        costoCorreccion: costoCorreccion !== undefined ? +costoCorreccion : +currentRiskOpportunity.costoCorreccion
      };

      // Recalcular consecuencia si hay cambios en alguno de los factores
      if (
        perdidaDeClientesPotencial !== undefined ||
        dañoPotencial !== undefined ||
        conflictosGremialesPosibles !== undefined ||
        incumplimientoLegal !== undefined ||
        perdidaDeImagen !== undefined ||
        costoCorreccion !== undefined
      ) {
        updateRiskAndOpportunityDto.consecuencia =
          (values.perdidaDeClientesPotencial +
            values.dañoPotencial +
            values.conflictosGremialesPosibles +
            values.incumplimientoLegal +
            values.perdidaDeImagen +
            values.costoCorreccion) / 6;
      }

      // Recalcular factorDeRiesgo si hay cambios en consecuencia o probabilidadDeOcurencia
      const consecuencia = updateRiskAndOpportunityDto.consecuencia !== undefined 
        ? updateRiskAndOpportunityDto.consecuencia 
        : currentRiskOpportunity.consecuencia;
        
      const probabilidadDeOcurencia = updateRiskAndOpportunityDto.probabilidadDeOcurencia !== undefined 
        ? updateRiskAndOpportunityDto.probabilidadDeOcurencia 
        : currentRiskOpportunity.probabilidadDeOcurencia;

      if (consecuencia !== undefined && probabilidadDeOcurencia !== undefined) {
        updateRiskAndOpportunityDto.factorDeRiesgo = ((consecuencia - 1) * (probabilidadDeOcurencia - 1) / 16 * 9) + 1;
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

      // Verificar umbral y gestionar acciones según sea necesario
      const criterio = await this.criteriosModel.findOne({ type: 'umbral-riesgo' });
      
      if (criterio && updatedRiskOpportunity.factorDeRiesgo !== undefined) {
        // Verificar si existe una acción de riesgo/oportunidad asociada
        const existingAction = await this.riskOpportunityActionsModel.findOne({
          riskOrOpportunity: updatedRiskOpportunity.id,
          riskOrOpportunityModel: 'risk-opportunities'
        });

        // Si el factor de riesgo supera el umbral y no existe acción, crear una
        if (+updatedRiskOpportunity.factorDeRiesgo > +criterio.valor && !existingAction) {
          await this.riskOpportunityActionsModel.create({
            riskOrOpportunity: updatedRiskOpportunity.id,
            riskOrOpportunityModel: 'risk-opportunities'
          });
        } 
        // Si el factor de riesgo NO supera el umbral pero existe una acción, eliminarla
        else if (+updatedRiskOpportunity.factorDeRiesgo <= +criterio.valor && existingAction) {
          await this.riskOpportunityActionsModel.findByIdAndDelete(existingAction.id);
        }
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

      // Eliminar cualquier acción de riesgo/oportunidad asociada
      await this.riskOpportunityActionsModel.deleteMany({
        riskOrOpportunity: id,
        riskOrOpportunityModel: 'risk-opportunities'
      });

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