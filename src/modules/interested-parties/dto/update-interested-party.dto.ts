import { PartialType } from '@nestjs/mapped-types';
import { CreateInterestedPartyDto } from './create-interested-party.dto';

export class UpdateInterestedPartyDto extends PartialType(CreateInterestedPartyDto) {}
