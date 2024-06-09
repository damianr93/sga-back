import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CompressedCardboard } from 'src/modules/compressed-cardboard/interface/compressed-cardboard.interface';
import { MetalWaste } from 'src/modules/metal-waste/interface/metal-waste.interface';
import { SpecialLiquids } from 'src/modules/special-liquids/interface/special-liquids.interface';
import { SpecialWaste } from 'src/modules/special-waste/interface/special-waste.interface';
import { waste } from 'src/modules/waste/interface/waste.interface';

const dataToExport = (data) => {
  let lastRegister = data.pop();

  const serie = data.map((register) => {
    return register.measurement;
  });

  const total = serie.reduce((a, b) => a + b, 0);

  const maximo = Math.max(...serie);
  const minimo = Math.min(...serie);
  const promedio = (maximo + minimo) / 2;

  const dataToExport = {
    id: lastRegister.id,
    medidoPor: lastRegister.createdBy,
    serie,
    total,
    maximo,
    minimo,
    promedio,
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
      carton: dataToExport(rawData.carton),
      metal: dataToExport(rawData.metal),
      liquido: dataToExport(rawData.liquido),
      especial: dataToExport(rawData.especial),
      generales: dataToExport(rawData.generales),
    };

    return data;
  }
}
