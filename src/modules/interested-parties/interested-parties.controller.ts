import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InterestedPartiesService } from './interested-parties.service';
import { CreateInterestedPartyDto } from './dto/create-interested-party.dto';
import { UpdateInterestedPartyDto } from './dto/update-interested-party.dto';

@Controller('interested-parties')
export class InterestedPartiesController {
  constructor(private readonly interestedPartiesService: InterestedPartiesService) {}

  @Post()
  create(@Body() createInterestedPartyDto: CreateInterestedPartyDto) {
    return this.interestedPartiesService.create(createInterestedPartyDto);
  }

  @Get()
  findAll() {
    return this.interestedPartiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interestedPartiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInterestedPartyDto: UpdateInterestedPartyDto) {
    return this.interestedPartiesService.update(id, updateInterestedPartyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interestedPartiesService.remove(id);
  }
}
