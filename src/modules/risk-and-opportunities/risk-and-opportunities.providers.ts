import { Mongoose } from "mongoose";
import { riskAndOpportunitiesShema } from "./schema/risk-and-opportunities.schema";


export const riskAndOportunitiesProviders = [
    {
        provide:'RISK_OPPORTUNITIES_MODEL',
        useFactory: (mongoose:Mongoose) => mongoose.model('riskAndOpportunities', riskAndOpportunitiesShema),
        inject:['DATABASE_CONNECTION']
    }
]