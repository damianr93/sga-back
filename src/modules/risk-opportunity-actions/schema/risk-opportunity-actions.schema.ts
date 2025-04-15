import mongoose, { Schema } from "mongoose";

const taskStepsSchema = new Schema({
    stepNumber:Number,
    task: String,
    completed: Boolean
});

const tasksSchema = new Schema({
    tasksDescription: String,
    responsible: String,
    taskSteps: [taskStepsSchema]
});

export const riskOpportunityActionsSchema = new mongoose.Schema({
    riskOrOpportunity: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'riskOrOpportunityModel'
    },
    riskOrOpportunityModel: {
        type: String,
        required: true,
        enum: ['enviromental-aspects', 'riskAndOpportunities']
    },
    Actions: [tasksSchema],
    createdAt:String
});