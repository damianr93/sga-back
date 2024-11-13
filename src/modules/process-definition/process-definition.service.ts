import { Injectable } from '@nestjs/common';
import { CreateProcessDefinitionDto } from './dto/create-process-definition.dto';
import { UpdateProcessDefinitionDto } from './dto/update-process-definition.dto';

@Injectable()
export class ProcessDefinitionService {
  create(createProcessDefinitionDto: CreateProcessDefinitionDto) {
    return 'This action adds a new processDefinition';
  }

  findAll() {
    return `This action returns all processDefinition`;
  }

  findOne(id: number) {
    return `This action returns a #${id} processDefinition`;
  }

  update(id: number, updateProcessDefinitionDto: UpdateProcessDefinitionDto) {
    return `This action updates a #${id} processDefinition`;
  }

  remove(id: number) {
    return `This action removes a #${id} processDefinition`;
  }
}
