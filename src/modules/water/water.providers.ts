import { Mongoose } from 'mongoose';
import { ConsumoAguaGral } from './schema/water-conpsumption.schema';

export const waterProviders = [
  {
    provide: 'WATER_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Water', ConsumoAguaGral),
    inject: ['DATABASE_CONNECTION'],
  },
];