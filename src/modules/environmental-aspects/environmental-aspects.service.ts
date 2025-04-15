import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateEnvironmentalAspectDto } from './dto/create-environmental-aspect.dto';
import { UpdateEnvironmentalAspectDto } from './dto/update-environmental-aspect.dto';
import { Model } from 'mongoose';
import { EnvironmentalAspects } from './interface/environmental-aspects.interface';
import { Criterios } from '../criterios/interface/criterios.interface';
import { IRiskOpportunityActions } from '../risk-opportunity-actions/interface/risk-opportunity-actions.interface';

@Injectable()
export class EnvironmentalAspectsService {

  constructor(
    @Inject('ENVIROMENTAL-ASPECTS-MODEL')
    private readonly enviromentalAspectsModel: Model<EnvironmentalAspects>,
    @Inject('CRITERIOS-MODEL')
    private readonly criteriosModel: Model<Criterios>,
    @Inject('RISK-OPPORTUNITY-ACTIONS')
    private readonly riskOpportunityActionsModel: Model<IRiskOpportunityActions>
  ) { }

  async create(createEnvironmentalAspectDto: CreateEnvironmentalAspectDto) {
    try {
      const {
        legalRequeriment,
        managementLegalRequeriment,
        interestedPartiesValue,
        managementRequerimentPart,
        impactFrequency,
        severityImpact,
        extentImpact
      } = createEnvironmentalAspectDto


      const significance = this.calculateSignificance(
        +legalRequeriment,
        +managementLegalRequeriment,
        +interestedPartiesValue,
        +managementRequerimentPart,
        +impactFrequency,
        +severityImpact,
        +extentImpact
      )

      createEnvironmentalAspectDto.significance = significance

      const createdEnvironmentalAspect = await (await (await (await this.enviromentalAspectsModel.create(createEnvironmentalAspectDto))
        .populate('context'))
        .populate('interestedParties'))
        .populate('process')

      const criterio = await this.criteriosModel.findOne({type:'umbral-aspectos-ambientales'})

      if(criterio && createdEnvironmentalAspect) {
        if(+createdEnvironmentalAspect.significance > +criterio.valor) {
          await this.riskOpportunityActionsModel.create({
            riskOrOpportunity: createdEnvironmentalAspect.id,
            riskOrOpportunityModel: 'enviromental-aspects'
          });
        }
      }

      return createdEnvironmentalAspect;

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    };
  };

  async findAll() {
    try {
      const enviromentalAspects = await this.enviromentalAspectsModel.find()
        .populate('context')
        .populate('interestedParties')
        .populate('process')
        .exec();

      return enviromentalAspects;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    };
  };

