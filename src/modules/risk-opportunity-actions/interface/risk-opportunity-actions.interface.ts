import mongoose from "mongoose";

export interface ITaskSteps {
    stepNumber: number;
    task: string;
    completed: boolean;
  }
  
  export interface ITasks {
    tasksDescription: string;
    responsible: string;
    taskSteps: ITaskSteps[];
  }
  
  export interface IRiskOpportunityActions {
    riskOrOpportunity: mongoose.Types.ObjectId;
    riskOrOpportunityModel: 'enviromental-aspects' | 'riskAndOpportunities';
    Actions: ITasks[];
    createdAt: string;
  }