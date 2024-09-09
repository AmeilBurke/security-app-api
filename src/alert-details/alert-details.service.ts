import { Injectable } from '@nestjs/common';
import { CreateAlertDetailDto } from './dto/create-alert-detail.dto';
import { UpdateAlertDetailDto } from './dto/update-alert-detail.dto';

@Injectable()
export class AlertDetailsService {
  create(createAlertDetailDto: CreateAlertDetailDto) {
    return 'This action adds a new alertDetail';
  }

  findAll() {
    return `This action returns all alertDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} alertDetail`;
  }

  update(id: number, updateAlertDetailDto: UpdateAlertDetailDto) {
    return `This action updates a #${id} alertDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} alertDetail`;
  }
}
