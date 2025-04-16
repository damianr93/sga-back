export interface TaskStep {
  stepNumber: number;
  task: string;
  completed: boolean;
}

export interface Task {
  objetivo: string;
  responsible: string;
  taskSteps: TaskStep[];
}

export interface IRiskOpportunityActions {
  id?: string;
  riskOrOpportunity: any; // Cambiamos a any para soportar tanto string como objeto
  riskOrOpportunityModel: 'enviromental-aspects' | 'riskAndOpportunities';
  action: Task;
  createdAt: string;
}