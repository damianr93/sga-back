import { Inject, Injectable } from '@nestjs/common';
import { CreateProcessDefinitionDto } from './dto/create-process-definition.dto';
import { UpdateProcessDefinitionDto } from './dto/update-process-definition.dto';
import { Model } from 'mongoose';
import { ProcessDefinition } from './interface/process-definition.interface';

@Injectable()
export class ProcessDefinitionService {

  constructor(
    @Inject('PROCCES_DEFINITION_MODEL')
    private readonly processDefinitionModel:Model<ProcessDefinition>
  ){}

  create(createProcessDefinitionDto: CreateProcessDefinitionDto) {
    return this.processDefinitionModel.create(createProcessDefinitionDto);
  }

  findAll() {
    return this.processDefinitionModel.find();
  }

  findOne(id: string) {
    return this.processDefinitionModel.findById(id)
  }

  update(id: string, updateProcessDefinitionDto: UpdateProcessDefinitionDto) {
    return this.processDefinitionModel.findByIdAndUpdate(id, updateProcessDefinitionDto, {new: true});
  }

  remove(id: string) {
    return this.processDefinitionModel.findByIdAndDelete(id);
  }
}
