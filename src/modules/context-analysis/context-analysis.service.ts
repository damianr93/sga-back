import { Inject, Injectable } from '@nestjs/common';
import { CreateContextAnalysisDto } from './dto/create-context-analysis.dto';
import { UpdateContextAnalysisDto } from './dto/update-context-analysis.dto';
import { Model } from 'mongoose';
import { ContextAnalysis } from './interface/context-analysis.interface';

@Injectable()
export class ContextAnalysisService {

  constructor(
    @Inject('CONTEXT-ANALYSIS-MODEL')
    private readonly contextAnalysis:Model<ContextAnalysis>
  ){}

  create(createContextAnalysisDto: CreateContextAnalysisDto) {
    return this.contextAnalysis.create(createContextAnalysisDto);
  }

  findAll() {
    return this.contextAnalysis.find();
  }

  findOne(id: string) {
    return this.contextAnalysis.findById(id);
  }

  update(id: string, updateContextAnalysisDto: UpdateContextAnalysisDto) {
    return this.contextAnalysis.findByIdAndUpdate(id, updateContextAnalysisDto);
  }

  remove(id: string) {
    return this.contextAnalysis.findByIdAndDelete(id);
  }
}
