import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: [ConfigService],
    useFactory: async (): Promise<typeof mongoose> => {
      return await mongoose.connect('mongodb://mongo-eco:123456@localhost:27017/');
    },
  },
];