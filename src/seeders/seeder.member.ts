import { Injectable } from '@nestjs/common';
import { MembersService } from './services/service.member';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from './interfaces/interface.member';

@Injectable()
export class MembersSeeder {
  constructor(
    private readonly membersService: MembersService,
    @InjectModel('Member') private memberModel: Model<Member>,
  ) {}

  async seedMember() {
    const membersExist = await this.membersService.checkIfMembersExist();
    const members = [
      {
        code: 'M001',
        name: 'Angga',
      },
      {
        code: 'M002',
        name: 'Ferry',
      },
      {
        code: 'M003',
        name: 'Putri',
      },
    ];

    if (!membersExist) {
      await this.memberModel.insertMany(members);
    }
  }
}
