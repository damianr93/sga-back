import { HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CompressedCardboard } from 'src/modules/compressed-cardboard/interface/compressed-cardboard.interface';
import { MetalWaste } from 'src/modules/metal-waste/interface/metal-waste.interface';
import { SpecialLiquids } from 'src/modules/special-liquids/interface/special-liquids.interface';
import { SpecialWaste } from 'src/modules/special-waste/interface/special-waste.interface';
import { waste } from 'src/modules/waste/interface/waste.interface';

const dataToExport = (data) => {
  const serie = data.map((register) => {
    return register.measurement;
  });

  const total = serie.reduce((a, b) => a + b, 0);

  const maximo = Math.max(...serie);
  const minimo = Math.min(...serie);
  const promedio = (maximo + minimo) / 2;

  let lastRegister = data.pop()
  
  const dataToExport = {
    id: lastRegister._id,
    medidoPor: lastRegister.createdBy,
    serie: serie,
    total: total,
    maximo: maximo ,
    minimo: minimo ,
    promedio: promedio,
    consumo: lastRegister.measurement,
    fechaMedicion: lastRegister.createdAt,
    historial: data.reverse(),
  };

  return dataToExport;
};

@Injectable()
export class WastesDataService {
  constructor(
    @Inject('WASTE-MODEL')
    private readonly wasteModel: Model<waste>,
    @Inject('SPECIAL-WASTE-MODEL')
    private readonly specialWasteModel: Model<SpecialWaste>,
    @Inject('SPECIAL-LIQUIDS-MODEL')
    private readonly specialLiquidsModel: Model<SpecialLiquids>,
    @Inject('METAL-WASTE-MODEL')
    private readonly metalWasteModel: Model<MetalWaste>,
    @Inject('COMPRESSED-CARDBOARD-MODEL')
    private readonly compressedCardboardModel: Model<CompressedCardboard>,
  ) {}

  async findAll() {
    const rawData = {
      carton: await this.compressedCardboardModel.find(),
      metal: await this.metalWasteModel.find(),
      liquido: await this.specialLiquidsModel.find(),
      especial: await this.specialWasteModel.find(),
      generales: await this.wasteModel.find(),
    };

    const data = {
      carton: rawData.carton.length > 0 ? dataToExport(rawData.carton ) : "Sin datos",
      metal: rawData.metal.length > 0 ? dataToExport(rawData.metal) : "Sin datos",
      liquido: rawData.liquido.length > 0 ? dataToExport(rawData.liquido) : "Sin datos",
      especial: rawData.especial.length > 0 ? dataToExport(rawData.especial) : "Sin datos",
      generales: rawData.generales.length > 0 ? dataToExport(rawData.generales) : "Sin datos",
    };

    return data;
  }
}
