import { Document } from 'mongoose';

export interface Water extends Document {
    readonly createdby:string,
    readonly measurement: number,
    readonly createdAt: Date
}