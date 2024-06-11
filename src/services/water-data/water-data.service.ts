import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { WashWater } from 'src/modules/wash-water/interface/wash-water.interface';
import { Water } from 'src/modules/water/interface/water.interface';

const dataToExport = (data) => {
  const serie = data.map((register) => {
    return register.measurement;
  });

  const total = serie.reduce((a, b) => a + b, 0);

  const maximo = Math.max(...serie);
  const minimo = Math.min(...serie);
  const promedio = (maximo + minimo) / 2;
  let lastRegister = data.pop();
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
export class WaterDataService {

  constructor(
    @Inject('WATER_MODEL')
    private readonly waterModel: Model<Water>,
    @Inject('WASH_WATER_MODEL')
    private readonly washWaterModel: Model<WashWater>,
  ){}

  async findAll() {
    const rawData = {
      agua: await this.waterModel.find(),
      aguaLavadero: await this.washWaterModel.find(),
    };

    const data = {
      agua: rawData.agua.length > 0 ? dataToExport(rawData.agua ) : "Sin datos",
      aguaLavadero: rawData.aguaLavadero.length > 0 ? dataToExport(rawData.aguaLavadero) : "Sin datos",
    }

    return data
  }

  

}
