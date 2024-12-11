import { Injectable } from '@nestjs/common';
import { CreateBanDetailDto } from './dto/create-ban-detail.dto';
import { UpdateBanDetailDto } from './dto/update-ban-detail.dto';

@Injectable()
export class BanDetailsService {
  create(createBanDetailDto: CreateBanDetailDto) {
    return 'This action adds a new banDetail';
  }

  findAll() {
    return `This action returns all banDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} banDetail`;
  }

  update(id: number, updateBanDetailDto: UpdateBanDetailDto) {
    return `This action updates a #${id} banDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} banDetail`;
  }
}