  async findOne(id: string) {
    try {
      const enviromentalAspect = await this.enviromentalAspectsModel.findById(id);
      return enviromentalAspect;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: string, updateEnvironmentalAspectDto: UpdateEnvironmentalAspectDto) {
    try {
      // Verificar si hay cambios en los valores que afectan la significancia
      const {
        legalRequeriment,
        managementLegalRequeriment,
        interestedPartiesValue,
        managementRequerimentPart,
        impactFrequency,
        severityImpact,
        extentImpact
      } = updateEnvironmentalAspectDto;

      // Recalcular la significancia si se actualizaron valores relevantes
      if (
        legalRequeriment !== undefined ||
        managementLegalRequeriment !== undefined ||
        interestedPartiesValue !== undefined ||
        managementRequerimentPart !== undefined ||
        impactFrequency !== undefined ||
        severityImpact !== undefined ||
        extentImpact !== undefined
      ) {
        // Obtener el aspecto ambiental actual para obtener los valores que no estén siendo actualizados
        const currentAspect = await this.enviromentalAspectsModel.findById(id);
        
        if (!currentAspect) {
          throw new HttpException('Environmental aspect not found', HttpStatus.NOT_FOUND);
        }

        // Usar valores actualizados o los existentes
        const newSignificance = this.calculateSignificance(
          legalRequeriment !== undefined ? +legalRequeriment : +currentAspect.legalRequeriment,
          managementLegalRequeriment !== undefined ? +managementLegalRequeriment : +currentAspect.managementLegalRequeriment,
          interestedPartiesValue !== undefined ? +interestedPartiesValue : +currentAspect.interestedPartiesValue,
          managementRequerimentPart !== undefined ? +managementRequerimentPart : +currentAspect.managementRequerimentPart,
          impactFrequency !== undefined ? +impactFrequency : +currentAspect.impactFrequency,
          severityImpact !== undefined ? +severityImpact : +currentAspect.severityImpact,
          extentImpact !== undefined ? +extentImpact : +currentAspect.extentImpact
        );

        // Actualizar el valor de significancia en el DTO
        updateEnvironmentalAspectDto.significance = newSignificance;
      }

      // Actualizar el aspecto ambiental
      const updatedEnviromentalAspect = await this.enviromentalAspectsModel.findByIdAndUpdate(id, updateEnvironmentalAspectDto, { new: true })
        .populate('context')
        .populate('interestedParties')
        .populate('process')
        .exec();

      if (!updatedEnviromentalAspect) {
        throw new HttpException('Environmental aspect not found', HttpStatus.NOT_FOUND);
      }

      // Verificar si es necesario crear o eliminar acciones de riesgo/oportunidad
      const criterio = await this.criteriosModel.findOne({ type: 'umbral-aspectos-ambientales' });
      
      if (criterio) {
        // Verificar si existe una acción de riesgo/oportunidad asociada
        const existingAction = await this.riskOpportunityActionsModel.findOne({
          riskOrOpportunity: updatedEnviromentalAspect.id,
          riskOrOpportunityModel: 'enviromental-aspects'
        });

        // Si la significancia supera el umbral y no existe acción, crear una
        if (+updatedEnviromentalAspect.significance > +criterio.valor && !existingAction) {
          await this.riskOpportunityActionsModel.create({
            riskOrOpportunity: updatedEnviromentalAspect.id,
            riskOrOpportunityModel: 'enviromental-aspects'
          });
        } 
        // Si la significancia NO supera el umbral pero existe una acción, eliminarla
        else if (+updatedEnviromentalAspect.significance <= +criterio.valor && existingAction) {
          await this.riskOpportunityActionsModel.findByIdAndDelete(existingAction.id);
        }
      }

      return updatedEnviromentalAspect;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    };
  };

  async remove(id: string) {
    try {
      // Eliminar el aspecto ambiental
      const removedEnviromentalAspect = await this.enviromentalAspectsModel.findByIdAndDelete(id);
      
      if (!removedEnviromentalAspect) {
        throw new HttpException('Environmental aspect not found', HttpStatus.NOT_FOUND);
      }
      
      // Eliminar cualquier acción de riesgo/oportunidad asociada
      await this.riskOpportunityActionsModel.deleteMany({
        riskOrOpportunity: id,
        riskOrOpportunityModel: 'enviromental-aspects'
      });
      
      return { message: 'Environmental aspect deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    };
  };

  /**
 * Calcula un valor de significancia en escala 1-10 basado en factores legales, 
 * partes interesadas e impacto ambiental
 */
  calculateSignificance = (
    // Factores legales
    legalRequirement?: number,
    managementLegalRequirement?: number,

    // Factores de partes interesadas
    interestedPartiesValue?: number,
    managementRequirementPart?: number,

    // Factores de impacto
    impactFrequency?: number,
    severityImpact?: number,
    extentImpact?: number
  ): number => {
    // Inicializar variables para los subtotales
    let totalLegalRequirement = 0;
    let totalInterestedParties = 0;
    let totalImpact = 0;

    // Calcular subtotal de requisitos legales si están disponibles ambos valores
    if (legalRequirement && managementLegalRequirement) {
      totalLegalRequirement = legalRequirement * managementLegalRequirement;
    }

    // Calcular subtotal de partes interesadas si están disponibles ambos valores
    if (interestedPartiesValue && managementRequirementPart) {
      totalInterestedParties = interestedPartiesValue * managementRequirementPart;
    }

    // Calcular subtotal de impacto si están disponibles todos los valores
    if (impactFrequency && severityImpact && extentImpact) {
      totalImpact = impactFrequency * severityImpact * extentImpact;
    }

    // Definir los valores máximos posibles para cada categoría
    const maxLegalValue = 10 * 10; // 100
    const maxInterestedValue = 10 * 10; // 100
    const maxImpactValue = 10 * 10 * 10; // 1000

    // Normalizar cada factor a una escala de 0-1
    const normalizedLegal = totalLegalRequirement / maxLegalValue;
    const normalizedInterested = totalInterestedParties / maxInterestedValue;
    const normalizedImpact = totalImpact / maxImpactValue;

    // Definir pesos para cada factor (puedes ajustar estos valores según la importancia relativa)
    const legalWeight = 0.3;
    const interestedWeight = 0.3;
    const impactWeight = 0.4;

    // Calcular la significancia combinada (ponderada)
    let weightedSum = 0;
    let totalWeight = 0;

    if (totalLegalRequirement > 0) {
      weightedSum += normalizedLegal * legalWeight;
      totalWeight += legalWeight;
    }

    if (totalInterestedParties > 0) {
      weightedSum += normalizedInterested * interestedWeight;
      totalWeight += interestedWeight;
    }

    if (totalImpact > 0) {
      weightedSum += normalizedImpact * impactWeight;
      totalWeight += impactWeight;
    }

    // Si no hay valores disponibles, retornar 0
    if (totalWeight === 0) return 0;

    // Normalizar por el peso total efectivo
    const combinedSignificance = weightedSum / totalWeight;

    // Convertir a escala 1-10 (redondeado a 1 decimal)
    const significanceScore = Math.round((combinedSignificance * 9 + 1) * 10) / 10;

    return significanceScore;
  };
};