import { Document } from 'mongoose';

export interface Water extends Document {
    readonly medidoPor:string,
    readonly consumo: number,
    readonly createdAt: Date
}