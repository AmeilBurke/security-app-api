import { Injectable } from '@nestjs/common';
import { CreateBannedPersonDto } from './dto/create-banned-person.dto';
import { UpdateBannedPersonDto } from './dto/update-banned-person.dto';

@Injectable()
export class BannedPeopleService {
  create(createBannedPersonDto: CreateBannedPersonDto) {
    return 'This action adds a new bannedPerson';
  }

  findAll() {
    return `This action returns all bannedPeople`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bannedPerson`;
  }

  update(id: number, updateBannedPersonDto: UpdateBannedPersonDto) {
    return `This action updates a #${id} bannedPerson`;
  }

  remove(id: number) {
    return `This action removes a #${id} bannedPerson`;
  }
}
