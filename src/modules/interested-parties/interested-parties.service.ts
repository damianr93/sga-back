import { Inject, Injectable } from '@nestjs/common';
import { CreateInterestedPartyDto } from './dto/create-interested-party.dto';
import { UpdateInterestedPartyDto } from './dto/update-interested-party.dto';
import { Model } from 'mongoose';

@Injectable()
export class InterestedPartiesService {

  constructor(
    @Inject('INTERESTED-PARTIES-MODEL')
    private readonly interestedParties: Model<InterestedPartiesService>
  ){}

  create(createInterestedPartyDto: CreateInterestedPartyDto) {
    return this.interestedParties.create(createInterestedPartyDto);
  }

  findAll() {
    return this.interestedParties.find();
  }

  findOne(id: string) {
    return this.interestedParties.findById(id);
  }

  update(id: string, updateInterestedPartyDto: UpdateInterestedPartyDto) {
    return this.interestedParties.findByIdAndUpdate(id, updateInterestedPartyDto);
  }

  remove(id: string) {
    return this.interestedParties.findByIdAndDelete(id);
  }
}
