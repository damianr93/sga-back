import { Mongoose } from "mongoose";
import { riskOpportunityActionsSchema } from "./schema/risk-opportunity-actions.schema";

export const riskOpportunityActionsProviders = [
    {
        provide: 'RISK-OPPORTUNITY-ACTIONS',
        useFactory: (mongoose: Mongoose) => mongoose.model('riskOpportunityActions', riskOpportunityActionsSchema),
        inject: ['DATABASE_CONNECTION']

    }
]