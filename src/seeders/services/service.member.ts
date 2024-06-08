import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member } from '../interfaces/interface.member';
import { Model } from 'mongoose';

@Injectable()
export class MembersService {
  constructor(@InjectModel('Member') private memberModel: Model<Member>) {}

  async checkIfMembersExist(): Promise<boolean> {
    const count = await this.memberModel.countDocuments().exec();
    return count > 0;
  }
}
