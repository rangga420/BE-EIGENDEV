import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Book } from '../interfaces/interface.book';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private bookModel: Model<Book>) {}

  async checkIfBooksExist(): Promise<boolean> {
    const count = await this.bookModel.countDocuments().exec();
    return count > 0;
  }
}
